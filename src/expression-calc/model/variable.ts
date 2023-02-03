import { Environment } from "./environment";
import { Expression } from "./expression";

export class Variable extends Expression {
    protected symbol: string;

    constructor(symbol: string) {
        super();
        this.symbol = symbol;
    }

    toString(): string {
        return this.symbol;
    }
    evaluate(env: Environment): number {
        return env.getVariableExpression(this.symbol).evaluate(env);
    }

    evaluateVariate(env: Environment): Expression {
        return env.getVariableExpression(this.symbol);
    }
}