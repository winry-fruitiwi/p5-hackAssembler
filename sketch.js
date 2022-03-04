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
 *
 *    create SymbolTable class (data structure is dictionary)
 *    initialize builtin symbols (R0 → R1, screen-keyboard, others)
 *    add symbolExists() method
 *    go through all the instructions in file
 *    if the syntax is (x), add to collection
 *        Use symbol table class with a dict
 *        Add symbol-value pairs to the dict
 *    otherwise, continue to scan instructions until end of file
 *    use regex to find if symbol is @x
 *        expression should look something like "@.[^0-9]"
 *        if expression is @x:
 *            if x doesn't already exist, add its respective value
 */

let font, parser, symbolTable, lineCount, asmFile

function preload() {
    font = loadFont('data/meiryo.ttf')
    asmFile = loadStrings('asm/AInstructions.asm')
}

function setup() {
    createCanvas(640, 360)
    noCanvas()
    colorMode(HSB, 360, 100, 100, 100)

    parser = new Parser()
    symbolTable = new SymbolTable()
    // we need to count the number of lines we've gone through, or else we
    // won't be able to translate labels.
    lineCount = 0

    // the string that holds the assembly file's code
    let asmCodeAsHtmlInput = "<pre>"
    for (let i = 0; i < asmFile.length; i++) {
        let instruction = asmFile[i]

        // sometimes there will be labels with syntax: (label)
        // we need to account for this when we're cleaning the file.
        if (instruction[0] === "(") {
            let symbol = instruction.substring(1, instruction.length-1)
            symbolTable.addKeyValuePair(symbol, lineCount)
            continue
        }

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
        lineCount += 1
    }
    asmCodeAsHtmlInput += "</pre>"

    select('#left').html(asmCodeAsHtmlInput)

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

    let lineOutput = ""
    for (let line of cleanAsmFile) {
        let binaryLine = parser.cOrAInstruction(line)
        lineOutput += `${binaryLine}\n`
    }

    // SymbolTable testing area
    console.log(symbolTable.toString())

    select("#middle").html('<pre>' + lineOutput + '</pre>')
}

function draw() {
    background(234, 34, 24)
}
