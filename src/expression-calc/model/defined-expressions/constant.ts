import { Environment } from "../environment";
import { Expression } from "../expression";

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