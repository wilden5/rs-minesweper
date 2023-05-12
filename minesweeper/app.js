const gameBoard = [];
const mines = [];
let isGameOver = false;

const GAME_DIFFICULTIES = {
    easy: {
        rows: 10,
        columns: 10,
        bombs: 10,
        flags: 10,
    }
}

mines.push('1-1');
mines.push('2-2');
mines.push('3-3');
mines.push('4-4');
mines.push('5-5');

// todo: 1. Remove click if user marked bar with a flag; 2. Bombs indicator should connects to flags? 3. Webpack?
// todo: 4. Increase counter when contextclick?

const createBasicLayout = () => {
    const appendGameBoardElement = () => {
        const GAME_BOARD_ELEMENT = document.createElement('div');
        GAME_BOARD_ELEMENT.classList.add('game-board');
        document.body.appendChild(GAME_BOARD_ELEMENT);
    }
    const appendGameInformation = () => {
        const GAME_INFORMATION = document.createElement('div');
        GAME_INFORMATION.classList.add('game-information')

        const NUMBER_OF_FLAGS_TEXT = document.createElement('div');
        NUMBER_OF_FLAGS_TEXT.classList.add('red-flags-information');
        NUMBER_OF_FLAGS_TEXT.innerText = 'Number of 🚩 remained: ';

        const NUMBER_OF_FLAGS = document.createElement('span');
        NUMBER_OF_FLAGS.classList.add('red-flags-number');
        NUMBER_OF_FLAGS.innerText = GAME_DIFFICULTIES.easy.flags;

        const TOTAL_BOMBS_ON_GAME_BOARD = document.createElement('div');
        TOTAL_BOMBS_ON_GAME_BOARD.classList.add('bombs-number');
        TOTAL_BOMBS_ON_GAME_BOARD.innerText = `Number of 💣 on the board: ${GAME_DIFFICULTIES.easy.bombs}`;

        const NUMBER_OF_CLICKS_TEXT = document.createElement('div');
        NUMBER_OF_CLICKS_TEXT.classList.add('clicks-number-information');
        NUMBER_OF_CLICKS_TEXT.innerText = 'Number of clicks: ';

        const NUMBER_OF_CLICKS = document.createElement('span');
        NUMBER_OF_CLICKS.classList.add('clicks-number');
        NUMBER_OF_CLICKS.innerText = '0';

        const GAME_RESTART_BUTTON = document.createElement('button');
        GAME_RESTART_BUTTON.classList.add('restart-button');
        GAME_RESTART_BUTTON.innerText = 'Restart Game';

        const GAME_DURATION = document.createElement('div');
        GAME_DURATION.classList.add('game-duration');
        GAME_DURATION.innerText = 'Duration of the game: ';

        const GAME_TIMER = document.createElement('span');
        GAME_TIMER.classList.add('timer-seconds');
        GAME_TIMER.innerText = '0';

        const START_GAME_BUTTON = document.createElement('button');
        START_GAME_BUTTON.classList.add('start-game-button');
        START_GAME_BUTTON.innerText = 'START A NEW GAME';



        const GAME_BOARD_THEME_BUTTON = document.createElement('button');

        GAME_INFORMATION.appendChild(NUMBER_OF_FLAGS_TEXT);
        GAME_INFORMATION.appendChild(TOTAL_BOMBS_ON_GAME_BOARD);
        GAME_INFORMATION.appendChild(NUMBER_OF_CLICKS_TEXT);
        GAME_INFORMATION.appendChild(GAME_DURATION);
        GAME_INFORMATION.appendChild(GAME_RESTART_BUTTON);
        GAME_INFORMATION.appendChild(START_GAME_BUTTON);
        NUMBER_OF_CLICKS_TEXT.appendChild(NUMBER_OF_CLICKS);
        NUMBER_OF_FLAGS_TEXT.appendChild(NUMBER_OF_FLAGS);
        GAME_DURATION.appendChild(GAME_TIMER);
        document.body.appendChild(GAME_INFORMATION);
    }
    appendGameInformation();
    appendGameBoardElement();
}


let timerInterval;

function startTimer() {
    const GAME_TIMER = document.querySelector('.timer-seconds');
    let startTime = Date.now();
    let elapsedTime = 0;

    timerInterval = setInterval(function() {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        GAME_TIMER.innerText = elapsedTime;
    }, 100);
}

function stopTimer() {
    clearInterval(timerInterval);
}

const createGameBoard = (setRows, setColumns) => {
    const GAME_BOARD = document.querySelector('.game-board');
    for (let row = 0; row < setRows; row++) {
        let boardRow = [];
        for (let column = 0; column < setColumns; column++) {
            let bar = document.createElement('div');
            bar.classList.add(`${row.toString()}-${column.toString()}`, 'bar');
            GAME_BOARD.appendChild(bar);
            boardRow.push(bar);
        }
        gameBoard.push(boardRow);
    }
    console.log(gameBoard);
}

const handleBarClick = () => {
    const BOARD_BARS = document.querySelectorAll('.bar');
    const clicksCounter = document.querySelector('.clicks-number');

    BOARD_BARS.forEach((bar) => {
        bar.addEventListener('click', () => {
            if (isGameOver === false) {
                clicksCounter.innerText = parseInt(clicksCounter.innerText) + 1;
            }
            console.log(bar.classList);
            if (mines.includes(bar.classList[0])) {
                alert('BRO YOU\'VE JUST CLICKED ON THE BOMB. GAME OVER. TRY AGAIN.');
                isGameOver = true;
                showMines();
                stopTimer();
            }
        })
    })
}

const showMines = () => {
    const BOARD_BARS = document.querySelectorAll('.bar');
    BOARD_BARS.forEach((bar) => {
        if (mines.includes(bar.classList[0])) {
            bar.innerText = '💣';
            bar.classList.add('bomb');
        }
    })
}

const restartGame = () => {
    const RESTART_BUTTON = document.querySelector('.restart-button');
    RESTART_BUTTON.addEventListener('click', () => {
        isGameOver = false;
        document.body.innerHTML = '';
        createLayout();
    })
}

const handleRedFlag = () => {
    const RED_FLAG = '🚩';
    const BOARD_BARS = document.querySelectorAll('.bar');
    const RED_FLAGS_NUMBER = document.querySelector('.red-flags-number');

    BOARD_BARS.forEach((bar) => {
        bar.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if(isGameOver === false) {
                if (bar.innerHTML === '') {
                    if (RED_FLAGS_NUMBER.innerText > 0) {
                        RED_FLAGS_NUMBER.innerText = parseInt(RED_FLAGS_NUMBER.innerText) - 1;
                        bar.innerHTML = RED_FLAG;
                        bar.classList.toggle('red-flag');
                    }
                } else {
                    RED_FLAGS_NUMBER.innerText = parseInt(RED_FLAGS_NUMBER.innerText) + 1;
                    bar.innerHTML = '';
                    bar.classList.toggle('red-flag');
                }
            }
        });
    });
}

const createLayout = () => {
    createBasicLayout();
    createGameBoard(GAME_DIFFICULTIES.easy.rows, GAME_DIFFICULTIES.easy.columns);
};

const startGameSession = () => {
    const START_GAME_BUTTON = document.querySelector('.start-game-button');
    START_GAME_BUTTON.addEventListener('click', () => {
        START_GAME_BUTTON.disabled = true;
        startTimer();
        handleBarClick();
        handleRedFlag();
    })
}

const init = () => {
    createLayout();
    startGameSession();
}

init();