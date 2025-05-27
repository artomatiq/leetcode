/**
 * 110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:


Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104
 */

//initial solution

//in recursion, variables such as depth and height which vary with the recursion should be declared inside the recursive funciton
//otherwise they get rewritten as global variables and cause incorrect results

var isBalanced = function (root) {

    if (!root) return true

    function traverse(node, level) {
        let leftHeight = level
        let rightHeight = level
        if (node.left) {
            leftHeight = traverse(node.left, level + 1)
        }
        if (node.right) {
            rightHeight = traverse(node.right, level + 1)
        }

        if (leftHeight === false || rightHeight === false) return false
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false
        }
        
        return Math.max(leftHeight, rightHeight, level)
    }
    if (traverse(root, 0) !== false) return true
    return false
};