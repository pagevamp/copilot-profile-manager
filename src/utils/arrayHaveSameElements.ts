export function arraysHaveSameElements(arr1: string[], arr2: string[]) {
  // Sort the arrays
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Compare the sorted arrays
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}
