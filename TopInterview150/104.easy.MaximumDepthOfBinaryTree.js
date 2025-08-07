/**
 * var middleNode = function(head) {
    let count = 0
    let cur = head
    while (cur) {
        cur = cur.next
        count++
    }
    count = Math.floor(count/2)
    while (count) {
        head = head.next
        count--
    }
    return head
};
 */

// my sln

/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxDepth = function(root) {
    function dfs(node) {
        if (!node) return 0
        let leftHeight = dfs(node.left)
        let rightHeight = dfs(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }
    return dfs(root)
};