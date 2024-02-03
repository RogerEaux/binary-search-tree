function mergeSort(arr) {
  if (arr.length === 1) return arr;

  const aux = mergeSort(arr.slice(0, Math.round(arr.length / 2))).concat(
    mergeSort(arr.slice(Math.round(arr.length / 2))),
  );

  arr.splice(0, arr.length);
  let i = 0;
  let j = Math.round(aux.length / 2);
  while (i < Math.round(aux.length / 2) || j < arr.length) {
    if (aux[i] < aux[j]) {
      arr.push(aux[i]);
      i += 1;
    } else {
      arr.push(aux[j]);
      j += 1;
    }
    if (i === Math.round(aux.length / 2)) {
      return arr.concat(aux.slice(j));
    }
    if (j === aux.length) {
      return arr.concat(aux.slice(i, Math.round(aux.length / 2)));
    }
  }

  return arr;
}

export default mergeSort;
