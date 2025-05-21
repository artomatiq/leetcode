/**

21. Merge Two Sorted Lists
Easy
Topics
Companies
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:

Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100

Both list1 and list2 are sorted in non-decreasing order.
 */

//initial solution

var mergeTwoLists = function (list1, list2) {
    class List {
        constructor() {
            this.head = null
            this.tail = null
            this.size = 0
        }

        enqueue(val) {
            const newNode = {val: val, next: null}
            if (!this.head) {
                this.head = newNode
                this.tail = newNode
                this.size++
                console.log('enqueued: ', this.head.val)
            } else {
                this.tail.next = newNode
                this.tail = newNode
                this.size++
                console.log('enqueued: ', this.head.val)
            }
        }

        dequeue() {
            if (!this.head) {
                console.log('queue is empty')
                return null
            } else {
                const dequeuedNode = this.head.val
                this.head = this.head.next
                this.size--
                console.log('dequeued: ', dequeuedNode.val)
                return dequeuedNode.val
            }
        }

        print() {
            if (!this.head) console.log ('list is empty')
            else {
                let cur = this.head
                let array = []
                while (cur) {
                    array.push(cur.val)
                    cur = cur.next
                }
                console.log(array)
            }
        }
    }
    const list = new List()
    let val1 = list1
    let val2 = list2

    while (val1 && val2) {
        if (val1.val < val2.val) {
            list.enqueue(val1.val)
            val1 = val1.next
        } else {
            list.enqueue(val2.val)
            val2 = val2.next
        }
    }
    list.head.next = val1 || val2
    return list.head
};



/**
 * this solution changes list1 in place instead of creating a new node list
 * it's important to return dummy.next intead of list1 
 *      if a node is inserted before the first node of list1, it won't return the right list
 */

var mergeTwoLists = function (list1, list2) {
    if (!list1) return list2
    else if (!list2) return list1
    
    const dummy = {val: 1, next: list1}
    let val1 = dummy
    let val2 = list2

    while (val1.next && val2) {
        if (val1.next.val <= val2.val) {
            val1 = val1.next
        } else {
            let inputNode = val2
            let snippet = val1.next
            val1.next = inputNode
            val2 = val2.next
            inputNode.next = snippet
        }
    }
    if (val2) {
        val1.next = val2
    }
    return dummy.next
};




/**
 * this is the most elegant solution
 * it eliminates the need to create snipped objects by using a tail variable
 */

var mergeTwoLists = function (list1, list2) {
    if (!list1) return list2
    else if (!list2) return list1
    
    const dummy = {val: 1, next: null}
    let tail = dummy
    let val1 = list1
    let val2 = list2
    while (val1 && val2) {
        if (val1.val <= val2.val) {
            tail.next = val1
            val1 = val1.next
        } else {
            tail.next = val2
            val2 = val2.next
        }
        tail = tail.next
    }
    tail.next = val1 || val2
    return dummy.next
};