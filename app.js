/**
 * Created by Alex on 15/11/2015.
 */

$(document).ready(function () {

    $('.square').on('click', function () {

        $(this).text('X')

    })

    //game's constants
    var DRAW = 0, PLAYERX = 1, PLAYERO = 2,
        SCORES = {
            PLAYERX: 1,
            DRAW: 0,
            PLAYERO: -1
        };

    //Class representing the game's board
    function Board(dims, board) {
        this.dims = dims;
        //initialize two-dimensional array (grid)
        if (board) {
            this.grid = board;
        } else {
            this.grid = [];
            for (var row = 0; row < dims[0]; row++) {
                this.grid[row] = [];
                for (var col = 0; col < dims[1]; col++) {
                    this.grid[row][col] = 0;
                }
            }
        }

        //Show visual representation of the grid
        this.showGrid = function () {
            for (var row = 0; row < dims[0]; row++) {
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
            for (var row = 0; row < this.dims[0]; row++) {
                for (var col = 0; col < this.dims[1]; col++) {
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
        this.move = function (row, col, player) {
            if (this.grid[row][col] === 0) {
                this.grid[row][col] = player;
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
            for (var i = 0; i < this.dims[0]; i++) {

                if (this.grid[0][i] !== 0 && this.grid[i][0] == this.grid[i][1] && this.grid[i][1] == this.grid[i][2]) {
                    return this.grid[i][0];
                    //check cols
                } else if (this.grid[i][0] !== 0 && this.grid[0][i] == this.grid[1][i] && this.grid[1][i] == this.grid[2][i]) {
                    return this.grid[0][i];
                }
            }
            //check diags
            if (this.grid[1][1] !== 0 && (this.grid[0][0] == this.grid[1][1] && this.grid[1][1] == this.grid[2][2] ||
                this.grid[0][2] == this.grid[1][1] && this.grid[1][1] == this.grid[2][0])) {
                return this.grid[1][1];
                //check draw
            } else if (this.getEmptySquares().length == 1) {
                return 0;
            } else {
                return 'None';
            }
        };

    }

    //Function that runs the game
    function runGame() {

    }

    var testB = [[0, 2, 1], [1, 1, 2], [0, 2, 1]];
    var ttt = new Board([3, 3], testB);
    //ttt.move(2, 1, 'PLAYERX');
    console.log('winner', ttt.checkWin());

});