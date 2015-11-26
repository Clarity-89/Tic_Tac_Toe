/**
 * Created by Alex on 26/11/2015.
 */

describe('Board', function(){
    it("board can be initialized with empty squares", function() {
        var board = new Board(3);
        var emptyGrid = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        expect(board.grid).toEqual(emptyGrid);
    });
});