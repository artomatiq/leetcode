/**
 * 67. Add Binary
Easy

Given two binary strings a and b, return their sum as a binary string.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"

Constraints:

1 <= a.length, b.length <= 104
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.
 */

//incorrect solution

var addBinary = function(a, b) {
    let aNum = parseInt(a, 2)
    let bNum = parseInt(b, 2)
    let sum = aNum + bNum

    return sum.toString(2)
};

//this does not work because parseInt() is imprecise for very large inputs