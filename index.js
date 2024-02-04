import createBST from './tree.js';

const tree = createBST([3, 5, 7, 9, 1, 2, 3, 4, 1]);

tree.prettyPrint();
console.log('Insert 10');
tree.insert(10);
console.log('Insert 0');
tree.insert(0);
tree.prettyPrint();
console.log('Remove 7');
tree.remove(7);
console.log('Remove 0');
tree.remove(0);
tree.prettyPrint();
