import { FixedLengthArray } from "../../utils/fixed-length-array";
import { Environment } from "./environment";

export abstract class Expression {
    abstract toString(): string;

    abstract evaluate(env: Environment): number;

    evaluateVariate(env: Environment): Expression {
        return this;
    }
}

export abstract class NNaryOperation extends Expression {
    protected inputExpressions: FixedLengthArray<Expression>;
    protected parameterLength: number;
    protected symbol: string;

    constructor(inputExpressions: Expression[], parameterLength: number, symbol: string) {
        super();
        this.inputExpressions = new FixedLengthArray({items: inputExpressions, length: parameterLength});
        this.parameterLength = parameterLength;
        this.symbol = symbol;
    }

    toString(): string {
        return `${this.symbol}(${this.inputExpressions.map((item)=>item.toString()).join(", ")})`;
    }
}

export abstract class UniOperation extends Expression {
    protected insertExpr: Expression;
    protected symbol: string;

    constructor(insertExpr: Expression, symbol: string) {
        super();
        this.insertExpr = insertExpr;
        this.symbol = symbol;
    }
}

export abstract class BinaryOperation extends Expression {
    protected leftExpr: Expression;
    protected rightExpr: Expression;
    protected symbol: string;

    constructor(leftExpr: Expression, rightExpr: Expression, symbol: string) {
        super();

        this.leftExpr = leftExpr;
        this.rightExpr = rightExpr;
        this.symbol = symbol;
    }

    toString(): string {
        return `(${this.leftExpr} ${this.symbol} ${this.rightExpr})`;
    }
}