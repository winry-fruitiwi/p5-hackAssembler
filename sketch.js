// this prevents all inspections for grammar typos.
// noinspection GrazieInspection
/**
 * @author Winry
 * @date 2022.02.23
 *
 * Coding plan:
 *  Note: Developed on the fly. Will not be full.
 *  ☒ Create Parser.js and comp dictionaries
 *  ☒ Add pseudocode for decToBinary
 *  ☒ Implement decToBinary
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
 *          use indexOf to find index of // in string
 *          use substring to find the code and spaces
 *          use trim(" ") to remove the whitespace
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

let font, parser, asmFile
let div

function preload() {
    font = loadFont('data/meiryo.ttf')
    asmFile = loadStrings('asm/AInstructions.asm')
}

function setup() {
    createCanvas(640, 360)
    noCanvas()
    colorMode(HSB, 360, 100, 100, 100)

    parser = new Parser()
    div = createDiv()

    // the string that holds the assembly file's code
    let asmCodeAsHtmlInput = "<pre>"
    for (let i = 0; i < asmFile.length; i++) {
        let instruction = asmFile[i]
        // sometimes there are two slashes, then we need to find their
        // index. If it's not -1, we can ignore it... for now.
        let indexOfComment = instruction.indexOf("//")
        // test statement
        // console.log(`${instruction}: ${indexOfComment}`)
        if (indexOfComment !== -1) {
            instruction = instruction.substring(0, indexOfComment)
        }

        // if there's empty whitespace we can skip the line.
        if (instruction === "") {
            continue
        }

        // the first if statement is sufficient for handling comments that
        // occupy a single line, but if we want to handle inline
        // comments, we need to trim the extra whitespace with trim().
        instruction = trim(instruction)

        asmCodeAsHtmlInput += instruction + "\n"
    }
    asmCodeAsHtmlInput += "</pre>"

    div.html(asmCodeAsHtmlInput)

    // our asmCodeAsHtmlInput variable still has the <pre> tags, which we'll
    // remove here. Then we'll be ready to split and log it! I'm using the
    // numbers 5 and 7 because <pre> has a length of 5 and </pre> has a
    // length of 6, plus the length of an empty string (or 1, apparently).
    let asmCode = asmCodeAsHtmlInput.substring(5, asmCodeAsHtmlInput.length - 7)

    // we're going to feed each instruction that we've cleaned up into our
    // parser! This is also more efficient than doing the same thing in the
    // parser class's functions.
    let cleanAsmFile = split(asmCode, "\n")

    // testing statement
    // console.log(cleanAsmFile)

    // test area
    for (let line of cleanAsmFile) {
        parser.cOrAInstruction(line)
    }
}

function draw() {
    background(234, 34, 24)
}
