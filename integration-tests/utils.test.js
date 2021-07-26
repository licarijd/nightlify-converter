import { pipe } from "../src/utils"

describe('pipe()', () => {
    it('should pipe the result of several functions', () => {
        const add6 = (x) => x + 6
        const subtract5 = (x) => x - 5
        const multiply3 = (x) => x * 3
        const multiply3Subtract5Add6 = () => [multiply3, subtract5, add6].reduce(pipe)
        const result = multiply3Subtract5Add6()(2)

        // (2 * 3) - 5 + 6
        expect(result).toBe(7)
    })
})