import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Interfaces
export enum CellState {
  UNUSED, // Hasn't been used yet
  INCORRECT, // Red, Incorrect letter
  CLOSE, // Yellow, Letter exists somewhere in word
  CORRECT, // Green, Letter is in correct spot
}

interface Cell {
  letter: string;
  state: CellState;
}

interface Row {
  cells: Cell[];
}

interface GameState {
  word: string;
  rows: Row[];
  activeRow: number; // 0 indexed
  activeColumn: number; // 0 indexed
  isCompleted: boolean;
}

const baseCell: Cell = { letter: '', state: CellState.UNUSED };
const baseRow: Row = {
  cells: [baseCell, baseCell, baseCell, baseCell, baseCell],
};

// initialState
const initialState: GameState = {
  word: '',
  rows: [baseRow, baseRow, baseRow, baseRow, baseRow, baseRow],
  activeRow: 0,
  activeColumn: 0,
  isCompleted: false,
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
      if (state.activeColumn < 5) {
        state.rows[state.activeRow].cells[state.activeColumn].letter = letter;
        state.activeColumn++;
      }
    },
    deleteLetter: state => {
      if (state.isCompleted) return;

      if (state.activeColumn > 0) {
        const lastCol = state.activeColumn - 1;
        state.rows[state.activeRow].cells[lastCol].letter = '';
        state.activeColumn = lastCol;
      }
    },
    submitRow: state => {
      if (state.isCompleted) return;

      const word = state.word;
      const row = state.rows[state.activeRow];
      if (row.cells[4].letter == '') return;

      state.rows[state.activeRow].cells = row.cells.map((cell, index) => {
        const letter = cell.letter;
        let cellState = CellState.INCORRECT;

        if (word[index] === letter) {
          cellState = CellState.CORRECT;
        } else if (word.includes(letter)) {
          cellState = CellState.CLOSE;
        }

        return { letter: letter, state: cellState };
      });

      if (state.activeRow == 5) state.isCompleted = true;
      if (state.activeRow < 5) state.activeRow++;

      state.activeColumn = 0;
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
    });
    builder.addCase(fetchWord.rejected, (state, action) => {
      console.error('Error fetching words:', action.error.message);
    });
  },
});

// Export actions
export const { setNextLetter, submitRow, deleteLetter } = gameAppSlice.actions;

export default gameAppSlice.reducer;
