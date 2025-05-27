/**
 * 232. Implement Queue using Stacks

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

Constraints:

1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All the calls to pop and peek are valid.
 */

//initial solution

var MyQueue = function() {
    this.array = []
    this.inverseArray = []
    this.needsInversion = false
    this.pointer = 0
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.array.push(x)
    this.needsInversion = true
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.needsInversion) {
        for (let i=this.array.length-1; i>=this.pointer; i--) {
            this.inverseArray.push(this.array[i])
        }
        this.needsInversion = false
    }
    const poppedValue = this.inverseArray.pop()
    this.pointer++
    return poppedValue
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.array[this.pointer]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    if (this.pointer > this.array.length-1) return true
    return false
};


//corrected solution

//the solution above violates the condition...must only use push and pop on the stacks

var MyQueue = function() {
    this.array = []
    this.inverseArray = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.array.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.inverseArray.length) {
        return this.inverseArray.pop()
    }
    else {
        while (this.array.length) {
            this.inverseArray.push(this.array.pop())
        }
        return this.inverseArray.pop()
    }
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.inverseArray.length) {
        return this.inverseArray[this.inverseArray.length-1]
    }
    else {
        const count = this.array.length
        while (this.array.length) {
            this.inverseArray.push(this.array.pop())
        }
        return this.inverseArray[this.inverseArray.length-1]
    }
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    if (!this.inverseArray.length && !this.array.length) return true
    return false
};