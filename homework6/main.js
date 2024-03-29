class Node {
  constructor(value, next = null, prev = null) {
    this.next = next;
    this.prev = prev;
    this.value = value;
  }
}

// TODO: add tests
class LinkedList {
  first = null;
  last = null;

  add(value) {
    const node = new Node(value);
    if (this.last) {
      this.last.next = node;
    }
    node.prev = this.last;
    this.last = node;
    if (!this.first) {
      this.first = node;
    }
  }

  *[Symbol.iterator]() {
    let node = this.first;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

for (const value of list) {
  console.log(value);
}
