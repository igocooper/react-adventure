export const loadImage = async (url: string): Promise<HTMLImageElement> => {
  return await new Promise((resolve, reject) => {
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
