class Node {
    constructor(value, previous = null) {
        this.value = value;
        this.next = null;
        this.previous = previous;
    }
}

export class Llist {
    constructor() {
        this._length = 0;
        this._head = null;
        this._last = null;
    }
    addItems(...arr) {
        if (arr.length === 1) {
            this._head = new Node(arr[0]);
            this._last = this._head;
            this._length++;
        } else if (arr.length > 1) {
            this._head = new Node(arr[0]);
            this._last = this._head;
            this._length++;
            let currentNode = this._head;
            for (let i = 1; i < arr.length; i++) {
                currentNode.next = new Node(arr[i], currentNode);
                this._length++;
                this._last = currentNode.next;
                currentNode = currentNode.next;
            }
            return true;
        }
    }
    push(value) {
        if (!this._head) {
            this._head = new Node(value);
            this._last = this._head;
        } else {
            this._last = this._last.next = new Node(value, this._last);
        }
        this._length++;
        return value;
    }
    pop() {
        if (!this._head) {
            new Error("LinkedList empty. Please use Llist.pop() or Llist.addItems() for add item")
        } else {
            let value = this._last.value;
            if (this._length === 1) {
                this._head = null;
                this._last = null;
                this._length = 0;
            } else {
                this._last = this._last.previous;
                this._last.next = null;
                this._length--;
            }
            return value;
        }
    }
    shift() {
        if (!this._head) {
            console.log(new Error("LinkedList empty. Please use Llis.pop() or Llist.addItems() for add item"))
        } else {
            let value = this._head.value;
            if (this._length === 1) {
                this._head = null;
                this._last = null;
                this._length = 0;
            } else {
                this._head = this._head.next;
                this._head.previous = null;
                this._length--;
            }
            return value;
        }
    }
    unshift(value) {
        if (this._length === 0) {
            this._head = new Node(value);
            this._last = this._head;
            this._length++;
        } else {
            let nextNode = this._head
            this._head = new Node(value);
            nextNode.previous = this._head;
            this._head.next = nextNode;
            this._length++;
        }
    }
    getItem(index) {
        let currentNode = this._head;
        if (index === 0) {
            return currentNode.value;
        } else if (index >= this._length) {
            return null;
        }
        for (let i = 1; i <= index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.value;
    }

    splice(start, end = this._length - 1) {

        let currentNodeStart = this._head;
        for (let i = 0; i < start - 1; i++) {
            currentNodeStart = currentNodeStart.next;
        }
        let currentNodeEnd = currentNodeStart;
        if (end === this._length - 1 || end === 0) {
            currentNodeEnd.previous = currentNodeStart.previous;
            currentNodeStart.next = null;
            let currentNode = this._head;
            this._length = 0;
            while (currentNode) {
                currentNode = currentNode.next;
                this._length++;
            }
            this._last = currentNodeStart;
            return this._head;
        }
        for (let i = 0; i <= end; i++) {
            currentNodeEnd = currentNodeEnd.next;
        }

        if (start === 0) {
            this._head = currentNodeEnd;
        } else {
            currentNodeStart.next = currentNodeEnd;
        }

        currentNodeEnd.previous = currentNodeStart;

        let currentNode = this._head;
        this._length = 0;
        while (currentNode) {
            currentNode = currentNode.next;
            this._length++;
        }
        return this._head;
    }

    toArray() {
        let arr = [];
        let currentNode = this._head;
        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
    get length() {
        return this._length;
    }
}
