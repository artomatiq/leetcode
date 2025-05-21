/**
 * 125. Valid Palindrome

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
 */

//initial solution

var isPalindrome = function(s) {
    let string = ''
    for (char of s.split('')) {
        const charCode = char.charCodeAt(0)
        //is a number
        if (charCode >=48 && charCode <= 57) {
            string += char
        }
        //is lowercase
        else if (charCode >=97 && charCode <= 122) {
            string += char
        }
        //is uppercase
        else if (charCode >=65 && charCode <= 90) {
            string += String.fromCharCode(charCode+32)
        }
    }
    return string === string.split('').reverse().join('')
};


/**
 * the string1 === string2 has a time complexity of O(n) in the worst case
 * it is not optimal as far as performance is concerned
 * 
 * if using an extra string can be avoided, we will achieve better space complexity
 * 
 * string concatonations are costly....since strings are immutable
 *      JS creates a new string
 *      copies old string
 *      appends new parts
 */


//this is a much more efficient solution

var isPalindrome = function(s) {
    
    function isAlphaNum (char) {
        const charCode = char.charCodeAt(0)
        if (charCode >=48 && charCode <= 57) {
            return char
        }
        else if (charCode >=97 && charCode <= 122) {
            return char
        }
        else if (charCode >=65 && charCode <= 90) {
            return String.fromCharCode(charCode+32)
        }
        return false
    }

    let left = 0
    let right = s.length - 1

    while (left<right) {
        const newLeft = isAlphaNum(s[left])
        const newRight = isAlphaNum(s[right])
        if (!newLeft) {
            left++
            continue
        } else if (!newRight) {
            right--
            continue
        }
        if (newLeft !== newRight) return false
        left++
        right--
    }
    return true
};