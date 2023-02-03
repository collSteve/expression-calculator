import { Expression } from "./expression"

export class Environment {
    variableExpressionMap: Map<string, Expression>; 

    constructor() {
        this.variableExpressionMap = new Map<string, Expression>();
    }

    getVariableExpression(symbol: string): Expression {
        const result = this.variableExpressionMap.get(symbol);

        if (result) {
            return result;
        }

        throw new Error(`Variable with symbol ${symbol} does not exist in environment.`);
    }
}