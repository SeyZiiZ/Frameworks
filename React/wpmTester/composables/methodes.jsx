export function shuffleList(list) {
    return list.sort(() => Math.random() - 0.5);
}

export function breakWord(word) {
    return word.split('');
}