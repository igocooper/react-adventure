const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function removeFolder(folderPath, options = { recursive: true }) {
  fs.rm(folderPath, options, (err) => {
    if (err) {
      console.error('Error removing folder:', folderPath, err);
    } else {
      console.log('Folder removed:', folderPath);
    }
  });
}

async function readImageDimensions(filePath) {
  const imageInfo = await sharp(filePath).metadata();
  return {
    width: imageInfo.width,
    height: imageInfo.height
  };
}

async function resizeImages(folderPath) {
  const files = await fs.promises.readdir(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      await resizeImages(filePath); // Recursively process subfolders
    } else {
      const extension = path.extname(file);
      if (
        extension === '.png' ||
        extension === '.jpg' ||
        extension === '.jpeg'
      ) {
        const resizedFilePath = path.join(folderPath, 'resized', file);
        const { width, height } = await readImageDimensions(filePath);

        await sharp(filePath)
          .resize(Math.round(width / 2), Math.round(height / 2))
          .toFile(resizedFilePath);

        await fs.promises.unlink(filePath); // Delete the original image
        await fs.promises.rename(resizedFilePath, filePath); // Replace with the resized image

        console.log('Resized image:', filePath);
      }
    }
  }
}

// Usage example:
const rootPath = path.resolve(__dirname);
const folderPath = path.resolve(rootPath, 'armored-goblin');
const resizedFolderPath = path.join(folderPath, 'resized');

// Create the "resized" folder if it doesn't exist
if (!fs.existsSync(resizedFolderPath)) {
  fs.mkdirSync(resizedFolderPath);
}

resizeImages(folderPath)
  .then(() => {
    console.log('Image resizing completed');
    removeFolder(resizedFolderPath);
  })
  .catch((err) => {
    console.error('Error resizing images:', err);
  });
