export const convertParamsToObject = (params) => {
  const array = params.split('&');
  const result = array.reduce((current, next) => {
    const key = next.split('=')[0];
    const value = next.split('=')[1];
    current[key] = value;
    return current;
  }, {});
  return result;
};
