import { deepCopy } from "../../../utils/copy";

class ParseNode {
    left: ParseNode | undefined;    
    right: ParseNode | undefined;
    value: string;

    constructor(value:string) {
        this.value = value;
    }
}

export class Input2ArrayTree {
    head: ParseNode;

    constructor(headValue: string, checkAgainst: string[]) {
        this.head = new ParseNode(headValue);
        Input2ArrayTree.parseNode(this.head, checkAgainst);
    }

    static parseNode(node: ParseNode|undefined, checkAgainst: string[]) {
        if (!Boolean(node)) {
            return;
        }

        node = node as ParseNode;

        for (const checker of checkAgainst) {
            const foundIndex = node.value.search(checker);
            
            if (foundIndex !== -1) {
                node.left = new ParseNode(node.value.substring(0, foundIndex));
                node.right = new ParseNode(node.value.substring(foundIndex + checker.length, node.value.length));

                node.value = deepCopy(checker);

                Input2ArrayTree.parseNode(node.right, checkAgainst);
                Input2ArrayTree.parseNode(node.left, checkAgainst);

                return;
            }
        }
    }

    toArray() {
        return Input2ArrayTree.toArray(this.head);
    }

    static toArray(node: ParseNode | undefined): string[] {
        if (!Boolean(node)) {
            return [];
        }

        node = node as ParseNode;

        const arrayLeft = Input2ArrayTree.toArray(node.left);
        const arrayRight = Input2ArrayTree.toArray(node.right);

        return arrayLeft.concat([node.value], arrayRight);
    }
}