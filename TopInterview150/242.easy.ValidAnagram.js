/**
 * 242. Valid Anagram

Given two strings s and t, return true if t is an anagram of s, and false otherwise.


Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false


Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
 */


//my initial solution

var isAnagram = function(s, t) {
    const map = new Map()
    s.split('').forEach(char => {
        map.set(char, (map.get(char) || 0) + 1)
    })
    for (char of t.split('')) {
        if (!map.has(char)) {
            return false
        } else if (map.get(char) === 1) {
            map.delete(char)
        } else map.set(char, map.get(char) - 1)
    }
    return !map.size
};

