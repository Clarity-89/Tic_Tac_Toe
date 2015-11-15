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
        return player == PLAYERX ? PLAYERO : PLAYERX;
    }

    function subArrayIndex(arr, sub) {
        var target = sub.toString();
        for (var i = 0; i < arr.length; i++) {
            if (target === arr[i].toString()) break;
        }

        return i || -1;
    }

    //Class representing the game's board
    function Board(dims, board) {
        this.dims = dims;
        //initialize two-dimensional array (grid)
        if (board) {
            this.grid = board;
        } else {
            this.grid = [];
            for (var row = 0; row < dims; row++) {
                this.grid[row] = [];
                for (var col = 0; col < dims; col++) {
                    this.grid[row][col] = 0;
                }
            }
        }

        //Show visual representation of the grid
        this.showGrid = function () {
            for (var row = 0; row < dims; row++) {
                console.log(this.grid[row]);
            }
        };

        /*Returns one of the three constants EMPTY, PLAYERX, or PLAYERO
         that correspond to the contents of the board at position (row, col).*/
        this.square = function (row, col) {
            var results = ['EMPTY', 'PLAYERX', 'PLAYERO'];
            return results[this.grid[row][col]];
        };

        //Return an array of all empty squares in form [row, col]
        this.getEmptySquares = function () {
            var empty = [];
            for (var row = 0; row < this.dims; row++) {
                for (var col = 0; col < this.dims; col++) {
                    if (this.grid[row][col] === 0) {
                        empty.push([row, col]);
                    }
                }
            }
            return empty;
        };

        /*Place player on the board at position (row, col).
         player should be either the constant PLAYERX or PLAYERO.
         Does nothing if board square is not empty.*/
        this.move = function (square, player) {
            if (this.grid[square[0]][square[1]] === 0) {
                this.grid[square[0]][square[1]] = player;
            }
        };

        /*Returns a constant associated with the state of the game
         If PLAYERX wins, returns PLAYERX.
         If PLAYERO wins, returns PLAYERO.
         If game is drawn, returns DRAW.
         If game is in progress, returns None.*/
        this.checkWin = function () {
            // var winner = '';
            //check rows
            for (var i = 0; i < this.dims; i++) {

                if (this.grid[i][0] !== 0 && this.grid[i][0] == this.grid[i][1] && this.grid[i][0] == this.grid[i][2]) {
                    //console.log('first')
                    return this.grid[i][0];
                    //check cols
                } else if (this.grid[0][i] !== 0 && this.grid[0][i] == this.grid[1][i] && this.grid[0][i] == this.grid[2][i]) {
                    //console.log('second', i)
                    return this.grid[0][i];
                }
            }
            //check diags
            if (this.grid[1][1] !== 0 && (this.grid[0][0] == this.grid[1][1] && this.grid[0][0] == this.grid[2][2] ||
                this.grid[0][2] == this.grid[1][1] && this.grid[0][2] == this.grid[2][0])) {
                return this.grid[1][1];
                //check draw
            } else if (this.getEmptySquares().length == 1) {
                return 0;
            } else {
                return 'None';
            }
        };

        this.clone = function () {

            return $.extend(true, {}, this);
        }

    }

    function minimax(board, player) {
        if (board.checkWin() != 'None') {
            return [SCORES[board.checkWin()], [-1, -1]];
        } else {
            var best;
            if (player == PLAYERX) {
                best = [-2, ''];
                board.getEmptySquares().forEach(function (square) {
                    //console.log('sq', square);
                    var copy = board.clone();
                    copy.move(square, player);
                    var score = minimax(copy, switchPlayer(player))[0];
                    if (score == 1) {
                        return [score, square];
                    }
                    if (score > best[0]) {
                        best = [score, square];
                    }
                });
                return best;
            } else {
                best = [2, ''];
                board.getEmptySquares().forEach(function (square) {
                    //console.log('sq', square);
                    var copy = board.clone();
                    copy.move(square, player);
                    var score = minimax(copy, switchPlayer(player))[0];
                    if (score == -1) {
                        return [score, square];
                    }
                    if (score < best[0]) {
                        best = [score, square];
                    }
                });
                return best;
            }
        }
    }


    //Function that runs the game
    function runGame(dims) {
        //Create a new board for the game
        var tripleT = new Board(dims);
        //Board's coordinates to map to id of the html board
        var coords = [];
        var moveCount = 0;
        var i = 0;
        for (var row = 0; row < dims; row++) {
            for (var col = 0; col < dims; col++) {
                coords[i++] = [row, col];
            }
        }

        function onTimerTick() {
            var id;
            if (tripleT.checkWin() === 'None') {
                console.log('count', moveCount)
                if (moveCount === 0) {
                    $('.square').on('click', function () {

                        $(this).text('X');
                        id = $(this).attr('id');
                        tripleT.move(coords[id], PLAYERX);
                        moveCount = 1;
                        onTimerTick();
                    });
                } else {

                    var move = minimax(tripleT, PLAYERO)[1];
                    console.log('move', move)
                    tripleT.move(move, PLAYERO);
                    id = subArrayIndex(coords, move);
                    console.log('id', id)
                    $('#' + id).text('O');

                    moveCount = 0;

                    onTimerTick();
                }

                //console.log('winner!', tripleT.checkWin())

            }
        }

        setInterval(onTimerTick, 1000); // 33 milliseconds = ~ 30 frames per sec

    }

    runGame(dims);

    // var testB = [[2, 0, 0], [1, 2, 0], [1, 1, 0]];
    // var ttt = new Board(3, testB);
    //console.log('min', minimax(ttt, PLAYERO))
    /*ttt.move(2, 1, PLAYERX);
     ttt.showGrid();
     console.log('winner', ttt.checkWin());*/

});