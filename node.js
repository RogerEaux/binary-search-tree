function createNode(value, left = null, right = null) {
  let nodeValue = value;
  let nodeLeft = left;
  let nodeRight = right;

  return {
    get value() {
      return nodeValue;
    },

    set value(newValue) {
      nodeValue = newValue;
    },

    get left() {
      return nodeLeft;
    },

    set left(newLeft) {
      nodeLeft = newLeft;
    },

    get right() {
      return nodeRight;
    },

    set right(newRight) {
      nodeRight = newRight;
    },
  };
}

export default createNode;
