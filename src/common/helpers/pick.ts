export function pick<T>(obj: T, properties: Array<keyof T>): Partial<T> {
  const result: Partial<T> = {};

  properties.forEach((property) => {
    if (typeof obj[property] === 'object') {
      result[property] = {
        ...obj[property]
      };
    }

    result[property] = obj[property];
  });

  return result;
}
