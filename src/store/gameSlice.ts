import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Interfaces
export enum CellState {
    UNUSED, // Hasn't been used yet
    INCORRECT, // Red, Incorrect letter
    CLOSE, // Yellow, Letter exists somewhere in word
    CORRECT, // Green, Letter is in correct spot
}

type LetterDictionary = { [letter: string]: CellState };

interface Cell {
    letter: string;
    state: CellState;
}

interface Row {
    cells: Cell[];
}

interface GameState {
    word: string;
    allWords: string[];
    usedLetters: LetterDictionary;
    rows: Row[];
    currentRowIndex: number;
    isCompleted: boolean;
    message: string | null;
}

const createCell = (): Cell => ({ letter: '', state: CellState.UNUSED });
const createRow = (): Row => ({
    cells: [createCell(), createCell(), createCell(), createCell(), createCell()],
});

// initialState
const initialState: GameState = {
    word: '',
    allWords: [],
    usedLetters: {},
    rows: Array.from({ length: 6 }, () => createRow()),
    currentRowIndex: 0,
    isCompleted: false,
    message: null,
};

export const fetchWord = createAsyncThunk('game/fetchWord', async () => {
    const response = await fetch(
        'https://corsproxy.io/?https://api.frontendexpert.io/api/fe/wordle-words',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        },
    );

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    console.error('Failed to fetch words:', response.statusText);
});

// Slice
const gameAppSlice = createSlice({
    name: 'gameApp',
    initialState: initialState,
    reducers: {
        setNextLetter: (state, action: { payload: string }) => {
            if (state.isCompleted) return;

            const letter = action.payload;

            const currentRow = state.rows[state.currentRowIndex];
            const emptyCellIndex = currentRow.cells.findIndex(cell => cell.letter === '');
            if (emptyCellIndex >= 0)
                state.rows[state.currentRowIndex].cells[emptyCellIndex].letter = letter;
        },
        deleteLetter: state => {
            if (state.isCompleted) return;

            const currentRow = state.rows[state.currentRowIndex];
            const lastCellIndex = currentRow.cells.findLastIndex(cell =>
                /^[a-zA-Z]$/.test(cell.letter),
            );
            if (lastCellIndex >= 0)
                state.rows[state.currentRowIndex].cells[lastCellIndex].letter = '';
        },
        submitRow: state => {
            if (state.isCompleted) return;

            if (state.rows[state.currentRowIndex].cells.some(cell => cell.letter == '')) {
                state.message = 'Not enough letters';

                return;
            }

            state.rows[state.currentRowIndex].cells = state.rows[state.currentRowIndex].cells.map(
                (cell, index) => {
                    const newState = { letter: cell.letter, state: CellState.INCORRECT };
                    if (state.word[index] == cell.letter) newState.state = CellState.CORRECT;
                    else if (state.word.includes(cell.letter) && state.word[index] != cell.letter)
                        newState.state = CellState.CLOSE;

                    state.usedLetters[newState.letter] = newState.state;

                    return newState;
                },
            );

            const won = state.rows[state.currentRowIndex].cells.every(
                cell => cell.state == CellState.CORRECT,
            );

            if (state.currentRowIndex == 5 || won) {
                // Do end of game things
                if (won) state.message = 'You won!';
                else state.message = 'You lost :(sd';
                state.isCompleted = true;
            }

            state.currentRowIndex++;
        },
        clearMessage: state => {
            state.message = null;
        },
        resetGame: state => {
            const randomIndex = Math.floor(Math.random() * state.allWords.length);
            state.word = state.allWords[randomIndex].toUpperCase();

            state.usedLetters = {};
            state.currentRowIndex = 0;
            state.rows = Array.from({ length: 6 }, () => createRow());
            state.isCompleted = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchWord.pending, () => {
            console.log('Fetching words...');
        });
        builder.addCase(fetchWord.fulfilled, (state, action) => {
            const words: string[] = action.payload;
            const randomIndex = Math.floor(Math.random() * words.length);
            state.word = words[randomIndex].toUpperCase();
            state.allWords = words;
        });
        builder.addCase(fetchWord.rejected, (state, action) => {
            console.error('Error fetching words:', action.error.message);
        });
    },
});

// Export actions
export const { setNextLetter, submitRow, deleteLetter, clearMessage, resetGame } =
    gameAppSlice.actions;

export default gameAppSlice.reducer;
