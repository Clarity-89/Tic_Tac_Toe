/**
 * Created by Alex on 26/11/2015.
 */
var board;
describe('Board', function () {


    it("should initialize the board with empty grid", function () {
        board = new Board(3);
        expect(board.grid).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

});

describe('Get empty squares', function () {

    it('should show all empty squares available for current grid', function () {
        board = new Board(3, [0, 1, 2, 1, 2, 1, 1, 2, 1]);
        expect(board.getEmptySquares().length).toBe(1);

        board = new Board(3, [1, 1, 0, 1, 2, 1, 1, 0, 1]);
        expect(board.getEmptySquares().length).toBe(2);

        board = new Board(3);
        expect(board.getEmptySquares().length).toBe(9);
    });

    it('should show no empty squares when grid is full', function () {
        board = new Board(3, [1, 1, 2, 1, 2, 2, 1, 1, 1]);
        expect(board.getEmptySquares().length).toBe(0);
    });
});

describe('Check Win', function () {
    it('should show when player 1 wins correctly', function () {
        board = new Board(3,
            [1, 1, 1,
                2, 2, 1,
                2, 1, 2]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [0, 2, 2,
                1, 1, 1,
                0, 2, 2]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [1, 2, 2,
                2, 1, 2,
                1, 1, 1]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [1, 2, 2,
                1, 2, 2,
                1, 1, 0]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [2, 1, 2,
                0, 1, 2,
                0, 1, 0]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [2, 2, 1,
                0, 2, 1,
                0, 0, 1]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [1, 2, 1,
                2, 1, 2,
                1, 0, 1]);
        expect(board.checkWin()).toBe(1);

        board = new Board(3,
            [2, 2, 1,
                0, 1, 2,
                1, 0, 0]);
        expect(board.checkWin()).toBe(1);
    });

    it('should show when player 2 wins correctly', function () {
        board = new Board(3,
            [2, 2, 2,
                0, 1, 1,
                0, 1, 1]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [0, 1, 1,
                2, 2, 2,
                0, 1, 1]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [0, 1, 1,
                0, 1, 1,
                2, 2, 2]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [2, 1, 0,
                2, 0, 1,
                2, 1, 0]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [1, 2, 1,
                0, 2, 1,
                0, 2, 0]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [1, 1, 2,
                1, 1, 2,
                0, 0, 2]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [2, 1, 1,
                2, 2, 1,
                1, 0, 2]);
        expect(board.checkWin()).toBe(2);

        board = new Board(3,
            [1, 1, 2,
                0, 2, 1,
                2, 0, 0]);
        expect(board.checkWin()).toBe(2);
    });

    it('should correctly identify when the game draws', function () {
        board = new Board(3,
            [1, 1, 2,
                2, 2, 1,
                1, 2, 1]);
        expect(board.checkWin()).toBe(DRAW);

        board = new Board(3,
            [1, 2, 2,
                2, 1, 1,
                1, 2, 2]);
        expect(board.checkWin()).toBe(DRAW);

    });

    it('should not show draw when one of the players wins', function () {
        board = new Board(3,
            [1, 2, 1,
                2, 1, 1,
                1, 2, 2]);
        expect(board.checkWin()).not.toBe(DRAW);
    });
    it('should not show draw when game is still in process', function () {
        board = new Board(3,
            [1, 2, 1,
                2, 1, 1,
                1, 0, 2]);
        expect(board.checkWin()).not.toBe(DRAW);
    });

    it('should correctly identify when the game is still in progress', function () {
        board = new Board(3,
            [1, 0, 1,
                2, 0, 1,
                1, 0, 2]);
        expect(board.checkWin()).toBe('None');

        board = new Board(3,
            [1, 2, 1,
                2, 1, 1,
                0, 1, 2]);
        expect(board.checkWin()).toBe('None');
    });
});

describe('Clone method', function () {
    it('should make a copy of a passed board', function () {
        board = new Board(3, [1, 0, 0, 0, 0, 0, 0, 0, 0]);
        var copy = board.clone();

        expect(board).toEqual(copy);
    });

    it('the original board should not be affected by changes to copy', function () {
        board = new Board(3, [1, 0, 0, 0, 0, 0, 0, 0, 0]);
        var copy = board.clone();
        copy.move(2, PLAYERO);
        expect(board.grid).not.toEqual(copy.grid);
        expect(board.grid).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
});