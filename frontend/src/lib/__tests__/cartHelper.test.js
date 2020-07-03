import { formatPrice } from '../cartHelper';

describe('Testing the cartHelper library functions', () => {
    it('converts values less than 100 to cents', () => {
        expect(formatPrice(1)).toEqual('$0.01');
        expect(formatPrice(10)).toEqual('$0.10');
        expect(formatPrice(9)).toEqual('$0.09');
        expect(formatPrice(99)).toEqual('$0.99');
    });
    it('leaves cents off for whole values', () => {
        expect(formatPrice(100)).toEqual('$1');
        expect(formatPrice(1000)).toEqual('$10');
        expect(formatPrice(900)).toEqual('$9');
        expect(formatPrice(5500)).toEqual('$55');
        expect(formatPrice(99000000)).toEqual('$990,000');
    });
    it('works with whole and fractional values', () => {
        expect(formatPrice(101)).toEqual('$1.01');
        expect(formatPrice(1050)).toEqual('$10.50');
        expect(formatPrice(999)).toEqual('$9.99');
        expect(formatPrice(15550)).toEqual('$155.50');
        expect(formatPrice(99000099)).toEqual('$990,000.99');
    });
})