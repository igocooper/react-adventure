import React, { Component } from 'react';
import { loadSCONFile } from '../helpers/loadSCONFile';
import * as spriter from '../helpers/spriter';
import type { Data, Pose } from '../helpers/spriter';
import { RenderCtx2D } from '../helpers/render-ctx2d';
import { wait, loadImage, getRandomNumberInRange } from 'common/helpers';
import { CHARACTER_IMAGE_SLOT } from 'common/constants';
import type { Trooper } from 'modules/battlefield/types';
import { Canvas } from './styled';
import { TROOPER_TEAM } from '../../battlefield/constants';
import SFX from 'modules/SFX';
import { detectDieSFX } from 'modules/SFX/helpers/detectDieSFX';

/* eslint-disable @typescript-eslint/naming-convention */

export type OnLoadArgs = {
  id: Trooper['id'];
  instance: CharacterAnimation;
  canvasNode: HTMLCanvasElement;
};

type Props = {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
  castEffectImageUrl?: string;
  meleeAttackTransitionTime?: number;
  onLoad?: (props: OnLoadArgs) => void;
  animationMap?: Record<string, string>;
} & Pick<Trooper, 'id' | 'team'> & {
    sex?: Trooper['sex'];
  };

const { BODY_BLOOD, BODY_CUT, FACE_BLOOD, FACE_CUT } = CHARACTER_IMAGE_SLOT;

export class CharacterAnimation extends Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: Nullable<CanvasRenderingContext2D>;
  renderCtx: Nullable<RenderCtx2D>;
  spriter_data: Nullable<Data>;
  spriter_pose: Nullable<Pose>;
  originalFaceImage: Nullable<HTMLImageElement>;
  blinkingFaceImage: Nullable<HTMLImageElement>;
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
  meleeAttackTransitionTime: number;
  blinkTimeout: Nullable<number>;
  blinkRecursiveTimeout: Nullable<number>;
  bloodSlots: {
    [BODY_BLOOD]: boolean;
    [BODY_CUT]: boolean;
    [FACE_BLOOD]: boolean;
    [FACE_CUT]: boolean;
  };

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
    this.meleeAttackTransitionTime = props.meleeAttackTransitionTime || 700;
    this.canvasRef = React.createRef();
    this.originalFaceImage = null;
    this.blinkingFaceImage = null;
    this.blinkTimeout = null;
    this.blinkRecursiveTimeout = null;
    this.bloodSlots = {
      [BODY_BLOOD]: false,
      [BODY_CUT]: false,
      [FACE_BLOOD]: false,
      [FACE_CUT]: false
    };

    this.renderAnimationLoop = this.renderAnimationLoop.bind(this);
    this.blink = this.blink.bind(this);
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
    if (!this.renderCtx) return;

    for (const imageSlot in imagesUrls) {
      const imageUrl = imagesUrls[imageSlot];
      let image: Nullable<HTMLImageElement> = null;

      try {
        image = await loadImage(imageUrl!);
      } catch (err) {
        console.log(err);
      }

      if (image) {
        this.images[imageSlot] = image;
      }

      if (image && imageSlot === CHARACTER_IMAGE_SLOT.FACE_01) {
        this.originalFaceImage = image;
      }

      if (image && imageSlot === CHARACTER_IMAGE_SLOT.FACE_02) {
        this.blinkingFaceImage = image;
      }
    }

    this.renderCtx.loadData(this.images);
  }

  async init() {
    const { id, onLoad } = this.props;
    this.loading = true;

    this.initCanvasCtx();

    await this.loadSconFile();
    await this.loadImages();

    this.loading = false;

    await wait(getRandomNumberInRange(0, 500));
    this.idle();

    // we need delay onload a bit so canvas could play animation
    if (onLoad) {
      await wait(10);
      onLoad({
        id,
        instance: this,
        canvasNode: this.canvasRef.current!
      });
    }
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

  async blink() {
    if (
      this.blinkingFaceImage &&
      this.originalFaceImage &&
      this.images[CHARACTER_IMAGE_SLOT.FACE_01]
    ) {
      this.images[CHARACTER_IMAGE_SLOT.FACE_01] = this.blinkingFaceImage;

      await wait(200);
      this.images[CHARACTER_IMAGE_SLOT.FACE_01] = this.originalFaceImage;

      if (this.blinkRecursiveTimeout) {
        clearTimeout(this.blinkRecursiveTimeout);
      }
      this.blinkRecursiveTimeout = setTimeout(
        this.blink,
        getRandomNumberInRange(3000, 10000)
      );
    }
  }

  async idle() {
    const { animationMap } = this.props;
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation(
      animationMap?.idle || 'idle_with_left_hand_weapon',
      Infinity
    );
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
    }
    this.blinkTimeout = setTimeout(
      this.blink,
      getRandomNumberInRange(100, 10000)
    );
  }

  async meleeAttack({
    characterBounds,
    targetBounds,
    tileNode,
    sfx
  }: {
    characterBounds: DOMRect;
    targetBounds: DOMRect;
    tileNode: HTMLDivElement;
    sfx: HTMLAudioElement;
  }) {
    this.run();
    SFX.run.play();
    const styles = this.getTargetStyles(
      characterBounds,
      targetBounds,
      this.props.team
    );

    tileNode.style.transition = `transform ${this.meleeAttackTransitionTime}ms linear`;
    tileNode.style.transform = styles.transform;

    await wait(this.meleeAttackTransitionTime);
    tileNode.style.zIndex = '7';
    SFX.run.pause();
    await this.attack({
      sfx
    });
  }

  async meleeGoBack({ tileNode }: { tileNode: HTMLDivElement }) {
    this.run();
    SFX.run.play();
    this.canvasRef.current!.style.transform =
      this.props.team === 'attackers' ? 'rotate3d(0, 1, 0, 180deg)' : 'initial';
    tileNode.style.transform = 'translate(0, 0)';

    await wait(this.meleeAttackTransitionTime);
    this.canvasRef.current!.style.removeProperty('transform');
    tileNode.style.removeProperty('z-index');
    tileNode.style.removeProperty('transform');
    tileNode.style.removeProperty('transition');

    SFX.run.pause();
    this.idle();
  }

  getImage() {
    return this.canvasRef?.current?.toDataURL('image/png');
  }

  run() {
    const { animationMap } = this.props;
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation(
      animationMap?.running || 'running_with_left_hand_weapon',
      Infinity
    );
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);
  }

  async hurt() {
    const { animationMap } = this.props;
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation(animationMap?.hurt || 'hurt_with_left_hand_weapon');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
    this.idle();
  }

  async die() {
    const { animationMap, sex } = this.props;
    const sfx = detectDieSFX(sex!);

    void sfx.play();
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation(animationMap?.dying || 'dying_with_left_hand_weapon');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
  }

  async attack({ sfx }: { sfx?: HTMLAudioElement } = {}) {
    if (sfx) {
      void sfx.play();
    }
    const { animationMap } = this.props;
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation(animationMap?.attack || 'slashing_with_left_hand');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
    this.idle();
  }

  async cast({ castSFX }: { castSFX?: HTMLAudioElement } = {}) {
    if (castSFX) {
      void castSFX.play();
    }
    const { castEffectImageUrl } = this.props;
    if (castEffectImageUrl) {
      try {
        this.images[CHARACTER_IMAGE_SLOT.EFFECT] = await loadImage(
          castEffectImageUrl
        );
      } catch (err) {
        console.log(`error loading image: ${castEffectImageUrl}`);
      }
    }
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('cast_with_wand');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    await wait(this.anim_length);
    this.idle();
  }

  async shoot() {
    void SFX.bowShoot.play();
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation('shoot_with_bow');
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);

    // We want to start animate arrow earlier for smoother effect
    // TODO: find the way to not hardcode this value
    const ADJUSTMENT = 500;
    await wait(this.anim_length - ADJUSTMENT);
    this.idle();
  }

  async effected() {
    const { animationMap } = this.props;
    cancelAnimationFrame(this.animationRequestId);
    this.setAnimation(
      animationMap?.effected || 'effected_with_left_hand_weapon'
    );
    this.animationRequestId = requestAnimationFrame(this.renderAnimationLoop);
    await wait(this.anim_length);
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
        width="260"
        height="200"
      />
    );
  }
}
