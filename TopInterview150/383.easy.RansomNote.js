/**
 * 383. Ransom Note

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true

Constraints:

1 <= ransomNote.length, magazine.length <= 105
ransomNote and magazine consist of lowercase English letters.
 */

//initial solution

var canConstruct = function (ransomNote, magazine) {
    let map = new Map()
    for (char of ransomNote) {
        map.set(char, (map.get(char) || 0) + 1)
    }
    for (char of magazine) {
        if (!map.size) break
        if (map.has(char)) {
            map.set(char, map.get(char) - 1)
            if (map.get(char) === 0) {
                map.delete(char)
            }
        }
    }
    return !map.size
};