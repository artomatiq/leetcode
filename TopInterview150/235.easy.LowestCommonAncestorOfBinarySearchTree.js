/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
Medium
Topics
Companies
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Example 1:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [2,1], p = 2, q = 1
Output: 2

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST.
 */

//initial solution

var lowestCommonAncestor = function(root, p, q) {
    let cur = root
    while (true) {
        const val = cur.val
        if (val === p.val || val === q.val) return cur
        
        else if (p.val < val) {
            if (q.val < val) {
                cur = cur.left
            } else return cur
        }
        else if (p.val > val) {
            if (q.val > val) {
                cur = cur.right
            } else return cur
        }
    }
};


//simplified

var lowestCommonAncestor = function (root, p, q) {
    let cur = root
    while (true) {
        const val = cur.val
        if (val === p.val || val === q.val) return cur
        if (p.val < val && q.val < val) {
            cur = cur.left;
        } else if (p.val > val && q.val > val) {
            cur = cur.right;
        } else return cur;
    }
};

//optimized

/**
 * If p or q are references to actual nodes in the tree, it's better to compare directly:
 * property access is more expensive in JS
 * 
 * if (cur === p || cur === q)
 * 
 * instead of
 * 
 * if (cur.val === p.val || cur.val === q.val)
 */

var lowestCommonAncestor = function(root, p, q) {
    let cur = root;
    while (cur) {
        if (p.val < cur.val && q.val < cur.val) {
            cur = cur.left;
        } else if (p.val > cur.val && q.val > cur.val) {
            cur = cur.right;
        } else {
            return cur;
        }
    }
    return null;
};
