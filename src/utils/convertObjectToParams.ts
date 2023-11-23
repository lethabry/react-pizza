type ParamsObject = {
  [key: string]: string | number;
};

export const convertObjectToParams = (obj: ParamsObject) => {
  const result = [];
  for (const key in obj) {
    result.push(`${key}=${obj[key]}`);
  }
  return result.join('&');
};
