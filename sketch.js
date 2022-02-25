/**
 * @author Winry
 * @date 2022.02.23
 *
 * Coding plan:
 *     Note: Developed on the fly. Will not be full.
 *     ☒ Create Parser.js and comp dictionaries
 *     ☒ Add pseudocode for decToBinary
 *     ☐ Implement decToBinary
 *
 */
let font

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(640, 360)
    noCanvas()
    colorMode(HSB, 360, 100, 100, 100)

    // testing loop
    for (let num = 0; num < 17; num++) {
        // this lets me see my result
        console.log(`${num}: ${decToBinary(num, 5)}`)
        // decToBinary(num, 5)
    }

    // console.assert(decToBinary(0, 5) === "00000")
    // console.assert(decToBinary(1, 5) === "00001")
    // console.assert(decToBinary(2, 5) === "00010")
    // console.assert(decToBinary(3, 5) === "00011")
    // console.assert(decToBinary(4, 5) === "00100")
    // console.assert(decToBinary(5, 5) === "00101")
    // console.assert(decToBinary(6, 5) === "00111")
    // console.assert(decToBinary(7, 5) === "01000")
    // console.assert(decToBinary(8, 5) === "01001")
    // console.assert(decToBinary(9, 5) === "01010")
}

function draw() {
    background(234, 34, 24)

}

/*
  TODO pseudocode for decToBinary!
      I'm implementing the iterative approach.
      Args: int num, int wordLength
      initialize maxPowerOf2FitsInNum as 0
      loop until 2**maxPowerOf2FitsInNum > num
          increment maxPowerOf2FitsInNum
      When loop terminates, decrement maxPowerOf2FitsInNum
      Initialize empty string called word
      while loop decrementing maxPowerOf2FitsInNum until it reaches 0
          initialize a string called newWord = "0"
          if 2**maxPowerOf2FitsInNum <= num:
              newWord = "1"
              num -= 2**maxPowerOf2FitsInNum
          newWord += word
          word = newWord
          if num = 0, break the loop
          maxPowerOf2FitsInNum -= 1
      At the end of the program:
          word = "0" + word
          Put this in a do-while loop?
          If word.length >= wordLength, terminate program.
*/
function decToBinary(num, wordLength) {
    // keeps track of the binary word
    let word = ""

    // apparently, 1 and 2 are not-working base cases...
    if (num > 2 || num === 0) {
        // the largest power of 2 that fits in num
        let maxPowerOf2FitsInNum = 0

        // find the largest power of 2 that fits in num
        while (2 ** maxPowerOf2FitsInNum <= num) {
            maxPowerOf2FitsInNum++
        }
        // we have to decrement maxPowerOf2FitsInNum, otherwise it won't fit!
        maxPowerOf2FitsInNum--
        // console.log(`${num}: ${maxPowerOf2FitsInNum}`)


        /* Find the actual word of bits */
        while (maxPowerOf2FitsInNum >= 0) {
            // console.log("looping")
            let newWord = "0"
            if (2**maxPowerOf2FitsInNum <= num) {
                newWord = "1"
                num -= 2**maxPowerOf2FitsInNum
            }
            // this was the wrong order earlier
            // newWord += word
            // word = newWord
            word += newWord

            // This doesn't work because if my number is 4, I'm going to
            // exit out of the loop and be left with just 1, not 10(0). I
            // also just realized that the condition for my current loop
            // needs to be >=, not > because 2**0 is still 1. It's not 0.
            // if (num === 0) {
            //     break
            // }
            maxPowerOf2FitsInNum--
        }

    } else if (num === 2) {
        word = "10"
    } else if (num === 1) {
        word = "1"
    } else {
        return "This program can't (and doesn't need to) handle negative" +
            " numbers yet!"
    }


    /* Fill in the extra spaces with zeroes */
    while (word.length < wordLength) {
        word = "0" + word
    }

    /* Return the new binary number! It's currently a string. */
    return word
}
