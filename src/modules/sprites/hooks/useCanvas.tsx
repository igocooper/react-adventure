import { useRef, useState } from 'react';

type Props = {
  imageWidth: number;
  imageHeight: number;
};

export const useCanvas = ({ imageWidth, imageHeight }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<number>(0);
  const [maxImagesLength, setMaxImagesLength] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);

  const drawImageToCanvas = ({
    src,
    x,
    y,
    width = imageWidth,
    height = imageHeight
  }: {
    src: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
  }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height);
    };
    img.src = src;
  };

  const preservePreviousContextContent = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const src = canvas.toDataURL('image/png');
    drawImageToCanvas({
      src,
      x: 0,
      y: 0,
      width: canvasSize,
      height: rows * imageHeight
    });
  };

  const updateCanvasSize = (files: FileList) => {
    setRows(rows + 1);

    if (files.length > maxImagesLength) {
      setMaxImagesLength(maxImagesLength);
      setCanvasSize(files.length * imageWidth);
    }
  };

  return {
    updateCanvasSize,
    preservePreviousContextContent,
    drawImageToCanvas,
    canvasRef,
    canvasSize,
    rows
  };
};
