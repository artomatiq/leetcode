/**
 * 278. First Bad Version

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.


Example 1:

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
Example 2:

Input: n = 1, bad = 1
Output: 1

Constraints:

1 <= bad <= n <= 231 - 1
 */

//initial solution

var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1
        let right = n
        while (right >= left) {
            let middle = Math.floor((left + right) / 2)
            if (isBadVersion(middle)) {
                if (isBadVersion(middle-1)) {
                    right = middle - 1
                } else {
                    return middle
                }
            } else {
                left = middle + 1
            }
        }
    };
};

//optimal

var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1
        let right = n
        if (isBadVersion(left)) return left
        while (right > left + 1) {
            let middle = Math.floor((left + right) / 2)
            if (isBadVersion(middle)) {
                right = middle
            } else left = middle
        }
        return right
    };
};

//cleaner versions

var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1
        let right = n
        while (right > left) {
            let middle = Math.floor((left + right) / 2)
            if (isBadVersion(middle)) {
                right = middle - 1  
            } else left = middle //this ensures the left cannot end up being the answer
        }
        return right //so we return right
    };
};
