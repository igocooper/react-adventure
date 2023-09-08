export const getImageSize = (
  src: string
): Promise<{
  width: number;
  height: number;
}> =>
  new Promise((res) => {
    const newImg = new Image();

    const onImgLoad = () => {
      const { height, width } = newImg;
      res({ width, height });

      newImg.removeEventListener('load', onImgLoad);
    };

    newImg.addEventListener('load', onImgLoad);
    newImg.src = src;
  });

export default getImageSize;
