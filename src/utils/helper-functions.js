export const parseSortObjectToString = (sortObject = {}) => {
  const arr = Object.entries(sortObject);

  if (arr.length < 1) return "";

  const _sortObject = arr[0];

  return `${_sortObject[0]}.${_sortObject[1]}`;
};
