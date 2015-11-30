/**
 * Created by Alex on 15/11/2015.
 */

$(document).ready(function () {

    var board, human, computer, hmarker, cmarker,
        sq = $('.square'), DOMboard = $('#board'), startScreen = $('#start-screen');


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

        //Make first move for the computer
        if (computer === PLAYERX) {
            board.move(4, computer);
            $('#4').text('X').fadeIn('slow');
        }
        playerMove();
    }

    function playerMove() {

        sq.on('click', function () {
            var id = $(this).attr('id');
            if (board.square(id) === 0) {
                $(this).text(hmarker);
                board.move(id, human);
                if (board.checkWin() === 'None') {
                    AImove();
                } else {
                    declareWinner(board.checkWin());
                }
            } else {
                playerMove(board);
            }
        });
    }

    function AImove() {
        var move = minimax(board, computer)[1];
        board.move(move, computer);
        $('#' + move).text(cmarker);
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

    function choosePlayer() {
        DOMboard.css('display', 'none');
        startScreen.css('display', 'block');
        $('.player').on('click', function () {
            DOMboard.css('display', 'block');
            startScreen.css('display', 'none');
            human = $(this).text() == 'X' ? PLAYERX : PLAYERO;
            hmarker = $(this).text();
            computer = switchPlayer(human);
            cmarker = computer == PLAYERO ? 'O' : 'X';
            runGame();
        });
    }

    choosePlayer();

    $('#replay').on('click', function () {
        $('.winner').modal('hide');
        choosePlayer();
    });
});