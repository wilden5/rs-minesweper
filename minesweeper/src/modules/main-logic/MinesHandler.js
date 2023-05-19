import GAME_DIFFICULTIES from "../../data/difficulties.json";
import {getGameBoard} from "./LayoutHandler";
import {setIsGameOver} from "./SessionHandler";
import {getStopwatchValue, stopStopwatch} from "../features/StopwatchHandler";
import {getClickCounter} from "./ClickHandler";
import {playGameWinSound} from "../features/SoundHandler";
import {addScore} from "../features/ScoreTableHandler";

let gameBoardMinesLocation = [];
let clickedBarsCounter = 0;

export const getClickedBarsCounter = () => {
    return clickedBarsCounter;
}

export const setClickedBarsCounter = (value) => {
    clickedBarsCounter = value;
}

export const generateRandomMines = () => {
    if(gameBoardMinesLocation.length > 0) {
        gameBoardMinesLocation = [];
    }
    let minesNumber = GAME_DIFFICULTIES.easy.bombs;
    while (minesNumber > 0) {
        let r = Math.floor(Math.random() * GAME_DIFFICULTIES.easy.rows);
        let c = Math.floor(Math.random() * GAME_DIFFICULTIES.easy.columns);
        let bombId = `${r.toString()}-${c.toString()}`;

        if (!gameBoardMinesLocation.includes(bombId)) {
            gameBoardMinesLocation.push(bombId);
            minesNumber -= 1;
        }
    }
    console.log(gameBoardMinesLocation.length);
}

export const getGameBoardMinesLocation = () => {
    return gameBoardMinesLocation;
}

export const setGameBoardMinesLocation = (array) => {
    array.forEach((bomb) => {
        gameBoardMinesLocation.push(bomb);
    })
}

export const showMinesLocation = () => {
    const BOARD_BARS = document.querySelectorAll('.bar');
    BOARD_BARS.forEach((bar) => {
        if (gameBoardMinesLocation.includes(bar.classList[0])) {
            if (bar.classList.contains('red-flag')) {
                bar.classList.add('guessed-bomb');
                bar.innerText = '💣🚩';
            } else {
                bar.innerText = '💣';
                bar.classList.add('bomb');
            }
        }
    })
}

export const checkMines = (row, column) => {
    if (row < 0 || row >= GAME_DIFFICULTIES.easy.rows ||
        column < 0 || column >= GAME_DIFFICULTIES.easy.columns) {
        return;
    }

    if (getGameBoard()[row][column].classList.contains('bar-clicked')) {
        return;
    }

    getGameBoard()[row][column].classList.add('bar-clicked');
    clickedBarsCounter += 1;

    let minesCounter = 0;

    minesCounter += checkBar(row - 1, column - 1);
    minesCounter += checkBar(row - 1, column);
    minesCounter += checkBar(row - 1, column + 1);

    minesCounter += checkBar(row, column - 1);
    minesCounter += checkBar(row, column + 1);

    minesCounter += checkBar(row + 1, column - 1);
    minesCounter += checkBar(row + 1, column);
    minesCounter += checkBar(row + 1, column + 1);

    if (minesCounter > 0) {
        getGameBoard()[row][column].innerText = minesCounter;
        getGameBoard()[row][column].classList.add(`nearby-bombs${minesCounter.toString()}`, 'nb');
    } else {
        checkMines(row - 1, column - 1);
        checkMines(row - 1, column);
        checkMines(row - 1, column + 1);

        checkMines(row, column - 1);
        checkMines(row, column + 1);

        checkMines(row + 1, column - 1);
        checkMines(row + 1, column);
        checkMines(row + 1, column + 1);
    }

    if (clickedBarsCounter === GAME_DIFFICULTIES.easy.rows * GAME_DIFFICULTIES.easy.columns - 10) {
        setIsGameOver(true);
        addScore('win');
        showMinesLocation();
        stopStopwatch();
        playGameWinSound();
        alert(`Hooray! You found all mines in ${getStopwatchValue()} seconds and ${getClickCounter()} moves!`);
    }
    console.log(clickedBarsCounter)
}

const checkBar = (row, column) => {
    if (row < 0 || row >= GAME_DIFFICULTIES.easy.rows ||
        column < 0 || column >= GAME_DIFFICULTIES.easy.columns) {
        return 0;
    }
    if (gameBoardMinesLocation.includes(`${row.toString()}-${column.toString()}`)) {
        return 1;
    }
    return 0;
}