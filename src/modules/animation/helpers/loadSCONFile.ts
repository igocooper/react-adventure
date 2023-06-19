export const loadSCONFile = async (url: string) => {
  return await fetch(url).then(async (response) => await response.json());
};
