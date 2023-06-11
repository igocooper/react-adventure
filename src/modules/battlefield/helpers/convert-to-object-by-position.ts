export function convertToObjectByPosition<T>(
  array: Array<T & { position: number }>
) {
  return array.reduce((obj: Record<number, T>, item) => {
    obj[item.position] = item;
    return obj;
  }, {});
}
