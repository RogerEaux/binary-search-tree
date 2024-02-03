import createNode from './node.js';
import mergeSort from './mergeSort.js';

function createBST(array) {
  function prepArray(arr) {
    const noDups = [...new Set(arr)];
    const sorted = mergeSort(noDups);

    return sorted;
  }

  function buildTree(arr) {
    if (arr.length === 0) return null;

    //  The middle value becomes the root for the tree to be balanced
    const middle = Math.floor(arr.length / 2);
    const tree = createNode(arr[middle]);

    //  Value becomes leaf node when array has 1 element
    if (arr.length === 1) return tree;

    const leftHalf = arr.slice(0, middle);
    const leftTree = buildTree(leftHalf);
    const rightHalf = arr.slice(middle + 1, arr.length);
    const rightTree = buildTree(rightHalf);

    tree.left = leftTree;
    tree.right = rightTree;

    return tree;
  }

  let root = buildTree(prepArray(array));

  return {
    root,
  };
}

export default createBST;
