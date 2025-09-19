/**
 * 973. K Closest Points to Origin
Medium
Topics
premium lock icon
Companies
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].


Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.

Constraints:

1 <= k <= points.length <= 104
-104 <= xi, yi <= 104
 */



//first working solution


var kClosest = function(points, k) {
    const sorted = new Array(points.length)

    for (let i=0; i<points.length; i++) {
        let a = points[i][0]**2
        let b = points[i][1]**2
        let hyp = a+b

        console.log('i: ', i, 'hyp: ', hyp)

        sorted[i] = [hyp, i]
    }

    console.log(sorted)

    sorted.sort( (a, b) => a[0] - b[0])

    console.log(sorted)

    let result = Array(k)

    for (let i = 0; i<k; i++) {
        let index = sorted[i][1]
        result[i] = points[index]
    }

    return result
};


//cleaner version

var kClosest = function (points, k) {

    const sorted = points
        .map((p, i) => [(p[0] ** 2 + p[1] ** 2), i])
        .sort((a, b) => a[0] - b[0])

    let result = Array(k)
    for (let i = 0; i < k; i++) {
        const [, index] = sorted[i];
        result[i] = points[index]
    }
    return result
};