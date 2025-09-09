/**
 * 542. 01 Matrix
Medium

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two cells sharing a common edge is 1.

Example 1:
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]

Example 2:
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.
 */

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    console.log('matrix: ')
    for (let row of mat) {
        console.log(row.join(" "));
    }
    const rows = mat.length
    const cols = mat[0].length
    const set = new Set()
    const que = []
    let head = 0

    //visit all zeroes, start the que with 1s
    console.log('finding zeroes and starting que')
    for (let m = 0; m < rows; m++) {
        // console.log('m: ', m)
        for (let n = 0; n < cols; n++) {
            // console.log('n: ', n)
            if (mat[m][n] === 0) {
                // console.log('found zero at m: ', m, ' n: ', n)
                changeNeighbors(m, n, 0)
            }
        }
    }

    function changeNeighbors(m, n, target) {
        let changed = false
        set.add(`${m}${n}`)
        const directions = [
            { direction: 'down', row: m + 1, col: n },
            { direction: 'right', row: m, col: n + 1 },
            { direction: 'up', row: m - 1, col: n },
            { direction: 'left', row: m, col: n - 1 }
        ]
        for (const item of directions) {
            //if neighbor is out of bounds
            // console.log('now checking ', item.direction, ' neighbor', ' for target ', target)
            if (item.row < 0 || item.row >= rows || item.col < 0 || item.col >= cols) continue
            //neighbor already changed
            if (set.has(`${item.row}${item.col}`)) continue

            if (target !== 0) {
                mat[item.row][item.col] = target + 1
                changed = true
            }
            if (mat[item.row][item.col] !== 0) {
                // console.log('adding to que')
                que.push([item.row, item.col])
                set.add(`${item.row}${item.col}`)
                changed = true
            }
        }
        return changed
    }

    console.log(que)
    // console.log('head: ', head)

    while (head < que.length) {
        const [row, col] = que[head]
        const target = mat[row][col]
        // console.log('now doing ', row, col, 'for target: ', target)
        changing = changeNeighbors(row, col, target)
        head++
    }

    return mat
};