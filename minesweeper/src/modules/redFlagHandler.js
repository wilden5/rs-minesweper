import {getIsGameOver} from "./gameOverHandler";
import GAME_DIFFICULTIES from "../data/difficulties.json";

export const handleRedFlag = () => {
    const RED_FLAG = '🚩';
    const BOARD_BARS = document.querySelectorAll('.bar');
    const RED_FLAGS_NUMBER = document.querySelector('.red-flags-number');
    const BOMBS_REMAINED = document.querySelector('.bombs-remained');

    BOARD_BARS.forEach((bar) => {
        bar.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if(getIsGameOver() === false) {
                if (bar.innerHTML === '') {
                    if (RED_FLAGS_NUMBER.innerText < GAME_DIFFICULTIES.easy.bombs) {
                        RED_FLAGS_NUMBER.innerText = parseInt(RED_FLAGS_NUMBER.innerText) + 1;
                        BOMBS_REMAINED.innerText = parseInt(BOMBS_REMAINED.innerText) - 1;
                        bar.innerHTML = RED_FLAG;
                        bar.classList.toggle('red-flag');
                    }
                } else {
                    RED_FLAGS_NUMBER.innerText = parseInt(RED_FLAGS_NUMBER.innerText) - 1;
                    BOMBS_REMAINED.innerText = parseInt(BOMBS_REMAINED.innerText) + 1;
                    bar.innerHTML = '';
                    bar.classList.toggle('red-flag');
                }
            }
        });
    });
}