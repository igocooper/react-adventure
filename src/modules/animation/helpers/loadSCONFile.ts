export const loadSCONFile = (url: string) => {
  return fetch(url).then((response) => response.json());
};
