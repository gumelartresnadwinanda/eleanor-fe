export const serializeParams = (params: { [key: string]: string | number | boolean | null | undefined }) => {
  return Object.keys(params)
    .filter((key) => params[key] !== null && params[key] !== undefined)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string | number | boolean)}`)
    .join("&");
};
