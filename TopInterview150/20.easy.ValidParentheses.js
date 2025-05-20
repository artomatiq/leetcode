/*

20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.


Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([])"
Output: true

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.

*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

    let running = true

    const map = new Map([
        ['(', ')'],
        ['{', '}'],
        ['[', ']']
    ])
    const visited = new Set()
    function findNextInnermost(startingIndex) {
        for (let i = startingIndex; i < s.length; i++) {
            if (map.has(s[i])) {
                const closingMatch = map.get(s[i])
                if (s[i + 1] === closingMatch) {
                    console.log('next innermost found', [i, i + 1])
                    return [i, i + 1]
                }
            }
        }
        console.log('no innermost')
        running = false
        return false
    }
    function match(leftIndex, rightIndex) {
        //if it's a valid match
        if (s[rightIndex] === map.get(s[leftIndex])) {
            console.log(leftIndex, '&', rightIndex, ' are a match')
            return true
        }
        //if both are open
        if (map.has(s[leftIndex]) && map.has(s[rightIndex])) {
            console.log(leftIndex, '& ', rightIndex, ' are both open')
            return null
        }
        //invalid pair
        console.log(leftIndex, '&', rightIndex, 'are invalid')
        return false
    }
    function expand(leftIndex, rightIndex) {
        //starting from valid innermost pair
        while (running) {
            console.log('rightIndex: ', rightIndex)
            console.log('leftIndex: ', leftIndex)
            if (rightIndex === s.length && !s[leftIndex]) {
                running = null
                break
            }
            if (leftIndex === undefined) {
                if (!map.has(s[rightIndex])) {
                    running = false
                    break
                } 
                else {
                    rightmostIndex--
                    break
                }
            }
            if (visited.has(leftIndex)) {
                leftIndex = stack.pop()
                continue
            }
            if (leftIndex < 0) {
                console.log('we fell off the left edge, new rightmostIndex: ', rightIndex)
                // rightmostIndex = rightIndex
                break
            }

            let doTheyMatch = match(leftIndex, rightIndex)

            //valid pair
            if (doTheyMatch === true) {
                visited.add(rightIndex)
                visited.add(leftIndex)
                console.log('visited set updated to: ', visited)
            }
            //both open
            else if (doTheyMatch === null) {
                console.log('new rightmostIndex: ', rightIndex)
                stack.push(leftIndex)
                console.log('stack updated to: ', stack)
                // rightmostIndex = rightIndex
                break
            }
            //invalid pair
            else if (doTheyMatch === false) {
                running = false
            }

            rightIndex++
            leftIndex--
        }
        rightmostIndex = rightIndex
        console.log('exiting expand with rightmostIndex: ', rightmostIndex)
    }

    let rightmostIndex = 0
    let stack = []

    while (running) {
        let innermostPair = findNextInnermost(rightmostIndex)

        if (!innermostPair) {
            console.log('stopped expanding since ', rightmostIndex, '...no more innermost pairs')
            break
        }

        //we have an innermost pair
        expand(innermostPair[0], innermostPair[1])
    };

    if (running === false) return false
    if (running === null) return true
    return true
}




//optimal solution

var isValid = function(s) {
    const stack = []
    const map = new Map ([
        [')', '('],
        [']', '['],
        ['}', '{']
    ])
    for (const char of s) {
        if (!map.has(char)) stack.push(char)
        else if (stack.pop() !== map.get(char)) return false
    }
    return stack.length === 0;
};