import { defaultArray } from "../../utils/fixed-length-array";
import { binaryOperators, notationParseChars, unaryOperators } from "./parser/parser-constants";
import { Input2ArrayTree } from "./parser/input-2-array-tree";

export type bracketType = 'openBracket' | 'closeBracket';

export type BracketPair = {
    openBracket: string;
    closeBracket: string;
}

const defaultBracketPairs: BracketPair[] = [
    {
        openBracket: '(',
        closeBracket: ')'
    },
    {
        openBracket: '[',
        closeBracket: ']'
    },
    {
        openBracket: '{',
        closeBracket: '}'
    }
];

export class Parser {
    

    static parseToNodesArray(input: string, validBrackets: BracketPair[] = defaultBracketPairs): string[] {

        const { brackets } = this.generateBracketInfo(validBrackets);

        // parse expressions to array by splitting by brackets, unary/binary operators, numbers
        const checkAgainst: string[] = brackets.concat(unaryOperators, binaryOperators, notationParseChars);

        const primitiveParseTree = new Input2ArrayTree(input, checkAgainst);

        return primitiveParseTree.toArray();
    }


    // static parseExpression(input: string, validBrackets: BracketPair[] = defaultBracketPairs): Expression {
    //     if (!Parser.isInputValid) {
    //         throw new Error("Input is not valid.");
    //     }

        

    //     const OutterExpression = ;
    //     const innerExpressions = ;

    //     return 
    // }

    static isInputValid(input: string): boolean {
        return Parser.isBracketValid(input);
    }

    static isBracketValid(input: string, validBrackets: BracketPair[] = defaultBracketPairs) {
        const bracketsIndexData: (BracketPair & {index: number})[] = validBrackets.map((item, index)=>{
            return {
                index,
                ...item
        }});

        // process bracket to index type map
        const bracketToIndexType: {[key:string]: {index: number, type: bracketType}} = {};
        for (const bracketData of bracketsIndexData) {
            bracketToIndexType[bracketData.openBracket] = {
                index: bracketData.index,
                type: 'openBracket'
            };

            bracketToIndexType[bracketData.closeBracket] = {
                index: bracketData.index,
                type: 'closeBracket'
            }
        }

        const allBrackets: string[] = Object.keys(bracketToIndexType);

        const bracketsCount: number[] = defaultArray(validBrackets.length, 0);
        

        for (let i = 0; i < input.length; i++) {
            const currentChar = input.charAt(i);
            if (allBrackets.includes(currentChar)) {
                const bracketInfo: {type:bracketType, index: number} = bracketToIndexType[currentChar];

                if (bracketInfo.type === 'openBracket') {
                    bracketsCount[bracketInfo.index]++;
                }
                else if (bracketInfo.type === 'closeBracket') {
                    bracketsCount[bracketInfo.index]--;

                    // close bracket occurs before open bracket
                    if (bracketsCount[bracketInfo.index] < 0) {
                        return false;
                    }
                }
            }
        }

        return bracketsCount.every((value)=> value === 0);
    }

    static generateBracketInfo(validBrackets: BracketPair[] = defaultBracketPairs) {
        const bracketsIndexData: (BracketPair & {index: number})[] = validBrackets.map((item, index)=>{
            return {
                index,
                ...item
        }});

        // process bracket to index type map
        const bracketToIndexType: {[key:string]: {index: number, type: bracketType}} = {};
        for (const bracketData of bracketsIndexData) {
            bracketToIndexType[bracketData.openBracket] = {
                index: bracketData.index,
                type: 'openBracket'
            };

            bracketToIndexType[bracketData.closeBracket] = {
                index: bracketData.index,
                type: 'closeBracket'
            }
        }

        const brackets: string[] = Object.keys(bracketToIndexType);

        const bracketsCount: number[] = defaultArray(validBrackets.length, 0);

        return {
            bracketsIndexData,
            bracketToIndexType,
            brackets,
            bracketsCount
        }
    }
}