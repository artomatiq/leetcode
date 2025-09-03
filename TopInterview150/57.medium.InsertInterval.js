/**
 * 57. Insert Interval

Medium

You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 105
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 105

 */


//initial solution

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    const [start, end] = newInterval
    const result = []
    const overlaps = {}
    let left = null
    let right = null

    if (!intervals.length) return [newInterval]

    for (let i = 0; i < intervals.length; i++) {
        console.log('...')
        console.log('now doing: ', intervals[i])

        const iStart = intervals[i][0]
        const iEnd = intervals[i][1]

        if (start <= iEnd) {
            console.log(`${start} <= curEnd`)
            left = i
            console.log('left found: ', left)
            for (let j = i; j < intervals.length; j++) {
                console.log('...')
                console.log('now doing j: ', intervals[j])
                const jStart = intervals[j][0]
                const jEnd = intervals[j][1]

                if (end <= jEnd) {
                    if (end < jStart) {
                        right = j - 1
                        console.log('right found: ', right)
                        break
                    }
                    right = j
                    console.log('right found: ', right)
                    break
                }
            }
            break
        }
    }
    if (left === null) {
        intervals.push(newInterval)
        return intervals
    }
    if (right === null) {
        right = intervals.length - 1
        console.log('right has to be: ', right)
    }
    if (right < 0) {
        intervals.splice(left, 0, newInterval)
        return intervals
    }

    console.log('lr', left, right)
    const insertLeft = Math.min(intervals[left][0], start)
    const insertRight = Math.max(intervals[right][1], end)
    const insertion = [insertLeft, insertRight]
    console.log('the insertion is: ', insertion)
    intervals.splice(left, right + 1 - left, insertion)
    console.log(intervals)
    return intervals
};


//cleaned up

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    const [start, end] = newInterval
    let left = null
    let right = null

    if (!intervals.length) return [newInterval]

    for (let i = 0; i < intervals.length; i++) {
        const [iStart, iEnd] = intervals[i]
        if (start <= iEnd) {
            left = i
            for (let j = i; j < intervals.length; j++) {
                const jStart = intervals[j][0]
                const jEnd = intervals[j][1]
                if (end <= jEnd) {
                    if (end < jStart) {
                        right = j - 1
                        break
                    }
                    right = j
                    break
                }
            }
            break
        }
    }
    if (left === null) {
        intervals.push(newInterval)
        return intervals
    }
    if (right === null) {
        right = intervals.length - 1
    }
    if (right < 0) {
        intervals.splice(left, 0, newInterval)
        return intervals
    }

    const insertLeft = Math.min(intervals[left][0], start)
    const insertRight = Math.max(intervals[right][1], end)
    const insertion = [insertLeft, insertRight]
    intervals.splice(left, right + 1 - left, insertion)
    return intervals
};

//final version

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    const [start, end] = newInterval
    let left = null
    let right = null

    for (let i = 0; i < intervals.length; i++) {
        const [iStart, iEnd] = intervals[i]
        if (start <= iEnd) {
            left = i
            for (let j = i; j < intervals.length; j++) {
                const [jStart, jEnd] = intervals[j]
                if (end <= jEnd) {
                    if (end < jStart) {
                        right = j - 1
                        break
                    }
                    right = j
                    break
                }
            }
            break
        }
    }
    if (left === null) return [...intervals, newInterval]
    if (right === null) right = intervals.length - 1
    if (right < 0) {
        intervals.splice(left, 0, newInterval)
        return intervals
    }
    const insertion = [
        Math.min(intervals[left][0], start),
        Math.max(intervals[right][1], end)
    ]
    intervals.splice(left, right + 1 - left, insertion)
    return intervals
};