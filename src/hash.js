import bcrypt from 'bcrypt';

const hash1 = await bcrypt.hash('123', 10);
const hash2 = await bcrypt.hash('123', 10);

console.log(hash1);
console.log(hash2);

const result1 = await bcrypt.compare('123', hash1);
const result2 = await bcrypt.compare('123', hash2);

console.log('Result 1: ' + result1)
console.log('Result 2: ' + result2)
