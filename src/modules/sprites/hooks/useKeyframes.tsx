import { useRef } from 'react';

type Props = {
  imageWidth: number;
  imageHeight: number;
};

type Keyframe = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Keyframes = Record<string, Record<number, Keyframe>>;

export const useKeyframes = ({ imageWidth, imageHeight }: Props) => {
  const keyframesRef = useRef<Keyframes>({});

  const storeKeyFrames = (
    category: string,
    x: number,
    y: number,
    key: number
  ) => {
    const keyframes = keyframesRef.current;

    if (!category || !keyframes) return;

    const keyframe = {
      x: -x,
      y: -y,
      width: imageWidth,
      height: imageHeight
    };

    if (!keyframes[category]) {
      keyframes[category] = {};
    }

    if (keyframes[category]) {
      keyframes[category] = {
        ...keyframes[category],
        [key]: keyframe
      };
    }
  };

  return {
    storeKeyFrames,
    keyframes: keyframesRef.current
  };
};
