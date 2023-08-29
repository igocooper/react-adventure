export function omit<T extends {}>(
  obj: T,
  properties: Array<keyof T>
): Partial<T> {
  const result: Partial<T> = {};

  Object.entries<T[keyof T]>(obj).forEach(([propertyName, propertyValue]) => {
    if (properties.includes(propertyName as keyof T)) {
      return;
    }

    if (typeof propertyValue === 'object') {
      result[propertyName as keyof T] = {
        ...propertyValue
      };
    }

    result[propertyName as keyof T] = propertyValue;
  });

  return result;
}
