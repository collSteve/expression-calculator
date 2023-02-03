import { FixedLengthArray } from "../../utils/fixed-length-array";
import { Environment } from "./environment";

export abstract class Expression {
    constructor() {

    }

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

export class Multiply extends BinaryOperation {
    constructor(leftExpr: Expression, rightExpr: Expression) {
        super(leftExpr, rightExpr, "*");
    }

    evaluate(env: Environment): number {
        return this.leftExpr.evaluate(env) * this.rightExpr.evaluate(env);
    }
}

export class Add extends BinaryOperation {
    constructor(leftExpr: Expression, rightExpr: Expression) {
        super(leftExpr, rightExpr, "+");
    }

    evaluate(env: Environment): number {
        return this.leftExpr.evaluate(env) + this.rightExpr.evaluate(env);
    }
}

export class Minus extends BinaryOperation {
    constructor(leftExpr: Expression, rightExpr: Expression) {
        super(leftExpr, rightExpr, "-");
    }

    evaluate(env: Environment): number {
        return this.leftExpr.evaluate(env) - this.rightExpr.evaluate(env);
    }
}

export class Divide extends BinaryOperation {
    constructor(leftExpr: Expression, rightExpr: Expression) {
        super(leftExpr, rightExpr, "/");
    }

    evaluate(env: Environment): number {
        return this.leftExpr.evaluate(env) / this.rightExpr.evaluate(env);
    }
}

export class Constant extends Expression {
    value: number;

    constructor(value: number) {
        super();

        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    evaluate(env: Environment): number {
        return this.value;
    }
}


