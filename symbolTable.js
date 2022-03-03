class SymbolTable {
    constructor() {
        // Zz's dictionary of all the predefined symbols.
        this.symbolDict = {
            "R0":       0,
            "R1":       1,
            "R2":       2,
            "R3":       3,
            "R4":       4,
            "R5":       5,
            "R6":       6,
            "R7":       7,
            "R8":       8,
            "R9":       9,
            "R10":      10,
            "R11":      11,
            "R12":      12,
            "R13":      13,
            "R14":      14,
            "R15":      15,
            "SCREEN":   16384,
            "KBD":      24576,
            "SP":       0,
            "LCL":      1,
            "ARG":      2,
            "THIS":     3,
            "THAT":     4,
        }
    }


    // adds a key-value pair to the symbol table
    addKeyValuePair(key, value) {
        this.symbolDict[key] = value
    }


    // checks if a symbol is in the table and returns a boolean.
    ifSymbolDoesntExist(key) {
        return this.symbolDict[key] === undefined
    }


    // retrieves the target symbol from the symbol dictionary.
    retrieveSymbol(symbol) {
        return this.symbolDict[symbol]
    }


    // when printed out, prints its inner dictionary instead of its address.
    toString()  {
        return this.symbolDict
    }
}
