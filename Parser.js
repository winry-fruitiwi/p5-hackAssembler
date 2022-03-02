// noinspection GrazieInspection

class Parser {
    constructor() {
        this.compDict = {
            "0":    "0101010",
            "1":    "0111111",
            "-1":   "0111010",
            "D":    "0001100",
            "A":    "0110000",
            "M":    "1110000",
            "!D":   "0001101",
            "!A":   "0110001",
            "!M":   "1110001",
            "-D":   "0001111",
            "-A":   "0110011",
            "-M":   "1110011",
            "D+1":  "0011111",
            "A+1":  "0110111",
            "M+1":  "1110111",
            "D-1":  "0001110",
            "A-1":  "0110010",
            "M-1":  "1110010",
            "D+A":  "0000010",
            "D+M":  "1000010",
            "D-A":  "0010011",
            "D-M":  "1010011",
            "A-D":  "0000111",
            "M-D":  "1000111",
            "D&A":  "0000000",
            "D&M":  "1000000",
            "D|A":  "0010101",
            "D|M":  "1010101"
        }

        this.destDict = {
            "null":  "000",
            "M":     "001",
            "D":     "010",
            "MD":    "011",
            "A":     "100",
            "AM":    "101",
            "AD":    "110",
            "AMD":   "111",
        }

        this.jumpDict = {
            "null":  "000",
            "JGT":   "001",
            "JEQ":   "010",
            "JGE":   "011",
            "JLT":   "100",
            "JNE":   "101",
            "JLE":   "110",
            "JMP":   "111",
        }
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
    decToBinary(num, wordLength) {
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


    // a function that determines whether or not the instruction passed in
    // is an A-instruction or a C-instruction. For now, I don't need to
    // check labels because I'm using the symbol-less files.
    // Pseudocode from earlier:
        // if there is an equal sign, register comp and dest. If there is
        //  		a semicolon, register jump. Else, register comp
        // if there is an @, add a 0 to the beginning of the string and
        //  	    find 15-digit number after the @. convert it to binary
    // Finding the different instructions:
        // if there is an @, call aInstruction
        // else, call cInstruction
    cOrAInstruction(line) {
        if (line.indexOf("@") !== -1) {
            return this.translateA(line)
        } else {
            return this.translateC(line)
        }
    }


    // the function that handles a-instructions. For now it will just be
    // console.log instance calls, but the actual translation is very simple.
    translateA(line) {
        // we know that the numerical part of an A-instruction is after
        // index 1, so the substring would be from 1 to length
        let numberString = line.substring(1, line.length)

        // we need to convert numberString into an int using the int() method
        let number = int(numberString)

        // now we can call decToBinary and save the result as binaryNumber!
        let binaryNumberString = this.decToBinary(number, 15)

        // now we just add a 0 to the beginning of the result and we're done!
        // the line signaling our result
        // console.log(`${line} → ${binaryLine}`)
        return "0" + binaryNumberString
    }

    // the function that translates c-instructions. More complicated.
    // Here is my new pseudocode:
    /*
        TODO Pseudocode for translating C-instructions
            Note before I get into the rest of this:
                There is no "comp" statement in programs, we can ignore it.
            Arguments: line
            define posOfEquals = line.indexOf("=")
            define posOfSemicolon = line.indexOf(";")
            define ifDest = (posOfEquals !== -1) as a flag
            define ifJump = (posOfSemicolon !== -1) as a flag
            result = "111"
            if (ifDest && ifJump):
                define dest = line.substring(0, posOfEquals)
                result += destDict[dest]
                define comp = line.substring(posOfEquals, posOfSemicolon)
                result += compDict[comp]
                define jump = line.substring(posOfSemicolon)
                result += jumpDict[jump]
            else if (ifDest):
                define dest = line.substring(0, posOfEquals)
                result += destDict[dest]
                define comp = line.substring(posOfEquals, posOfSemicolon)
                result += compDict[comp]
                result += jumpDict["null"]
            else if (ifJump):
                result += destDict["null"]
                define comp = line.substring(posOfEquals, posOfSemicolon)
                result += compDict[comp]
                define jump = line.substring(posOfSemicolon)
                result += jumpDict[jump]
            else:
                console.log("Hey! This is a junk statement!")
            at the end of the program, console.log the line and binary line.
    */
    translateC(line) {
        // find the positions of equal signs and semicolons, then check if
        // the respective letters exist (if they don't, the values will be -1)
        let posOfEquals = line.indexOf("=")
        let posOfSemicolon = line.indexOf(";")
        let ifDest = posOfEquals !== -1
        let ifJump = posOfSemicolon !== -1

        // the result of our translation
        let result = "111"
        // if there's an equals and a semicolon, register comp, dest, and jump
        if (ifDest && ifJump) {
            // find the comp token
            let comp = line.substring(posOfEquals, posOfSemicolon)
            result += this.compDict[comp]

            // find the dest token
            let dest = line.substring(0, posOfEquals)
            result += this.destDict[dest]

            // find the jump token
            let jump = line.substring(posOfSemicolon)
            result += this.jumpDict[jump]

            // console.log(`comp: ${comp}`)
            // console.log(`dest: ${dest}`)
            // console.log(`jump: ${jump}`)
        } else if (ifDest) {
            // find the comp token
            let comp = line.substring(posOfEquals + 1) // start after equal sign
            result += this.compDict[comp]

            // find the dest token
            let dest = line.substring(0, posOfEquals)
            result += this.destDict[dest]

            // find the jump token (doesn't exist)
            result += this.jumpDict["null"]

            // console.log(`comp: ${comp}`)
            // console.log(`dest: ${dest}`)
        } else if (ifJump) {
            let comp = line.substring(0, posOfSemicolon)
            result += this.compDict[comp]
            result += this.destDict["null"]
            let jump = line.substring(posOfSemicolon + 1)
            result += this.jumpDict[jump]

            // console.log(`comp: ${comp}`)
            // console.log(`jump: ${jump}`)
        }
        // console.log(`${line} → ${result}`)
        return result
    }
}