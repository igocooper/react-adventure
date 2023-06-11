import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { downloadImage } from '../utils/download-image';
import { useCanvas } from '../hooks/useCanvas';
import { useKeyframes } from '../hooks/useKeyframes';
import { sortFilesByName } from '../utils/sortFilesByName';

const IMG_WIDTH = 185;
const IMG_HEIGHT = 146;

export const SpritesGeneratorContainer = () => {
  const {
    updateCanvasSize,
    preservePreviousContextContent,
    drawImageToCanvas,
    canvasRef,
    canvasSize,
    rows
  } = useCanvas({
    imageWidth: IMG_WIDTH,
    imageHeight: IMG_HEIGHT
  });

  const { storeKeyFrames, keyframes } = useKeyframes({
    imageWidth: IMG_WIDTH,
    imageHeight: IMG_HEIGHT
  });

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files && files.length > 0) {
      const keyframeCategory: string | null = prompt(
        'enter keyframes category name. E.G "attack", "idle"'
      );

      const urls = sortFilesByName(files).map((file) => {
        return URL.createObjectURL(file);
      });

      updateCanvasSize(files);

      if (rows) {
        // We keep previous content as Canvas getting cleared out on resize
        preservePreviousContextContent();
      }

      urls.forEach((src, index) => {
        const x = index ? index * IMG_WIDTH : 0;
        const y = rows * IMG_HEIGHT;

        if (keyframeCategory) {
          storeKeyFrames(keyframeCategory, x, y, index + 1);
        }

        drawImageToCanvas({ src, x, y });
      });
    }
  };

  const onImageSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (canvasRef.current) {
      const src = canvasRef.current.toDataURL('image/png');
      downloadImage(src, 'sprite-image');
    }
  };

  return (
    <>
      <h1>Sprites Generator</h1>
      <form>
        <div>
          <label htmlFor="file">File:</label>
          <input
            onChange={onImageUpload}
            id="file"
            type="file"
            accept="image/*"
            multiple
          />
        </div>
        <div>
          <button onClick={onImageSave}>Save sprite</button>
        </div>
        <CopyToClipboard text={JSON.stringify(keyframes)}>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Copy keyframes to clipboard
          </button>
        </CopyToClipboard>
      </form>
      <canvas
        ref={canvasRef}
        width={`${canvasSize}px`}
        height={`${rows * IMG_HEIGHT}px`}
      />
    </>
  );
};
