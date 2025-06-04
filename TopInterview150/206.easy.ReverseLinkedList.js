/**
 * 206. Reverse Linked List
Easy

Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
 */

//initial sln

var reverseList = function(head) {
    if (!head || !head.next) return head
    
    let a = head
    let b = head.next
    while (b.next) {
        let c = b.next
        b.next = a
        a = b
        b = c
    }
    b.next = a
    head.next = null
    head = b
    return head
};