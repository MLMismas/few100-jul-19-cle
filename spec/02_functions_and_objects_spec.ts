import { isEven, formatName } from "../src/utils";

describe('functions and objects', () => {
    describe('function literals', () => {
        it('the syntai', () => {

            expect(add(3, 2)).toBe(5); // can move use above declaration with named functions, not anon

            // named function
            // int Add(int a, int b)
            function add(a: number, b: number): number {
                return a + b;
            }

            // anonymous function - subtract is the variable that holds the anonymous function
            const subtract = function (a: number, b: number): number {
                return a - b;
            }
            expect(subtract(3, 2)).toBe(1);

            // arrow function
            const multiply = (a: number, b: number): number => a * b;
            expect(multiply(3, 2)).toBe(6);
            const divide = (a: number, b: number) => a / b;
            expect(divide(6, 2)).toBe(3);

            const logIt = (msg: string) => {
                console.log(`At ${new Date().toISOString()}`);
                console.log(`-->${msg}`);
            }

            logIt('Hello, World!');

            // named anonymous function
            const factorial = function fac(x: number) {
                //fac(32); calls itself
            }
            factorial(32);
            // fac(32); compiler error

        });
        it('intro to higher-ordered functions', () => {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            //const evens = numbers.filter(function (n) { return n % 2 === 0 });
            //const evens = numbers.filter(n => n % 2 === 0);

            //const evens = numbers.filter(isEven(9)); // does not compile. isEven returns a boolean, not a function
            const evens = numbers.filter(isEven);

            // moved to utils.ts and imported
            //function isEven(n: number): boolean {
            //    return n % 2 === 0;
            //}
            expect(evens).toEqual([2, 4, 6, 8]);

            function isBiggerThan(x: number) {
                return function (y: number) {
                    return y > x;
                }
            }
            const topHalf = numbers.filter(isBiggerThan(4));
            expect(topHalf).toEqual([5, 6, 7, 8, 9]);
        });
    });
    describe('arguments to functions', () => {
        it('has no overloading', () => {

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        it('having default values for arguments', () => {
            function add(a: number = 20, b: number = 10) {
                return a + b;
            }

            expect(add(2, 2)).toBe(4); // overwrites default value with 4
            expect(add(4)).toBe(14); //uses default value of 10
            expect(add()).toBe(30);
            expect(add(undefined, 5)).toBe(25); // must pass in undefined
        });
        it('has unioned constants', () => {
            type SeatType = 'window' | 'aisle' | 'middle';
            function assignSeat(seatType: SeatType): number {
                switch (seatType) {
                    case 'window': {
                        return 50;
                    }
                    case 'aisle': {
                        return 75;
                    }
                    case 'middle': {
                        return 40;
                    }
                }

            }

            expect(assignSeat('window')).toBe(50);
            expect(assignSeat('aisle')).toBe(75);
        });
        it('has enums', () => {
            enum SeatType { Window, Aisle, Middle };
            function assignSeat(seatType: SeatType): number {
                switch (seatType) {
                    case SeatType.Window: {
                        return 50;
                    }
                    case SeatType.Aisle: {
                        return 75;
                    }
                    case SeatType.Middle: {
                        return 40;
                    }
                }

            }
            expect(assignSeat(SeatType.Window)).toBe(50);
            expect(assignSeat(SeatType.Aisle)).toBe(75);
        });
        it('has rest parameters', () => {
            function add(a: number, b: number, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((s, n) => s + n, firstTwo); // first argument is a function, second is the initial state
            }

            expect(add(2, 2)).toBe(4);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
        it('demo of a reducer', () => {
            const state = 0;

            const actions = ['inc', 'inc', 'dec', 'inc'];

            const newState = actions.reduce((s, n) => {
                switch (n) {
                    case 'inc': {
                        return s + 1;
                    }
                    case 'dec': {
                        return s - 1;
                    }
                }
            }, state)
            expect(newState).toBe(2);
        });
    });
});

describe('objects', () => {
    describe('anonymous objects', () => {
        it('making one', () => {
            const actor = {
                name: {
                    firstName: 'Harrison',
                    lastName: 'Ford'
                },
                roles: [
                    'Han Solo',
                    'Decker'
                ]
            };

            expect(actor.name.firstName).toBe('Harrison');
            expect(actor.roles.some(n => n === 'Decker')).toBe(true);
        });
        it('duck typing', () => {


            interface Loggable { message: string }

            // logIt requires an object with a message property, but it doesn't have to be an object using the Loggable interface
            function logIt(thingy: Loggable) {  // could have also been thingy: message: string
                console.log(thingy.message);
            }

            // logIt('tacos');
            const phoneCall = {
                from: 'Stacey',
                message: 'Get bread on the way home'
            }

            const email = {
                to: 'Joe',
                message: 'Call your mom'
            }

            logIt(phoneCall);
            logIt(email);
        });
        it('using interfaces for the shape of an object', () => {

            //an object has to conform, 100%, to the interface
            // e.g. couldn't add m.i. to Person without adding to interface
            interface Person { first: string; last: string, getInfo: () => string };
            //interface Person { first: string; last: string, mi?: string}; 

            interface PersonWithMiddleInitial extends Person {
                mi: string;
            }

            const cf: PersonWithMiddleInitial = {
                first: 'Carrie',
                last: 'Fisher',
                mi: 'A',
                getInfo: function () {
                    return `Person ${this.first} ${this.last}`;
                }
            }

            const mh: Person = {
                first: 'Mark',
                last: 'Hamill',
                getInfo: function () {
                    return `Person ${this.first} ${this.last}`;
                }
            }


        });
        it('has classes', () => {

            class Actor {

                private mAge: number = 0;

                constructor(public firstName: string, public lastName: string) { }

                getInfo() {
                    return `${this.lastName}, ${this.firstName}`;
                }

                get age(): number {
                    return this.mAge;
                }

                set age(newValue: number) {
                    this.mAge = newValue;
                }
            }

            const ralph = new Actor('Ralph', 'Maccio');

            expect(ralph.firstName).toBe('Ralph');
            expect(ralph.lastName).toBe('Maccio');
            expect(ralph.getInfo()).toBe('Maccio, Ralph');
            ralph.age = 39;
            expect(ralph.age).toBe(39);

            class Employee extends Actor {
                constructor(first: string, last: string, public salary: number) {
                    super(first, last);
                }
            }

            let peter = new Employee('Peter', 'Lewis', 50_000_000);


            expect(peter.salary).toBe(50_000_000);
        });
    });
});