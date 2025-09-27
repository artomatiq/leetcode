/**
 * 15. 3Sum
Attempted
Medium
Topics
premium lock icon
Companies
Hint
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */


/**
 * @param {number[]} nums
 * @return {number[][]}
 */


var threeSum = function (nums) {

    const matchedTriplets = new Set()
    const targetMap = new Map()
    function skipPair(pair) {
        console.log('checking pair: ', pair)
        const [a, b] = pair

        const newTriplet = [a, b, 0 - a - b]
        newTriplet.sort((a, b) => a - b)
        if (matchedTriplets.has(String(newTriplet))) {
            console.log('matchedTriplets already has: ', newTriplet)
            return true
        }
        return false
    }
    const result = []


    for (let i = 1; i < nums.length; i++) {
        console.log('...............i: ', i, '__', nums[i])

        const match = targetMap.get(nums[i])
        if (match) {
            console.log('`${nums[i]} IS a target`')

            const triplet = [nums[i], nums[match[0]], nums[match[1]]]
            triplet.sort((a, b) => a - b)
            console.log('this is the triplet: ', triplet)

            //skip if triplet has already been added
            if (matchedTriplets.has(String(triplet))) {
                console.log('matchedTriplets already has: ', triplet)
                continue
            }
            result.push(triplet)
            matchedTriplets.add(String(triplet))
            console.log(triplet, ' added to matchedTriplets')
        } else {
            console.log(`${nums[i]} is NOT a target`)
        }

        for (let j = i - 1; j >= 0; j--) {
            console.log('j ', j, '__', nums[j])
            const pairMin = Math.min(nums[i], nums[j])
            const pairMax = Math.max(nums[i], nums[j])
            if (skipPair([nums[i], nums[j]])) continue
            else {
                const target = 0 - pairMin - pairMax
                targetMap.set(target, [j, i])
                console.log(`${target}: '${j}${i}' has been added to targetMap`)
            }
        }
    }

    return result
};

//the problem is that a target inside targetMap can be overwritten if a new target is identified before the old one finds a match



//bug has been fixed in this version

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {

    const matchedTriplets = new Set()
    const targetMap = new Map()
    function skipPair(pair) {
        console.log('checking pair: ', pair)
        const [a, b] = pair
        const newTriplet = [a, b, 0 - a - b]
        newTriplet.sort((a, b) => a - b)
        if (matchedTriplets.has(String(newTriplet))) {
            console.log('matchedTriplets already has: ', newTriplet)
            return true
        }
        return false
    }
    const result = []

    for (let i = 1; i < nums.length; i++) {
        console.log('...............i: ', i, '__', nums[i])
        const matches = targetMap.get(nums[i])
        if (matches) {
            console.log(`${nums[i]} IS a target`)
            console.log('this target has ', matches.length, ' triplets to be matched')
            matches.forEach(match => {
                const triplet = [nums[i], nums[match[0]], nums[match[1]]]
                triplet.sort((a, b) => a - b)
                console.log('this is the triplet: ', triplet)
                //skip if triplet has already been added
                if (matchedTriplets.has(String(triplet))) {
                    console.log('matchedTriplets already has: ', triplet)
                    return
                }
                result.push(triplet)
                matchedTriplets.add(String(triplet))
                console.log(triplet, ' added to matchedTriplets')
            })
        } else {
            console.log(`${nums[i]} is NOT a target`)
        }

        for (let j = i - 1; j >= 0; j--) {
            console.log('j ', j, '__', nums[j])
            const pairMin = Math.min(nums[i], nums[j])
            const pairMax = Math.max(nums[i], nums[j])
            if (skipPair([nums[i], nums[j]])) continue
            else {
                const target = 0 - pairMin - pairMax
                //if target already exists, add another [j, i] pair
                if (targetMap.has(target)) {
                    console.log('###TARGETMAP### already has this target: ', target, '...', targetMap.get(target))
                    targetMap.get(target).push([j, i])
                    // console.log('targetMap value for ', target, ' updated to ', targetMap.get(target))
                    continue
                }
                targetMap.set(target, [[j, i]])
                console.log(`${target}: '${j}${i}' has been added to targetMap`)
            }
        }
    }
    return result
};




//cleaner version
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const matchedTriplets = new Set()
    const targetMap = new Map()
    const result = []
    function skipPair(pair) {
        const [a, b] = pair
        const newTriplet = [a, b, 0 - a - b]
        newTriplet.sort((a, b) => a - b)
        if (matchedTriplets.has(String(newTriplet))) {
            return true
        }
        return false
    }
    for (let i = 1; i < nums.length; i++) {
        const matches = targetMap.get(nums[i])
        if (matches) {
            matches.forEach(match => {
                const triplet = [nums[i], nums[match[0]], nums[match[1]]]
                triplet.sort((a, b) => a - b)
                if (matchedTriplets.has(String(triplet))) return
                result.push(triplet)
                matchedTriplets.add(String(triplet))
            })
        }
        for (let j = i - 1; j >= 0; j--) {
            if (skipPair([nums[i], nums[j]])) continue
            else {
                const target = 0 - nums[i] - nums[j]
                if (targetMap.has(target)) {
                    targetMap.get(target).push([j, i])
                    continue
                }
                targetMap.set(target, [[j, i]])
            }
        }
    }
    return result
};