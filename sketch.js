/**
 * @author Winry
 * @date 2022.02.23
 *
 * Coding plan:
 *  Note: Developed on the fly. Will not be full.
 *  ☒ Create Parser.js and comp dictionaries
 *  ☒ Add pseudocode for decToBinary
 *  ☐ Implement decToBinary
 *
 *  createDiv, .html
 *  loadStrings()
 *  output to html either with <pre> or <br/> for new lines
 *
 * ➜ symbol-Less implementation
 * cleaning asm code
 *      empty → ignore
 *      begins with // → ignore
 *      trim()
 *      what to do with // in the middle of a string?
 *
 *  paste in pseudocode in appropriate places
 *  iterate through each line from loadStrings()
 *  c or a? → console.log(`${line} → a-instruction`) or c-instruction
 *      a-instructions
 *          find 'rest' of line → decToBinary
 *      c-instructions: how to detect? how to tokenize dest=comp;jump?
 *          = → dest
 *          ; → jump
 *          pseudocode required before any coding happens. tracing required
 *              tracing test cases
 *                  🌟 all 3 parts
 *                  figure out all valid combinations of 2
 *                  valid combinations of 1
 *
 *
 * ➜ symbol implementation: 1st and 2nd passes
 *  see 6.4 assembly process
 */

// this prevents all inspections for grammar typos.
// noinspection GrazieInspection

let font, parser

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(640, 360)
    noCanvas()
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
