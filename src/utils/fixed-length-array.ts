import { deepCopy } from "./copy";

export type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' |  'unshift'
// export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
//   Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
//   & {
//     readonly length: L 
//     [ I : number ] : T
//     [Symbol.iterator]: () => IterableIterator<T>   
//   }

export interface FixedLengthArrayArgs<T> {
  length?: number;
  items?: T[];
  defaultValue?: T;
}

function defaultArray<T>(length: number, defaultValue: T, copy: (data:T)=>T = deepCopy) {
  const array: T[] = [];

  for (let i=0; i<length; i++) {
    array.push(copy(defaultValue));
  }

  return array;
}

export class FixedLengthArray<T> {
  length: number;
  items: T[];

  constructor(args: FixedLengthArrayArgs<T>) {
    if (!args.length && !args.items) {
      throw new Error('<FixedLengthArray> Length undefined.');
    }

    if (Boolean(args.length) && Boolean(args.items?.length) && args.length !== args.items?.length) {
      throw new Error('<FixedLengthArray> items length and length input not match.');
    }

    this.length = args.length ?? args.items?.length as number;

    if (!args.items && !args.defaultValue) {
      throw new Error('<FixedLengthArray> no items and default vlue specified.');
    }
    else {
      this.items = args.items ?? defaultArray(this.length, args.defaultValue as T);
    }
  }

  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
    return this.items.map<U>(callbackfn, thisArg);
  } 
} 