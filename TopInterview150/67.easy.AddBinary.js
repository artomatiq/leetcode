/**
 * 67. Add Binary
Easy

Given two binary strings a and b, return their sum as a binary string.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"

Constraints:

1 <= a.length, b.length <= 104
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.
 */

//incorrect solution

var addBinary = function(a, b) {
    let aNum = parseInt(a, 2)
    let bNum = parseInt(b, 2)
    let sum = aNum + bNum

    return sum.toString(2)
};

//this does not work because parseInt() is imprecise for very large inputs


//optimal solution

var addBinary = function(a, b) {
    let result = '';
    let carry = 0;

    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry) {
        const bitA = i >= 0 ? parseInt(a[i]) : 0;
        const bitB = j >= 0 ? parseInt(b[j]) : 0;

        const sum = bitA + bitB + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);

        i--;
        j--;
    }

    return result;
};

//new optimal solution

//here, we are avoiding creating a new string every time, and are instead reversing the array once at the end to yield the result

var addBinary = function(a, b) {

    let result = []
    let carry = 0

    for (let i=a.length-1, j=b.length-1; i >= 0 || j >= 0; i--, j--) {
        let addendA = a[i] || '0'
        let addendB = b[j] || '0'

        let sum = Number(addendA) + Number(addendB) + carry
        if (sum < 2) {
            result.push(`${sum}`)
            carry = 0
        } else if (sum === 2) {
            result.push('0')
            carry = 1
        }
        else {
            result.push('1')
        }
    }
    if (carry) result.push('1')
    return result.reverse().join('')
};

//more elegent version

var addBinary = function(a, b) {
    let result = []

    let i = a.length - 1
    let j = b.length - 1
    let carry = 0

    while (i>-1 || j>-1 || carry ) {
        let numA = i > -1? parseInt(a[i]) : 0
        let numB = j > -1? parseInt(b[j]) : 0

        let sum = numA + numB + carry
        result.push(String(sum % 2))
        carry = Math.floor(sum/2)

        i--
        j--
    }
    
    return result.reverse().join('')
};