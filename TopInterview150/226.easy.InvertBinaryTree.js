/**
 * 226. Invert Binary Tree

Given the root of a binary tree, invert the tree, and return its root.

Example 1:

Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
Example 2:

Input: root = [2,1,3]
Output: [2,3,1]
Example 3:

Input: root = []
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 */

//here is the recursive solution

var invertTree = function(root) {
    if (!root) return root

    function swap (triangle) {
        const dummy = triangle.left
        triangle.left = triangle.right
        triangle.right = dummy
        return triangle
    }

    function reverse (tree) {
        if (!(tree.left || tree.right)) return tree
        
        if (tree.left) reverse(tree.left)
        if (tree.right) reverse(tree.right)
        
        return swap(tree)
    }
    return reverse(root)
} 

