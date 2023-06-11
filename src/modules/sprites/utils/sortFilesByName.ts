export const sortFilesByName = (files: FileList) =>
  Array.from(files).sort((current: File, next: File) => {
    const orderRegex = /\d+/;
    const [currentOrderMatch] = current.name.match(orderRegex) || [];
    const [nextOrderMatch] = next.name.match(orderRegex) || [];

    if (currentOrderMatch && nextOrderMatch) {
      return parseInt(currentOrderMatch) - parseInt(nextOrderMatch);
    }

    return 0;
  });
