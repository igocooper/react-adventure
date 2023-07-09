type Frame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Frames = Record<number | string, Frame>;

export const animate = (
  frames: Frames,
  updateState: CallableFunction,
  fps: number
): Promise<void> => {
  return new Promise((resolve) => {
    let frame = 1;
    const lastFrame = Object.keys(frames).length;

    const animateInterval = setInterval(() => {
      if (frame === lastFrame) {
        resolve();
        clearInterval(animateInterval);
      }
      const { width, x, y, height } = frames[frame]!;
      updateState({
        width,
        x,
        y,
        height
      });
      frame += 1;
    }, 1000 / fps);
  });
};
