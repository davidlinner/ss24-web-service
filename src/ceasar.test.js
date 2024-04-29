import {test, expect, describe} from "@jest/globals"; // this is optional, all three are global variables im runner scope
import {encrypt, decrypt} from "./ceasar.js";

describe('ceaser cipher', () => {

    test('test encryption', () => {
        expect(encrypt('TEST', 10)).toBe('COBC');
    });

    test('test decryption', () => {
        expect(decrypt('COBC', 10)).toBe('TEST');
    });
});
