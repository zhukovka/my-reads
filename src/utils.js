export function wordsFromCamelCase(str) {
    return str.split(/(?=[A-Z])/);
}