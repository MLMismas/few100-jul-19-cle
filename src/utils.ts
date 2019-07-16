
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