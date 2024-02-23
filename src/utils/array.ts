export function arraysHaveSameElements(arr1: string[], arr2: string[]) {
  // Sort the arrays
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Compare the sorted arrays
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}

// Returns a subset of the array sliced from the startIndex (default 0) till the target
export const sliceTillElement = <T>(arr: T[], target: T, startIndex: number = 0): T[] => {
  const index = arr.indexOf(target);
  return index >= 0 ? arr.slice(startIndex, index + 1) : [];
};
