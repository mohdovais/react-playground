const O = Object;
export const assign = O.assign;

export function extend<T, S>(a: T, b: S): {} & T & S {
    return assign({}, a, b);
}

export function hasOwnProperty(object: any, property: string): boolean {
    return O.prototype.hasOwnProperty.call(object, property);
}
