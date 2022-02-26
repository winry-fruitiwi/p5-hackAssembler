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

// this prevents all inspections for grammar typos.
// noinspection GrazieInspection

let font, parser

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    parser = new Parser()

    // testing loop
    // for (let num = 0; num < 17; num++) {
    //     // this lets me see my result
    //     console.log(`${num}: ${decToBinary(num, 5)}`)
    //     // decToBinary(num, 5)
    // }

    // random number test statements
    // console.log(decToBinary(16384, 16))

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
