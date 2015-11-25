/**
 * Created by Alex on 15/11/2015.
 */

$(document).ready(function () {

    //Game's constants
    var DRAW = 0, PLAYERX = 1, PLAYERO = 2,
        SCORES = {
            1: 1,
            0: 0,
            2: -1
        };
    var dims = 3; //dimensions for the game's board

    //helper functions
    function switchPlayer(player) {
        return player === PLAYERX ? PLAYERO : PLAYERX;
    }

    //Find index of subarray in array
    function subArrayIndex(arr, sub) {
        var target = sub.toString();
        for (var i = 0; i < arr.length; i++) {
            if (target === arr[i].toString()) break;
        }

        return i;
    }

    //Class representing the game's board
    function Board(dims, board) {
        this.dims = dims;

        this.grid = [];
        for (var square = 0; square < dims * dims; square++) {
            if (board) {
                this.grid.push(board[square]);
            } else {
                this.grid[square] = 0;
            }
        }

    }

    //Show visual representation of the grid
    Board.prototype.showGrid = function () {
        var grid = [];
        for (var i = 0; i < dims * dims; i++) {
            grid.push(this.grid[i]);
        }
        return grid;
    };

    /*Returns one of the three constants EMPTY, PLAYERX, or PLAYERO
     that correspond to the contents of the board at position (row, col).*/
    Board.prototype.square = function (sqr) {

        return this.grid[sqr];
    };

    //Return an array of all empty squares in form [row, col]
    Board.prototype.getEmptySquares = function () {
        var empty = [];
        for (var i = 0; i < this.dims * this.dims; i++) {
            if (this.square(i) === 0) empty.push(i);
        }
        return empty;
    };

    /*Place player on the board at position (row, col).
     player should be either the constant PLAYERX or PLAYERO.
     Does nothing if board square is not empty.*/
    Board.prototype.move = function (square, player) {
        if (this.square(square) === 0) {
            this.grid[square] = player;
        }
    };

    /*Returns a constant associated with the state of the game
     If PLAYERX wins, returns 1.
     If PLAYERO wins, returns 2.
     If game is drawn, returns 0.
     If game is in progress, returns None.*/
    Board.prototype.checkWin = function () {

        //check rows
        for (var i = 0; i < this.dims; i++) {

            if (this.square(i) !== 0 && this.square(i) == this.square(i + 3) && this.square(i) == this.square(i + 6)) {

                return this.square(i);
            }
        }

        //check cols
        for (var j = 0; j < this.dims * this.dims; j += 3) {


            if (this.square(j) !== 0 && this.square(j) == this.square(j + 1) && this.square(j) == this.square(j + 2)) {

                return this.square(j);
            }
        }

        //check diags
        if (this.square(4) !== 0 && (this.square(0) == this.square(4) && this.square(0) == this.square(8) ||
            this.square(2) == this.square(4) && this.square(2) == this.square(6))) {
            return this.square(4);

            //check draw
        } else if (this.getEmptySquares().length === 0) {
            return DRAW;
        } else {
            return 'None';
        }
    };

    Board.prototype.clone = function () {

        //return $.extend(true, {}, this);

        return new Board(dims, this.grid);
    };

    function minimax(board, player) {
        //console.log(board, player)
        var mult = SCORES['' + player], thisScore,
            empty = board.getEmptySquares(), l = empty.length,
            maxScore = -1, bestMove = null;

        if (board.checkWin() != 'None') {
            return [SCORES[board.checkWin()], 0];
        } else {
            for (var i = 0; i < l; i++) {
                var copy = board.clone();
                copy.move(empty[i], player);
                thisScore = mult * minimax(copy, switchPlayer(player))[0];

                if (thisScore >= maxScore) {
                    maxScore = thisScore;
                    bestMove = empty[i];
                }
            }

            return [mult * maxScore, bestMove];
        }
    }


    //Function that runs the game
    function runGame(dims) {
        //Create a new board for the game
        var tripleT = new Board(dims);

        //tripleT.showGrid();
        $('.square').on('click', function () {

            if (tripleT.checkWin() === 'None') {
                $(this).text('X');
                id = $(this).attr('id');
                tripleT.move(id, PLAYERX);

                if (tripleT.checkWin() === 'None') {
                    var move = minimax(tripleT, PLAYERO)[1];
                    tripleT.move(move, PLAYERO);
                    $('#' + move).text('O');
                } else {
                    alert('winner is ' + tripleT.checkWin())
                }
            } else {
                alert('winner is ' + tripleT.checkWin())
            }

        });
    }

    runGame(dims);

});