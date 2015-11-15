/**
 * Created by Alex on 15/11/2015.
 */

$(document).ready(function () {

    $('.square').on('click', function () {

        $(this).text('X')

    })

    //Class representing game's board
    function Board(dims) {
        this.dims = dims;
        //initialize two-dimensional array (grid)
        this.grid = [];
        for (var row = 0; row < dims[0]; row++) {
            this.grid[row] = [];
            for (var col = 0; col < dims[1]; col++) {
                this.grid[row][col] = 0;
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
        }

    }

    var ttt = new Board([3, 3]);
    console.log(ttt.square(1,2))
    // ttt.showGrid();
});