const CHAR_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
 export function encrypt(plainText, key) {
    let cipherText = '';
    for (const character of plainText) {
        const offset = CHAR_TABLE.indexOf(character);
        if (offset < 0) {
            throw new Error(`Character "${character}" not allowed.`);
        }
        const shiftedOffset = (offset + key) % CHAR_TABLE.length;
        cipherText += CHAR_TABLE[shiftedOffset];
    }
    return cipherText;
}

export function decrypt(cipherText, key) {
    const translatedKey = (2 * CHAR_TABLE.length - key) % CHAR_TABLE.length
    return encrypt(cipherText, translatedKey);
}
