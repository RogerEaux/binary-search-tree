import createBST from './tree.js';

//  Driver script

function createRandomArray() {
  const array = [];

  for (let i = 0; i < 10; i += 1) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

function addTreeElements(tree) {
  for (let i = 0; i < 5; i += 1) {
    tree.insert(Math.floor(Math.random() * 100 + 100));
  }

  return tree;
}

let randomTree = createBST(createRandomArray());

randomTree.prettyPrint();
console.log('Balanced?', randomTree.isBalanced());
console.log('BFS level order', randomTree.levelOrder());
console.log('DFS pre order', randomTree.preOrder());
console.log('DFS in order', randomTree.inOrder());
console.log('DFS post order', randomTree.postOrder());
randomTree = addTreeElements(randomTree);
randomTree.prettyPrint();
console.log('Balanced?', randomTree.isBalanced());
console.log('Rebalance');
randomTree.rebalance();
randomTree.prettyPrint();
console.log('Balanced?', randomTree.isBalanced());
console.log('BFS level order', randomTree.levelOrder());
console.log('DFS pre order', randomTree.preOrder());
console.log('DFS in order', randomTree.inOrder());
console.log('DFS post order', randomTree.postOrder());
