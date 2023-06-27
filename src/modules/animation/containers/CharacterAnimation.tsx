import React, { Component } from 'react';
import { loadSCONFile } from '../helpers/loadSCONFile';
import * as spriter from '../helpers/spriter';
import type { Data, Pose } from '../helpers/spriter';
import { RenderCtx2D } from '../helpers/render-ctx2d';
import { wait, loadImage, getRandomNumberInRange } from 'common/helpers';
import { register } from '../troopersAnimationInstances';
import type { Trooper } from 'modules/battlefield/types';
import { registerTrooperNode } from '../../battlefield/troopersNodesMap';
import { Canvas } from './styled';
import { TROOPER_TEAM } from '../../battlefield/constants';

/* eslint-disable @typescript-eslint/naming-convention */

type Props = {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
} & Pick<Trooper, 'id' | 'team'>;

export class CharacterAnimation extends Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: Nullable<CanvasRenderingContext2D>;
  renderCtx: Nullable<RenderCtx2D>;
  spriter_data: Nullable<Data>;
  spriter_pose: Nullable<Pose>;
  images: Record<string, HTMLImageElement>;
  entity_index: number;
  anim_time: number;
  anim_length: number;
  anim_rate: number;
  anim_repeat: number;
  prev_time: number;
  camera_x: number;
  camera_y: number;
  camera_zoom: number;
  alpha: number;
  animationRequestId: number;
  loading: boolean;

  constructor(props: Props) {
    super(props);

    this.loading = false;
    this.ctx = null;
    this.renderCtx = null;
    this.spriter_data = null;
    this.spriter_pose = null;
    this.entity_index = 0;
    this.anim_time = 0;
    this.prev_time = 0;
    this.anim_rate = 1;
    this.anim_repeat = 1;
    this.anim_length = 1000;
    this.camera_x = 0;
    this.camera_y = 0;
    this.camera_zoom = 0.26;
    this.alpha = 1;
    this.images = {};
    this.animationRequestId = 0;
    this.canvasRef = React.createRef();

    this.renderAnimationLoop = this.renderAnimationLoop.bind(this);
  }

  initCanvasCtx() {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d');
    this.renderCtx = new RenderCtx2D(this.ctx!);
  }

  async loadSconFile() {
    const { sconFileUrl } = this.props;

    this.renderCtx!.dropData();
    const animationSconFile = await loadSCONFile(sconFileUrl);

    this.spriter_data = new spriter.Data().load(animationSconFile);
    this.spriter_pose = new spriter.Pose(this.spriter_data);
  }

  async loadImages() {
    const { imagesUrls } = this.props;
    if (!this.spriter_data || !this.renderCtx) return;

    for (const folder of this.spriter_data.folder_array) {
      for (const file of folder.file_array) {
        if (file.type === 'image') {
          const imageKey: string = file.name;
          const image = await loadImage(imagesUrls[imageKey]!);

          this.images[imageKey] = image;
        }
      }
    }

    this.renderCtx.loadData(this.images);
  }

  async init() {
    const { id } = this.props;
    this.loading = true;

    this.initCanvasCtx();

    await this.loadSconFile();
    await this.loadImages();

    this.loading = false;

    register(id, this);
    registerTrooperNode(id, this.canvasRef.current!);

    await wait(getRandomNumberInRange(0, 500));
    this.idle();
  }

  setAnimation(animation: string, animationLength?: number) {
    if (!this.spriter_pose) return;

    const entity_keys: string[] = this.spriter_data!.getEntityKeys();
    const entity_key: string | undefined = entity_keys[this.entity_index];
    this.spriter_pose.setEntity(entity_key!);

    this.spriter_pose.setAnim(animation);
    this.spriter_pose.setTime(0);
    this.anim_length = animationLength || this.spriter_pose.curAnimLength();
    this.prev_time = 0;
    this.anim_time = 0;
  }

  idle() {
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('idle_with_weapon', Infinity);
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);
  }

  async meleeAttack({
    characterBounds,
    targetBounds,
    tileNode,
    onAfterAttack
  }: {
    characterBounds: DOMRect;
    targetBounds: DOMRect;
    tileNode: HTMLDivElement;
    onAfterAttack?: () => Promise<void>;
  }) {
    const TRANSITION_TIME = 700;
    this.run();
    const styles = this.getTargetStyles(
      characterBounds,
      targetBounds,
      this.props.team
    );

    tileNode.style.transition = `transform ${TRANSITION_TIME}ms linear`;
    tileNode.style.transform = styles.transform;

    await wait(TRANSITION_TIME);
    tileNode.style.zIndex = '7';
    await this.attack();

    if (onAfterAttack) {
      await onAfterAttack();
    }

    this.run();
    this.canvasRef.current!.style.transform =
      this.props.team === 'attackers' ? 'rotate3d(0, 1, 0, 180deg)' : 'initial';
    tileNode.style.transform = 'translate(0, 0)';

    await wait(TRANSITION_TIME);
    this.canvasRef.current!.style.removeProperty('transform');
    tileNode.style.removeProperty('z-index');
    tileNode.style.removeProperty('transform');
    tileNode.style.removeProperty('transition');

    this.idle();
  }

  run() {
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('running', Infinity);
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);
  }

  async hurt() {
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('hurt');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
    this.idle();
  }

  async die() {
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('dying');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
  }

  async attack() {
    cancelAnimationFrame(this.animationRequestId);
    // const attacks = [
    //   'slashing_with_left_hand',
    //   'slashing_with_both_hands',
    //   'slashing_two_handed_weapon',
    //   'slashing_with_both_hands_sequence',
    //   'stabbing_with_left_hand',
    //   'stabbing_with_both_hands',
    //   'cast_with_wand'
    // ];
    // const attackIndex = getRandomNumberInRange(0, attacks.length - 1);

    // this.setAnimation(attacks[attackIndex]!);
    this.setAnimation('slashing_with_left_hand');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
    this.idle();
  }

  async shoot() {
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('Shoot With Bow');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    // We want to start animate arrow earlier for smoother effect
    // TODO: find the way to not hardcode this value
    const ADJUSTMENT = 500;
    await wait(this.anim_length - ADJUSTMENT);
    this.idle();
  }

  renderAnimationLoop(time: number) {
    const dt: number = time - (this.prev_time || time);
    this.prev_time = time;

    if (!this.loading) {
      this.spriter_pose!.update(dt * this.anim_rate);
      this.anim_time += dt * this.anim_rate;

      if (this.anim_time >= this.anim_length * this.anim_repeat) {
        return;
      }
    }

    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    if (this.loading) {
      return;
    }

    this.spriter_pose!.strike();

    if (this.ctx) {
      this.ctx.globalAlpha = this.alpha;

      // origin at center, x right, y up
      this.ctx.translate(
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2 + 60
      );
      this.ctx.scale(1, -1);

      this.ctx.translate(-this.camera_x, -this.camera_y);
      this.ctx.scale(this.camera_zoom, this.camera_zoom);
      this.ctx.lineWidth = 1 / this.camera_zoom;

      this.renderCtx!.drawPose(this.spriter_pose!);
    }
  }

  componentDidMount() {
    void this.init();
  }

  getTargetStyles(
    characterBounds: DOMRect,
    targetBounds: DOMRect,
    team: Trooper['team']
  ) {
    const {
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      top: targetTop
    } = targetBounds;
    const targetLeftCenter = targetLeft + targetWidth / 2;
    const targetTopCenter = targetTop + targetHeight / 2;

    const { left, top, width, height } = characterBounds;
    const adjustmentX = team === TROOPER_TEAM.ATTACKERS ? width : 0;
    const transformX = targetLeftCenter - left - adjustmentX;
    const transformY = targetTopCenter - top - height / 2;

    return {
      transform: `translate(${transformX}px, ${transformY}px)`,
      x: transformX,
      y: transformY
    };
  }

  render() {
    return (
      <Canvas
        $team={this.props.team}
        ref={this.canvasRef}
        width="200"
        height="200"
      />
    );
  }
}
