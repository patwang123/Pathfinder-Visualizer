export const ROWS = 21;
export const COLS = 50;
export const START_ROW = Math.floor(ROWS / 2);
export const START_COL = 10;
export const FINISH_ROW = 10;
export const FINISH_COL = COLS - START_COL;
export const new_node = {
    row: -1,
    col: -1,
    is_start: false,
    is_finish: false,
    is_wall: false,
    searched: false,
    distance: Infinity,
    previous: null
}