import {initStopwatch} from "../features/StopwatchHandler";
import {initClickOnBar} from "./ClickHandler";
import {initRedFlag} from "./FlagHandler";
import {playGameStartSound} from "../features/SoundHandler";
import {initThemeChanger} from "../features/ThemeHandler";
import {generateRandomMines} from "./MinesHandler";

let isGameOver = false;
export const getIsGameOver = () => {
    return isGameOver;
}
export const setIsGameOver = (value) => {
    isGameOver = value;
}

export const startGameSession = () => {
    const START_GAME_BUTTON = document.querySelector('.start-game-button');
    START_GAME_BUTTON.addEventListener('click', () => {
        START_GAME_BUTTON.disabled = true;
        playGameStartSound();
        initStopwatch();
        initClickOnBar();
        initRedFlag();
        initThemeChanger();
        generateRandomMines();
    })
}