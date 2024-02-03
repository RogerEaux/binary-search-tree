function mergeSort(arr) {
  //  Array is sorted when it only has 1 element
  if (arr.length === 1) return arr;

  //  Sort both left and right sides into a single array
  const aux = mergeSort(arr.slice(0, Math.round(arr.length / 2))).concat(
    mergeSort(arr.slice(Math.round(arr.length / 2))),
  );

  //  Clear array
  arr.splice(0, arr.length);

  let leftPointer = 0;
  const leftLimit = Math.round(aux.length / 2);
  let rightPointer = leftLimit;
  const rightLimit = aux.length;

  while (leftPointer < leftLimit || rightPointer < rightLimit) {
    if (aux[leftPointer] < aux[rightPointer]) {
      arr.push(aux[leftPointer]);
      leftPointer += 1;
    } else {
      arr.push(aux[rightPointer]);
      rightPointer += 1;
    }
    //  When the limit of one of the sides is reached the rest of the other is merged
    if (leftPointer === leftLimit) {
      return arr.concat(aux.slice(rightPointer, rightLimit));
    }
    if (rightPointer === rightLimit) {
      return arr.concat(aux.slice(leftPointer, leftLimit));
    }
  }

  return arr;
}

export default mergeSort;
