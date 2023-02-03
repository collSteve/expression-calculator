import { Environment } from "../environment";
import { BinaryOperation, Expression } from "../expression";

export class Multiply extends BinaryOperation {
    constructor(leftExpr: Expression, rightExpr: Expression) {
        super(leftExpr, rightExpr, "*");
    }

    evaluate(env: Environment): number {
        return this.leftExpr.evaluate(env) * this.rightExpr.evaluate(env);
    }
}