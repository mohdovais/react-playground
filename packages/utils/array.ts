export function ensureArray<T = undefined>(subject?: T | T[] | null) {
    if (subject == null) return [];
    if (Array.isArray(subject)) return subject;
    return [subject];
}