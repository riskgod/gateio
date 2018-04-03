let gate = require('./gate');

async function main() {
    const a = await gate.getPairs();
    const b = await gate.getPairs();

    console.log(a, b);
}

main();
console.log(1);