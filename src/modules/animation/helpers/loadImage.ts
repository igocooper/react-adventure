export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image();
    image.crossOrigin = 'Anonymous';

    const onImgLoad = () => {
      resolve(image);
      image.removeEventListener('load', onImgLoad);
      image.removeEventListener('error', reject);
    };

    image.addEventListener('error', reject);
    image.addEventListener('load', onImgLoad);
    image.src = url;
  });
};
