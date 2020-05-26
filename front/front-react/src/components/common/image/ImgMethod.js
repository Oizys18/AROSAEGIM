export const calcSize = (imgW, imgH) => {
  const _width = imgW > imgH ? (imgH / imgW) * 100 : 100;
  const _height = imgH > imgW ? (imgW / imgH) * 100 : 100;
  const _x = _width === 100 ? 0 : (100 - _width) / 2;
  const _y = _height === 100 ? 0 : (100 - _height) / 2;

  return {
    unit: '%',
    aspect: 1 / 1,
    width: _width,
    height: _height,
    x: _x,
    y: _y
  }
}

