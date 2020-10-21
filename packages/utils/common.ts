const { round, random } = Math;

export function randomId(prefix = '') {
    return prefix + round(random() + random() * 10e16).toString(32);
}
