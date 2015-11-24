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
    }

    //Show visual representation of the grid
    Board.prototype.showGrid = function () {
        for (var row = 0; row < dims; row++) {
            console.log(this.grid[row]);
        }
    };

    /*Returns one of the three constants EMPTY, PLAYERX, or PLAYERO
     that correspond to the contents of the board at position (row, col).*/
    Board.prototype.square = function (row, col) {

        return this.grid[row][col];
    };

    //Return an array of all empty squares in form [row, col]
    Board.prototype.getEmptySquares = function () {
        var empty = [];
        for (var row = 0; row < this.dims; row++) {
            for (var col = 0; col < this.dims; col++) {
                if (this.square(row, col) === 0) {
                    empty.push([row, col]);
                }
            }
        }
        return empty;
    };

    /*Place player on the board at position (row, col).
     player should be either the constant PLAYERX or PLAYERO.
     Does nothing if board square is not empty.*/
    Board.prototype.move = function (square, player) {
        if (this.square(square[0], square[1]) === 0) {
            this.grid[square[0]][square[1]] = player;
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

            if (this.square([i][0]) !== 0 && this.square([i][0]) == this.square([i][1]) && this.square([i][0]) == this.square([i][2])) {
                //console.log('first')
                return this.square([i][0]);
                //check cols
            } else if (this.square([0][i]) !== 0 && this.square([0][i]) == this.square([1][i]) && this.square([0][i]) == this.square([2][i])) {
                //console.log('second', i)
                return this.square([0][i]);
            }
        }
        //check diags
        if (this.square([1][1]) !== 0 && (this.square([0][0]) == this.square([1][1]) && this.square([0][0]) == this.square([2][2]) ||
            this.square([0][2]) == this.square([1][1]) && this.square([0][2]) == this.square([2][0]))) {
            return this.square([1][1]);
            //check draw
        } else if (this.getEmptySquares().length === 0) {
            return DRAW;
        } else {
            return 'None';
        }
    };

    Board.prototype.clone = function () {

        return $.extend(true, {}, this);

        //return new Board(3, this.grid.concat());
    };


    /* function minimax(board, player) {
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
     }*/

    function minimax(board, player) {
        //console.log(board, player)
        var mult = SCORES['' + player], thisScore;
        var maxScore = -1, bestMove = null;

        //console.log('mult', mult)
        //if (player == PLAYERO) mult = -1;
        if (board.checkWin() != 'None') {
            //console.log('cw', SCORES[board.checkWin()])
            return [SCORES[board.checkWin()], [-1, -1]];
        }
        board.getEmptySquares().forEach(function (square) {

            var copy = board.clone();
            //console.log('Board', board, 'copy', copy)
            copy.move(square, player);
            thisScore = mult * minimax(copy, switchPlayer(player))[0];
            //console.log(square, player, thisScore)
            if (thisScore >= maxScore) {
                maxScore = thisScore;
                bestMove = square;
            }
        });

        return [mult * maxScore, bestMove];

    }

    /*function mmMove(board, player){
     var thisScore, bestScore = -1, bestMove = null;
     board.getEmptySquares().forEach(function (square) {
     var copy = board.clone();
     copy.move(square, player);
     thisScore = minimax(copy, switchPlayer(player));
     if(thisScore >= bestScore) {
     bestScore = thisScore;
     bestMove = square;
     }
     });
     return bestMove;
     }*/

    //Function that runs the game
    function runGame(dims) {
        //Create a new board for the game
        var tripleT = new Board(dims);
        //Board's coordinates to map to id of the html board
        var coords = [];
        var id, i = 0;
        for (var row = 0; row < dims; row++) {
            for (var col = 0; col < dims; col++) {
                coords[i++] = [row, col];
            }
        }
        tripleT.showGrid();
        $('.square').on('click', function () {
            //tripleT.showGrid();
            if (tripleT.checkWin() === 'None') {
                $(this).text('X');
                id = $(this).attr('id');
                tripleT.move(coords[id], PLAYERX);

                if (tripleT.checkWin() === 'None') {
                    //tripleT.showGrid();
                    var move = minimax(tripleT, PLAYERX)[1];
                    //console.log('move', move)
                    tripleT.move(move, PLAYERO);
                    id = subArrayIndex(coords, move);
                    //console.log('id', id)
                    $('#' + id).text('O');
                } else {
                    alert('winner is ' + tripleT.checkWin())
                }
            } else {
                alert('winner is ' + tripleT.checkWin())
            }

        });


        /*function onTimerTick() {
         var id;
         console.log(tripleT.checkWin())
         if (tripleT.checkWin() === 'None') {
         console.log('count', moveCount)
         if (moveCount === false) {
         $('.square').on('click', function () {

         $(this).text('X');
         id = $(this).attr('id');
         tripleT.move(coords[id], PLAYERX);
         moveCount = true;
         onTimerTick();
         });
         } else {

         var move = minimax(tripleT, PLAYERO)[1];
         console.log('move', move)
         tripleT.move(move, PLAYERO);
         id = subArrayIndex(coords, move);
         console.log('id', id)
         $('#' + id).text('O');

         moveCount = false;

         onTimerTick();
         }

         //console.log('winner!', tripleT.checkWin())

         }
         } */


        //setInterval(onTimerTick, 1000); // 33 milliseconds = ~ 30 frames per sec

    }

    runGame(dims);

    var test = new Board(dims, [[2, 0, 0], [1, 2, 0], [1, 1, 0]]);
    var test2 = new Board(dims, test.grid.concat());
    //var test2 = test.clone();
    console.log('test grid', test.showGrid());
    console.log('test2 grid', test2.showGrid());
    test.move([0, 1], PLAYERO);
    console.log('test grid', test.showGrid());
    console.log('test2 grid', test2.showGrid());
    var ttt = new Board(3, test2);
    //console.log('min', minimax(ttt, PLAYERO)[1]);
    /*ttt.move(2, 1, PLAYERX);
     ttt.showGrid();
     console.log('winner', ttt.checkWin());*/

});