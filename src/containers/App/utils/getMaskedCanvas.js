function getMaskedCanvas(sourceCanvas, sourceImage, cropper) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let maskWidth = cropper.getData().width;
  let maskHeight = cropper.getData().height;
  let maskTop = cropper.getData().y;
  let maskLeft = cropper.getData().x;
  let imageWidth = cropper.getImageData().naturalWidth;
  let imageHeight = cropper.getImageData().naturalHeight;
  let imageLeft = cropper.getImageData().left;
  let imageTop = cropper.getImageData().top;
  let imageAspect = cropper.getImageData().aspectRatio;

  canvas.width = imageWidth;
  canvas.height = imageHeight;

  // Debug
  console.log('Image Width: ' + imageWidth + ' Image Height: ' + imageHeight + ' Image Aspect Ratio: ' + imageAspect);
  console.log('Image Left: ' + imageLeft + ' Image Top: ' + imageTop);
  console.log(
    'Mask Width: ' + maskWidth + ' Mask Height: ' + maskHeight + ' Mask Left: ' + maskLeft + ' Mask Top: ' + maskTop,
  );

  context.imageSmoothingEnabled = true;
  context.drawImage(sourceImage, 0, 0, imageWidth, imageHeight);
  context.fillRect(maskLeft, maskTop, maskWidth, maskHeight);
  return canvas;
}

export default getMaskedCanvas;
