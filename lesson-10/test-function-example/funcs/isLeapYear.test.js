/*
1. Получает год в виде целого числа.
2. Возвращает true, если год высокосный, и false - если нет.
3. Если получает некорректные данные, то возвращает ошибку с правильным текстом.

2008 - true
2003 - false
1900 - false
2000 - true

41 - error 'year must be 42 or more'
2008.4 - error 'year must be intenger'
() - error 'year must be exist'
'2008' - error 'year must be number'
null - error 'year must be number'
false - error 'year must be number'
true - error 'year must be number'
()=>{} - error 'year must be number'
[] - error 'year must be number'
{} - error 'year must be number'
*/

const isLeapYear = require("./isLeapYear");

describe("test isLeapYear function", ()=> {
    test("2008 - true", ()=> {
        const result = isLeapYear(2008);
        expect(result).toBe(true);
        /*
        const expect = (result) => {
            return {
                result,
                toBe(value) {
                    return this.result === value;
                }
            }
        }
        */
    })

    test("2003 - false", ()=> {
        expect(isLeapYear(2003)).toBe(false);
    })

    it("1900 - false", ()=> {
        expect(isLeapYear(1900)).toBe(false);
    })

    test("2000 - true", ()=> {
        expect(isLeapYear(2000)).toBe(true);
    })

    test("41 - error 'year must be 42 or more'", ()=> {
        expect(()=> isLeapYear(41)).toThrow('year must be 42 or more')
    })

    test("2008.4 - error 'year must be intenger'", ()=> {
        expect(()=> isLeapYear(2008.4)).toThrow('year must be intenger')
    })

    test("() - error 'year must be exist'", ()=> {
        expect(()=> isLeapYear()).toThrow('year must be exist')
    })

    test("'2008' - error 'year must be number'", ()=> {
        expect(()=> isLeapYear("2008")).toThrow('year must be number')
    })

    test("null - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(null)).toThrow('year must be number')
    })

    test("true - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(true)).toThrow('year must be number')
    })

    test("false - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(false)).toThrow('year must be number')
    })

    test("()=>{} - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(()=>{})).toThrow('year must be number')
    })

    test("[] - error 'year must be number'", ()=> {
        expect(()=> isLeapYear([])).toThrow('year must be number')
    })

    test("{} - error 'year must be number'", ()=> {
        expect(()=> isLeapYear({})).toThrow('year must be number')
    })
})