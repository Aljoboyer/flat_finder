
export const getObjValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};