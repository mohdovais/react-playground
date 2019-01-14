function randomColor() {
    return (100 + Math.round(Math.random() * 155)).toString(16);
}

export function getRandomColor() {
    return '#' + randomColor() + randomColor() + randomColor();
}
