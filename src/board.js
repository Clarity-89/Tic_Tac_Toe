/**
 * Created by Alex on 26/11/2015.
 */

//Game's constants
var DRAW = 0,
  PLAYERX = 1,
  PLAYERO = 2,
  SCORES = {
    1: 1,
    0: 0,
    2: -1
  };

var dims = 3; //dimensions for the game's board

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

//Show visual representation of the grid for debugging purposes
Board.prototype.showGrid = function() {
  var grid = [];
  for (var i = 0; i < dims * dims; i++) {
    grid.push(this.grid[i]);
  }
  return grid;
};

/*Returns one of the three constants for EMPTY, PLAYERX, or PLAYERO
 that correspond to the contents of the board at position (square).*/
Board.prototype.square = function(sqr) {
  return this.grid[sqr];
};

//Return an array of all empty squares in form [squares]
Board.prototype.getEmptySquares = function() {
  var empty = [];
  for (var i = 0; i < this.dims * this.dims; i++) {
    if (this.square(i) === 0) empty.push(i);
  }
  return empty;
};

/*Place player on the board at position (square).
 player should be either the constant PLAYERX or PLAYERO.
 Does nothing if board square is not empty.*/
Board.prototype.move = function(square, player) {
  if (this.square(square) === 0) {
    this.grid[square] = player;
  }
};

/*Returns a constant associated with the state of the game
 If PLAYERX wins, returns 1.
 If PLAYERO wins, returns 2.
 If game is drawn, returns 0.
 If game is in progress, returns 'None'.*/
Board.prototype.checkWin = function() {
  var winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  var self = this;
  var res = "None";
  winning.forEach(function(el) {
    if (
      self.square(el[0]) !== 0 &&
      self.square(el[0]) === self.square(el[1]) &&
      self.square(el[0]) === self.square(el[2])
    ) {
      res = self.square(el[0]);
    } else if (res == "None" && self.getEmptySquares().length === 0) {
      res = DRAW;
    }
  });
  return res;
};
//return a copy of the board
Board.prototype.clone = function() {
  return new Board(dims, this.grid);
};
