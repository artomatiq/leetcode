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
    console.log('set has it? ', set.has('115'))
    for (let m = 0; m < rows; m++) {
        console.log('...m: ', m)
        for (let n = 0; n < cols; n++) {
            console.log('n: ', n)
            if (mat[m][n] === 0) {
                changeNeighbors(m, n, 0)
                console.log('set has it? ', set.has('115'))
            }
        }
    }

    function changeNeighbors(m, n, target) {
        set.add(`${m},${n}`)
        if (m===1 && n===15) {
            console.log('adding 1|15 to the set')
        }
        const directions = [
            { direction: 'down', row: m + 1, col: n },
            { direction: 'right', row: m, col: n + 1 },
            { direction: 'up', row: m - 1, col: n },
            { direction: 'left', row: m, col: n - 1 }
        ]

        // console.log('now checking neighbors of', m, ' ', n)
        for (const item of directions) {
            if (m === 1 && n === 14) {
                console.log(item.direction)
            }
            //if neighbor is out of bounds
            if (item.row < 0 || item.row >= rows || item.col < 0 || item.col >= cols) continue
            //neighbor already changed
            if (set.has(`${item.row},${item.col}`)) {
                if (m === 1 && n === 14) {
                    console.log('set already has this neighbor')
                }
                continue
            }

            if (target !== 0) {
                if (item.row === 1 && item.col === 14) {
                    console.log('target is not zero')
                }
                mat[item.row][item.col] = target + 1
                if (m === 1 && n === 14) {
                    console.log(console.log('now checking neighbors of', m, ' ', n))
                }
            }
            if (mat[item.row][item.col] !== 0) {
                que.push([item.row, item.col])
                if (m === 1 && n === 14) {
                    console.log(console.log('now checking neighbors of', m, ' ', n))
                }
                set.add(`${item.row},${item.col}`)
                if (item.row === 1 && item.col === 15) {
                    console.log(item.row, ' ', item.col, 'added to que')
                    console.log('here is the que ', que)
                }
            }
        }
    }

    // console.log(que)
    // console.log('head: ', head)

    while (head < que.length) {
        console.log('........head: ', head)
        const [row, col] = que[head]
        const target = mat[row][col]
        console.log('.....now doing ', row, col)
        console.log('set has it? ', set.has('115'))
        changeNeighbors(row, col, target)
        head++
    }

    return mat
};


//cleaner version

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const rows = mat.length
    const cols = mat[0].length
    const set = new Set()
    const que = []
    let head = 0

    //visit all zeroes, start the que with 1s
    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            if (mat[m][n] === 0) {
                changeNeighbors(m, n, 0)
            }
        }
    }

    function changeNeighbors(m, n, target) {
        set.add(`${m},${n}`)
        const directions = [
            { direction: 'down', row: m + 1, col: n },
            { direction: 'right', row: m, col: n + 1 },
            { direction: 'up', row: m - 1, col: n },
            { direction: 'left', row: m, col: n - 1 }
        ]
        for (const item of directions) {
            const neighborRow = item.row
            const neighborCol = item.col
            //if neighbor is out of bounds
            if (neighborRow < 0 || neighborRow >= rows || neighborCol < 0 || neighborCol >= cols) continue
            //neighbor already changed
            if (set.has(`${neighborRow},${neighborCol}`)) {
                continue
            }

            if (target !== 0) {
                mat[neighborRow][neighborCol] = target + 1
            }
            if (mat[neighborRow][neighborCol] !== 0) {
                que.push([neighborRow, neighborCol])
                set.add(`${neighborRow},${neighborCol}`)
            }
        }
    }
    while (head < que.length) {
        const [row, col] = que[head]
        const target = mat[row][col]
        changeNeighbors(row, col, target)
        head++
    }
    return mat
};

/**
 * set.add(`${neighborRow},${neighborCol}`)
 * 
 * this stringification process is inefficient, it's better to use an array, especially since its size will be predifined
 */


/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const rows = mat.length
    const cols = mat[0].length
    const visited = Array.from( {length: rows}, () => Array(cols).fill(false))
    const que = []

    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            if (mat[m][n] === 0) {
                changeNeighbors(m, n, 0)
            }
        }
    }
    function changeNeighbors(m, n, target) {
        visited[m][n] = true
        const directions = [
            { direction: 'down', row: m + 1, col: n },
            { direction: 'right', row: m, col: n + 1 },
            { direction: 'up', row: m - 1, col: n },
            { direction: 'left', row: m, col: n - 1 }
        ]
        for (const item of directions) {
            const neighborRow = item.row
            const neighborCol = item.col

            if (neighborRow < 0 || neighborRow >= rows || 
                neighborCol < 0 || neighborCol >= cols ||
                visited[neighborRow][neighborCol]
            ) 
            continue

            if (target !== 0) {
                mat[neighborRow][neighborCol] = target + 1
            }
            if (mat[neighborRow][neighborCol] !== 0) {
                que.push([neighborRow, neighborCol])
                visited[neighborRow][neighborCol] = true
            }
        }
    }

    let head = 0
    while (head < que.length) {
        const [row, col] = que[head]
        const target = mat[row][col]
        changeNeighbors(row, col, target)
        head++
    }
    return mat
};