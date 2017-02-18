var el;
$(document).ready(function () {


    let board = new Board();

    $("#btn-add").click(function (event) {
        board.addControl(new AndGate(board));
    });

});
