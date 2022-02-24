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
}