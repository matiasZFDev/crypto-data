const Node = function (data) {
	this.next = null;
	this.data = data;
}

const LinkedList = function (data = null) {
	this.head = new Node(data);
}

LinkedList.prototype.unshift = function (data) {
	const node = new Node(data);

	if (this.head === null) {
		this.head = node;
		return;
	}

	const headNext = this.head.next;
	this.head.next = node;
	node.next = headNext;
}

export default LinkedList;