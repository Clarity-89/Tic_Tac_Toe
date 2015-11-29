/**
 * Created by Alex on 15/11/2015.
 */

$(document).ready(function () {

    var board, sq = $('.square');

    //helper function
    function switchPlayer(player) {
        return player === PLAYERX ? PLAYERO : PLAYERX;
    }

    function minimax(board, player) {
        var mult = SCORES[String(player)], thisScore,
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
    function runGame() {
        // remove all event listeners from element to prev ent memory leaks
        sq.off();

        //Create a new board for the game
        board = new Board(dims);

        //clear previous board
        for (var i = 0; i < dims * dims; i++) {
            $('#' + i).text('');
        }
        playerMove();
    }

    function playerMove() {

        sq.on('click', function () {

            var id = $(this).attr('id');
            if (board.square(id) === 0) {
                $(this).text('X');
                board.move(id, PLAYERX);
                if (board.checkWin() === 'None') {
                    AImove(board);
                } else {
                    declareWinner(board.checkWin());
                }
            } else {
                playerMove(board);
            }
        });
    }

    function AImove() {
        var move = minimax(board, PLAYERO)[1];
        board.move(move, PLAYERO);
        $('#' + move).text('O');
        if (board.checkWin() === 'None') {
            playerMove(board);
        } else {
            declareWinner(board.checkWin());
        }
    }

    function declareWinner(winner) {
        winner = winner === 1 ? 'Player X' : winner === 2 ? 'Player O' : 'Draw';
        var text = winner == 'Draw' ? "It's a draw!" : winner + ' wins!';
        $('.modal-body').html('<h3>' + text + '</h3>');
        $('.winner').modal('show');
    }

    runGame();

    $('#replay').on('click', function () {
        $('.winner').modal('hide');
        runGame();
    });
});