export const resolveRouterBaseName = () => {
  if (process.env.BUILD_TYPE === 'gh-pages') {
    return 'react-adventure';
  } else {
    return undefined;
  }
};
