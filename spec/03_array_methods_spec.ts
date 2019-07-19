import { isEven } from "../src/utils";
import { data } from "./data";

describe('array methods', () => {
    describe('examples', () => {
        let numbers: number[];
        beforeEach(() => {
            numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        })
        it('has a forEach', () => {
            numbers.forEach(f => console.log(f));

        });
        // they don't mutate the original array
        describe('methods that produce a new array', () => {
            it('has a filter', () => {
                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);
            });
            it('createing a new array from each element', () => {

                const doubled = numbers.map(num => num * 2);
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

                const stringEvens = numbers
                    .filter(isEven)
                    .map(n => n * 2)
                    .map(n => n.toString());
                expect(stringEvens).toEqual(['4', '8', '12', '16'])
            });
        });
        describe('methods that produce a single (scalar) value', () => {
            it('checking the membership of an array against a predicate', () => {
                // predicate = function that takes single value and returns true/false

                // some returns true if any of the elements are true. stops at first true element
                const hasSomeEvens = numbers.some(isEven);
                expect(hasSomeEvens).toBe(true);

                const hasAllEvens = numbers.every(isEven);
                expect(hasAllEvens).toBe(false);
            });
            it('reduce', () => {
                const total = numbers.reduce((s, n) => s + n);
                expect(total).toBe(45);

                const totalPlusSome = numbers.reduce((s, n) => s + n, 100);
                expect(totalPlusSome).toBe(145);
            });
            it('finding things', () => {
                //const four = numbers.find()  find doesn't work in all browswers, need to use a polyfill. can use find in angular
                const four = numbers.filter(n => n === 4)[0];
                expect(four).toBe(4);

                const sixteen = numbers.filter(n => n === 16)[0];
                expect(sixteen).toBeUndefined();

                const [five] = numbers.filter(n => n === 5);
                expect(five).toBe(5);
            });
        });
    });
    describe('practical use', () => {
        let vehicles = [
            { vin: '8398398397', info: { make: 'Ford', model: 'Explorer', year: 2012 }, mileage: 132_000 },
            { vin: '55567478473', info: { make: 'Toyota', model: 'Camry', year: 2018 }, mileage: 8_000 },
            { vin: '1234947848', info: { make: 'Chevy', model: 'Bolt', year: 2018 }, mileage: 152_000 },
        ];

        it('your practice 1', () => {

            const answer = vehicles.filter(c => c.mileage > 100_000).map(c => c.info.make + ' ' + c.info.model)
            // alt version
            // const answer: string[] = vehicles
            //      .filter(v => v.mileage > 100_000) [vehicles] => vehicles > 100_000
            //      .map(v => v.info)
            //      .map(v => `${v.make} ${v.model}`);
            expect(answer).toEqual(['Ford Explorer', 'Chevy Bolt']);
        });
        it('second practice with data', () => {
            const customers = data;

            // I want an array of the names, email, phone of each active customer with a balance > $1,000.00
            interface Answer1 {
                name: string;
                email: string;
                phone: string;
            }
            // Also I want the total balance of all those people, and the number of people.
            interface Answer2 {
                totalBalance: number;
                count: number;
            }
            function convertToCurrency(currency: string): number {
                return Number(currency.replace(/[^0-9\.-]+/g, ""));
            }
            /* const answer1: Answer1 = data
                .filter(c => convertToCurrency(c.balance) > 1_000 && c.isActive)
                .map(c => {
                    return {
                        name: `${c.name.first} ${c.name.last}`,
                        email: c.email,
                        phone: c.phone
                    } as Answer1
                })
            console.log(answer1); */
            const initialState: Answer2 = {
                totalBalance: 0,
                count: 0
            }
            const answer2 = data
                .filter(cust => convertToCurrency(cust.balance) > 1_000 && cust.isActive)
                .map(cust => cust.balance)
                .map(convertToCurrency)
                .reduce((s, n) => ({
                    totalBalance: s.totalBalance + n,
                    count: s.count + 1
                }), initialState);

            expect(answer2).toEqual({
                totalBalance: 24976.55,
                count: 9
            });
        });
    });
});