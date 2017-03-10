$(document).ready(function () {


    $("#btn-add-and").click(function (event) {
        board.addControl(new AndGate(board));
    });
    $("#btn-add-one").click(function (event) {
        board.addControl(new HighConstant(board));
    });
    $("#btn-add-zero").click(function (event) {
        board.addControl(new LowConstant(board));
    });
    $("#btn-add-bulb").click(function (event) {
        board.addControl(new Bulb(board));
    });
    $("#btn-add-or").click(function (event) {
        board.addControl(new OrGate(board));
    });
});
