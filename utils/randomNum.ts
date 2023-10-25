export default function randomNum(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
