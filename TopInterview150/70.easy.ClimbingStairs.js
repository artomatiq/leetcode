/**
 * 70. Climbing Stairs
Easy

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

Constraints:

1 <= n <= 45
 */

//initial solution

var climbStairs = function(n) {
    function recurse(n) {
        if (n < 2) return 1
        else {
            let previous = recurse(n-1)
            let twoBefore = recurse(n-2)
            return previous + twoBefore
        }
    }
    return recurse(n)
};

//better time complexity using memorization

var climbStairs = function(n) {
    let map = new Map()
    function recurse(n) {
        if (n < 2) return 1
        else {
            let previous = recurse(n-1)
            map.set(n-1, previous)
            let twoBefore = map.has(n-2)? map.get(n-2) : recurse(n-2)
            return previous + twoBefore
        }
    }
    return recurse(n)
};

//better space complexity using dynamic programming

//here we are not keeping a memory map, but we are rather passing up the n-1 and the n-2 values up the callback stack

var climbStairs = function(n) {
    function recurse(n) {
        if (n === 1) {
            return [1, 1]
        }
        let [twoBefore, prev] = recurse(n-1)
        return [prev, twoBefore + prev]
    }
    return recurse(n)[1]
};

//iterative solution

var climbStairs = function(n) {
    let prev = 0
    let result = 1
    for (i=0; i<n; i++) {
        result += prev
        prev = result - prev
    }
    return result
};