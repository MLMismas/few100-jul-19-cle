describe('data types', () => {
    describe('declaring variables', () => {
        it('using let', () => {
            let x: string | number; // colon : declares data type, without type is any

            x = 'Blue';
            x = 19;

            expect(x).toBe(19);

            let y = 34;
            // y = 'tacos'; gives a compiler error

            expect(y).toBe(34);
        });
        it('using const', () => {
            const PI = 3.1415; // const needs to be delcared and can't be reassigned.
            // PI = 3;

            const favoriteColors = ['blue', 'red', 'green'];
            // favoriteColors = []; can't assign another variable, but can change value in array

            favoriteColors[0] = 'Purple';

            expect(favoriteColors[0]).toBe('Purple');
        });
        it('has a var keyword but don\'t use it because it is broken', () => {
            let age = 22;
            if (age > 21) {
                var message = 'Old Enough'; // Don't do this. Ever. Don't use VAR
            }
            expect(message).toBe('Old Enough');

        });
    });
    describe('leterals in typescript', () => {
        it('has number literals', () => {
            let x1 = 12;
            let x2 = 12.3;
            let x3 = 1_000_000; // you can put underscores in the thousands places for readability (TS only);
            let x4 = 0xff; // 0x means this is a hexadecimal (base 16) number;
            let x5 = 0o22; // 0o means it is base 8 (octal)
            let x6 = 0b1101; // ob means it is binary (base 2);
        });
        it('has string literals', () => {
            let name = 'Sean';
            expect(name).toBe("Sean");

            //name = 'Flannery O\'Conner'; is the same as below
            name = "Flannery O'Conner";
            let quote = 'As Emerson said, "A foolish consistency is the hobgoblin of small minds".';
            quote = "As Emerson said, \"A foolish consistency is the hobgoblin of small minds\".";
        });
        it('has template strings', () => {
            //string delimited by back tics `  They allow for multi-lines
            let story = `Chapter 1.
            
            It was a dark and stormy night.
            
            The End`;

            console.log(story);

            let name = 'Bob', age = 53;
            let info = `The name is ${name} and the age is ${age}`; // must use back tics to use templates ${}

            expect(info).toBe('The name is Bob and the age is 53');

            let message = `The is just a "string" by 'Jeff'`; // can use back tics as delimiters for all strings
        });
        it('has the standard stuff', () => {
            // boolean
            let oldEnough = true;
            let tooYoung = false;

            // if("dog") converts to true, if("") converts to false;

            expect("dog").toBeTruthy();
            expect('').toBeFalsy();
            expect(99).toBeTruthy();
            expect(0).toBeFalsy();
            expect(-1).toBeTruthy();
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
            expect(({})).toBeTruthy();
            expect([]).toBeTruthy();
        });
        it('josephs question', () => {
            const msg = "Hello";
            expect(msg).not.toBe("Hi"); //confused toBe with assignment instead of comparison

            const favoriteNumbers = [9, 21, 108];

            expect(favoriteNumbers).toEqual([9, 21, 108]);

            let number = +"98.3" // + before string parses to a number
            expect(number).toBe(98.3);

            !"dog" // negates it (false)
            !!"dog" // makes it true
        });
        it('has array literals', () => {

            //(string | number), in intellisense, only gives what both datatypes have (the union of them)
            let shoppingList: (string | number)[] = []; // needs to be initialized with '= []'

            shoppingList[0] = 'Bread';
            shoppingList[1] = 'Shampoo';
            shoppingList[999] = 'Beer';
            shoppingList[2] = 12;

            expect(shoppingList[999]).toBe('Beer');
            expect(shoppingList[22]).toBeUndefined();
        });
        it('destructuring arrays', () => {
            const shoppingList = ['Bread', 'Shampoo', 'Beer'];

            const [first, , third, fourth] = shoppingList; // creates new constants mapped to the 1st & 3rd elements

            expect(first).toBe('Bread');
            expect(third).toBe('Beer');
            expect(fourth).toBe(undefined);

            const [head, ...rest] = shoppingList; // '...' is rest operator. Throws rest of array in constant 
            expect(head).toBe('Bread');
            expect(rest).toEqual(['Shampoo', 'Beer']);
        });
        it('also has a spread operator', () => {
            let numbers = [1, 2, 3, 4, 5, 6];
            let numbers2 = [0, ...numbers, 7]; // spreads numbers out instead of just representing it as an array of 6 numbers array[6]
            expect(numbers2).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);
        });
        it('has tuples', () => {
            //Array<string | number>  or (string | number) []

            // by creating an alias, Musician, we can access the correct intellisense for each value
            type Musician = [string, string, number, string];
            let warren: Musician = ['Warren', 'Ellis', 51, 'Musician'];

            const [, lastName, holdOld] = warren;
            expect(lastName.toUpperCase()).toBe('ELLIS');
            expect(holdOld).toBe(51);
        });
    });
});