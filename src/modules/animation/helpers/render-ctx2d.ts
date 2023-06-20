import * as spriter from './spriter';
import { mat3x3Identity, mat3x3Scale, mat3x3Transform } from './render-webgl';

export class RenderCtx2D {
  ctx: CanvasRenderingContext2D;
  images: Record<string, HTMLImageElement>;
  region_vertex_position = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]); // [ x, y ]
  region_vertex_texcoord = new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]); // [ u, v ]
  region_vertex_triangle = new Uint16Array([0, 1, 2, 0, 2, 3]); // [ i0, i1, i2 ]
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.images = {};
  }
  dropData(): void {
    const render: RenderCtx2D = this;
    render.images = {};
  }
  loadData(images: Record<string, HTMLImageElement>): void {
    const render: RenderCtx2D = this;
    render.images = images;
  }
  drawPose(spriter_pose: spriter.Pose) {
    const render: RenderCtx2D = this;
    const ctx: CanvasRenderingContext2D = render.ctx;
    const images: { [key: string]: HTMLImageElement } = render.images;
    const positions: Float32Array = render.region_vertex_position;
    const texcoords: Float32Array = render.region_vertex_texcoord;
    const triangles: Uint16Array = render.region_vertex_triangle;
    spriter_pose.object_array.forEach(function (
      object: spriter.BaseObject
    ): void {
      switch (object.type) {
        case 'sprite':
          const sprite_object: spriter.SpriteObject = <spriter.SpriteObject>(
            object
          );
          const folder: spriter.Folder =
            spriter_pose.data.folder_array[sprite_object.folder_index]!;
          if (!folder) {
            return;
          }
          const image_file: spriter.ImageFile = <spriter.ImageFile>(
            folder.file_array[sprite_object.file_index]
          );
          if (!image_file) {
            return;
          }
          const image_key: string = image_file.name;
          const image: HTMLImageElement = images[image_key]!;
          if (image && image.complete) {
            ctx.save();
            ctxApplySpace(ctx, sprite_object.world_space);
            ctx.scale(image_file.width / 2, image_file.height / 2);
            ctx.globalAlpha *= sprite_object.alpha;
            ctxDrawImageMesh(ctx, triangles, positions, texcoords, image);
            ctx.restore();
          }
          break;
        case 'entity':
          const entity_object: spriter.EntityObject = <spriter.EntityObject>(
            object
          );
          ctx.save();
          ctxApplySpace(ctx, entity_object.world_space);
          render.drawPose(entity_object.pose);
          ctx.restore();
          break;
      }
    });
  }
}

function ctxApplySpace(
  ctx: CanvasRenderingContext2D,
  space: spriter.Space
): void {
  if (space) {
    ctx.translate(space.position.x, space.position.y);
    ctx.rotate(space.rotation.rad);
    ctx.scale(space.scale.x, space.scale.y);
  }
}

function ctxDrawImageMesh(
  ctx: CanvasRenderingContext2D,
  triangles: Uint16Array,
  positions: Float32Array,
  texcoords: Float32Array,
  image: HTMLImageElement
): void {
  const site_texmatrix: Float32Array = new Float32Array(9);
  const site_texcoord: Float32Array = new Float32Array(2);
  mat3x3Identity(site_texmatrix);
  mat3x3Scale(site_texmatrix, image.width, image.height);

  // http://www.irrlicht3d.org/pivot/entry.php?id=1329
  for (let index = 0; index < triangles.length; ) {
    const triangle0: number = triangles[index++]! * 2;
    const position0: Float32Array = positions.subarray(
      triangle0,
      triangle0 + 2
    );
    const x0: number = position0[0]!;
    const y0: number = position0[1]!;
    const texcoord0: Float32Array = mat3x3Transform(
      site_texmatrix,
      texcoords.subarray(triangle0, triangle0 + 2),
      site_texcoord
    );
    const u0: number = texcoord0[0]!;
    const v0: number = texcoord0[1]!;

    const triangle1: number = triangles[index++]! * 2;
    const position1: Float32Array = positions.subarray(
      triangle1,
      triangle1 + 2
    );
    let x1: number = position1[0]!;
    let y1: number = position1[1]!;
    const texcoord1: Float32Array = mat3x3Transform(
      site_texmatrix,
      texcoords.subarray(triangle1, triangle1 + 2),
      site_texcoord
    );
    let u1: number = texcoord1[0]!;
    let v1: number = texcoord1[1]!;

    const triangle2: number = triangles[index++]! * 2;
    const position2: Float32Array = positions.subarray(
      triangle2,
      triangle2 + 2
    );
    let x2: number = position2[0]!;
    let y2: number = position2[1]!;
    const texcoord2: Float32Array = mat3x3Transform(
      site_texmatrix,
      texcoords.subarray(triangle2, triangle2 + 2),
      site_texcoord
    );
    let u2: number = texcoord2[0]!;
    let v2: number = texcoord2[1]!;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.clip();
    x1 -= x0;
    y1 -= y0;
    x2 -= x0;
    y2 -= y0;
    u1 -= u0;
    v1 -= v0;
    u2 -= u0;
    v2 -= v0;
    const id: number = 1 / (u1 * v2 - u2 * v1);
    const a: number = id * (v2 * x1 - v1 * x2);
    const b: number = id * (v2 * y1 - v1 * y2);
    const c: number = id * (u1 * x2 - u2 * x1);
    const d: number = id * (u1 * y2 - u2 * y1);
    const e: number = x0 - (a * u0 + c * v0);
    const f: number = y0 - (b * u0 + d * v0);
    ctx.transform(a, b, c, d, e, f);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
}
