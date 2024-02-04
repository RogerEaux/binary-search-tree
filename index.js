import createBST from './tree.js';

const tree = createBST([3, 5, 7, 9, 1, 2, 3, 4, 1]);

tree.prettyPrint();
console.log('Insert 10');
tree.insert(10);
console.log('Insert 0');
tree.insert(0);
tree.prettyPrint();
console.log('Remove 4');
tree.remove(4);
tree.prettyPrint();
console.log('Remove 0');
tree.remove(0);
tree.prettyPrint();
console.log('Find 7', tree.find(7).value);
console.log('Find 4', tree.find(4));
console.log('BFS', tree.levelOrder());
console.log('BFS recursively', tree.levelOrderRec());
console.log('DFS in order', tree.inOrder());
