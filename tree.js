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
    function insertNode(currentNode, val) {
      //  Insert if node is empty
      if (!currentNode) {
        return createNode(val);
      }

      if (val === currentNode.value) {
        return currentNode;
      }

      //  Insert value if desired space is free
      if (val > currentNode.value && !currentNode.right) {
        currentNode.right = createNode(val);
        return currentNode;
      }
      if (val < currentNode.value && !currentNode.left) {
        currentNode.left = createNode(val);
        return currentNode;
      }

      //  Traverse to next desired space
      if (val > currentNode.value) {
        currentNode.right = insertNode(currentNode.right, val);
        return currentNode;
      }
      currentNode.left = insertNode(currentNode.left, val);
      return currentNode;
    }

    root = insertNode(root, value);
  }

  function remove(value) {
    function removeNode(currentNode, val) {
      //  Return null if not found
      if (!currentNode) return null;

      if (val === currentNode.value) {
        //  Node becomes null if no children
        if (!currentNode.left && !currentNode.right) return null;

        //  Child node replaces parent if only one child
        if (!currentNode.left) return currentNode.right;
        if (!currentNode.right) return currentNode.left;

        //  Nearest greater succesor is found if two children
        let succesor = currentNode.right;
        while (succesor.left) {
          succesor = succesor.left;
        }

        currentNode.value = succesor.value;
        currentNode.right = removeNode(currentNode.right, succesor.value);

        return currentNode;
      }

      // Traverse to next search space
      if (val > currentNode.value) {
        currentNode.right = removeNode(currentNode.right, val);
        return currentNode;
      }
      currentNode.left = removeNode(currentNode.left, val);
      return currentNode;
    }

    root = removeNode(root, value);
  }

  function find(value) {
    function findNode(currentNode, val) {
      //  Return null if not found
      if (!currentNode) return null;

      if (val === currentNode.value) {
        return currentNode;
      }

      // Traverse to next search space
      if (val > currentNode.value) {
        return findNode(currentNode.right, val);
      }
      return findNode(currentNode.left, val);
    }

    return findNode(root, value);
  }

  function levelOrder(callback = null) {
    const seen = [];
    const values = [];
    seen.push(root);

    while (seen.length > 0) {
      const currentNode = seen[0];

      //  Enqueue children
      if (currentNode.left) {
        seen.push(currentNode.left);
      }
      if (currentNode.right) {
        seen.push(currentNode.right);
      }

      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.value);
      }

      seen.shift();
    }

    if (values.length > 0) return values;

    return null;
  }

  function levelOrderRec(callback) {
    function traverse(seen, values) {
      if (seen.length > 0) {
        const currentNode = seen[0];

        //  Enqueue children
        if (currentNode.left) {
          seen.push(currentNode.left);
        }
        if (currentNode.right) {
          seen.push(currentNode.right);
        }

        if (callback) {
          callback(currentNode);
        } else {
          values.push(currentNode.value);
        }

        seen.shift();
        traverse(seen, values);
      }

      if (!callback) return values;

      return null;
    }

    const seen = [];
    const values = [];
    seen.push(root);
    return traverse(seen, values);
  }

  function preOrder(callback = null) {
    function traverse(currentNode, values) {
      if (!currentNode) return null;

      //  Visit root
      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.value);
      }

      //  Visit left
      traverse(currentNode.left, values);

      //  Visit right
      traverse(currentNode.right, values);

      if (!callback) return values;

      return null;
    }

    const values = [];

    return traverse(root, values);
  }

  function inOrder(callback = null) {
    function traverse(currentNode, values) {
      if (!currentNode) return null;

      //  Visit left
      traverse(currentNode.left, values);

      //  Visit root
      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.value);
      }

      //  Visit right
      traverse(currentNode.right, values);

      if (!callback) return values;

      return null;
    }

    const values = [];

    return traverse(root, values);
  }

  function postOrder(callback = null) {
    function traverse(currentNode, values) {
      if (!currentNode) return null;

      //  Visit left
      traverse(currentNode.left, values);

      //  Visit right
      traverse(currentNode.right, values);

      //  Visit root
      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.value);
      }

      if (!callback) return values;

      return null;
    }

    const values = [];

    return traverse(root, values);
  }

  function height(node) {
    if (!node) return null;

    //  No children
    if (!node.left && !node.right) return 0;

    //  Each level of descendants increase height
    if (node.left && !node.right) return 1 + height(node.left);
    if (node.right && !node.left) return 1 + height(node.right);

    return 1 + Math.max(height(node.left), height(node.right));
  }

  function depth(node) {
    function traverseDepth(currentNode, targetNode) {
      if (targetNode.value === currentNode.value) return 0;

      // Traverse to next search space while increasing depth
      if (targetNode.value > currentNode.value) {
        return 1 + traverseDepth(currentNode.right, node);
      }
      return 1 + traverseDepth(currentNode.left, node);
    }

    if (!node) return null;

    return traverseDepth(root, node);
  }

  function isBalanced() {
    function checkBalance(node) {
      //  No children is balanced
      if (!node.left && !node.right) return true;

      //  Only one child with height greater than 1 is not balanced else it is balanced
      if (node.left && !node.right) {
        if (height(node.left > 1)) return false;
        return true;
      }
      if (!node.left && node.right) {
        if (height(node.right > 1)) return false;
        return true;
      }

      //  Both children must be balanced
      if (Math.abs(height(node.left) - height(node.right)) <= 1) {
        if (checkBalance(node.left) && checkBalance(node.right)) return true;
      }

      return false;
    }

    return checkBalance(root);
  }

  function rebalance() {
    //  It's a gimme
    root = buildTree(inOrder());
  }

  return {
    root,
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    levelOrderRec,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export default createBST;
