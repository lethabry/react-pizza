type ParamsObject = {
  [key: string]: string;
};

export const convertParamsToObject = (params: string) => {
  const array = params.split('&');
  const result = array.reduce((current: ParamsObject, next) => {
    const key = next.split('=')[0];
    const value = next.split('=')[1];
    current[key] = value;
    return current;
  }, {});
  return result;
};
