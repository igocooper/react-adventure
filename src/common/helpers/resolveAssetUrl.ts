export const resolveAssetUrl = (url: string) => {
  if (process.env.BUILD_TYPE === 'gh-pages') {
    return `/react-adventure${url}`;
  } else {
    return url;
  }
};
