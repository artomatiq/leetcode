/**
 * 733. Flood Fill

You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill:

Begin with the starting pixel and change its color to color.
Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel.
The process stops when there are no more adjacent pixels of the original color to update.
Return the modified image after performing the flood fill.

Example 1:

Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2

Output: [[2,2,2],[2,2,0],[2,0,1]]

Explanation:



From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.

Note the bottom corner is not colored 2, because it is not horizontally or vertically connected to the starting pixel.

Example 2:

Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0

Output: [[0,0,0],[0,0,0]]

Explanation:

The starting pixel is already colored with 0, which is the same as the target color. Therefore, no changes are made to the image.

Constraints:

m == image.length
n == image[i].length
1 <= m, n <= 50
0 <= image[i][j], color < 216
0 <= sr < m
0 <= sc < n
 */

//initial solution

var floodFill = function (image, sr, sc, color) {
    const num = image[sr][sc]

    function fill(sr, sc, previous) {
        if (image[sr][sc] === color || image[sr][sc] !== num) return

        image[sr][sc] = color

        if (previous !== 'd' && image[sr + 1]?.[sc] === num) { //check down
            fill(sr + 1, sc, 'u')
        } 
        if (previous !== 'l' && image[sr]?.[sc - 1] === num) { //check left
            fill(sr, sc - 1, 'r')
        } 
        if (previous !== 'u' && image[sr - 1]?.[sc] === num) { //check up
            fill(sr - 1, sc, 'd')
        } 
        if (previous !== 'r' && image[sr]?.[sc + 1] === num) { //check right
            fill(sr, sc + 1, 'l')
        }
        return  //we don't need this return statement because every function call eventually hits the base case
    }
    fill(sr, sc, null)
    return image
};




//simplified

//there is no reason to keep track of previous because previous is already updated to color which stops the loop at the top
//instead of putting a GUARD CLAUSE to make sure recursion is not called on an undefined block, we can put the guard clause at the top of the next function call

var floodFill = function (image, sr, sc, color) {
    const num = image[sr][sc]
    if (num === color) return image //this is necessary in case color is the same as the starting number aka no difference b/w filled and to-be-filled -> infinite recusrion

    function fill(sr, sc) {

        if (image[sr]?.[sc] !== num) return //guard clause (avoids type errors) + base case

        image[sr][sc] = color
        //check down
        fill(sr + 1, sc)
        //check left
        fill(sr, sc - 1)
        //check up
        fill(sr - 1, sc)
        //check right
        fill(sr, sc + 1)
    }

    fill(sr, sc)
    return image
};
