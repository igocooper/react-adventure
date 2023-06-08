export const downloadImage = (src: string, fileName: string) => {
  const anchorElement = document.createElement('a');
  anchorElement.href = src;
  anchorElement.download = fileName;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
};
