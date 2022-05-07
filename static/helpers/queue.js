const ThreeQueue = {
	queue: [],
	len: 0,
	append: function (item) {
		
		if (this.len >= 3) {
			this.pop();						
		}

		this.queue.push(item);
		this.len += 1;
	},
	pop: function () {
		const updatedQueue = this.queue.slice(1);
		this.queue = updatedQueue;
		this.len -= 1;
	}
}

module.exports = ThreeQueue;