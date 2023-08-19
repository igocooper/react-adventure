function calculateWidthForPreservedRatio(ratio: number, height: number): number {
  return height * ratio;
}

// Example usage
const ratio = 16 / 9; // Example ratio (16:9)
const height = 200; // Example height
const calculatedWidth = calculateWidthForPreservedRatio(ratio, height);
