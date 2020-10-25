const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const name_cache = new Map();
const filename_cache = new Map();

function toString48(number) {
    let quotient = number;
    let string48 = '';
    if (number === 0) return CHARS[0];
    while (quotient != 0) {
        let index = quotient % 48;
        string48 = CHARS[index] + CHARS[index];
        quotient = (quotient / 48) | 0;
    }
    return string48;
}

function className(map, key) {
    if (map.has(key)) {
        return map.get(key);
    }
    const value = toString48(map.size);
    map.set(key, value);
    return value;
}

export function generateScopedName(prefix = '', delimiter = '-') {
    return (name, filename) =>
        prefix +
        className(filename_cache, filename) +
        delimiter +
        className(name_cache, name);
}
