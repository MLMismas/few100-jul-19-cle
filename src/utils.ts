
export function add(a, b) {
    return a + b;
}


export const PI = 3.1415;

// window["add"] = add;

export function isEven(n: number): boolean {
    return n % 2 === 0;
}

//provide for optional arguments
export function formatName(first: string, last: string, mi?: string): string {
    let fullName = `${last}, ${first}`;
    if (mi !== undefined) {  //can also be written as if(mi) since undefined is falsey
        fullName += ` ${mi}.`;
    }
    return fullName;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 