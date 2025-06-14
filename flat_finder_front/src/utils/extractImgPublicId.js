export const extractImgPublicId = (url) => {
  const match = url.match(/\/upload\/[^/]+\/(.+?)\.(png|jpg|jpeg|webp|gif)/i);
  return match ? match[1] + '.' + match[2] : null;
}