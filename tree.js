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

  function prettyPrint(node = root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  function insert(value) {
    //  Insert to root if tree is empty
    if (root === null) {
      root = createNode(value);
      return root;
    }

    let currentNode = root;

    while (true) {
      if (value === currentNode.value) {
        throw new Error('Value is already in tree');
      }
      //  Insert value if desired space is free
      if (value > currentNode.value && currentNode.right === null) {
        currentNode.right = createNode(value);
        return currentNode.right;
      }
      if (value < currentNode.value && currentNode.left === null) {
        currentNode.left = createNode(value);
        return currentNode.left;
      }
      //  Traverse to next desired space
      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
  }

  return {
    root,
    prettyPrint,
    insert,
  };
}

export default createBST;
