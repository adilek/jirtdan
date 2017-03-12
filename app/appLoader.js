import {Board} from './app/Board.js';
import {AndGate} from './app/controls/gates/AndGate.js'
import {OrGate} from 'app/controls/gates/OrGate.js'
import {HighConstant} from 'app/controls/terminals/HighConstant.js'
import {LowConstant} from 'app/controls/terminals/LowConstant.js'
import {Bulb} from 'app/controls/terminals/Bulb.js'

let board = new Board(Raphael("board", 1280, 800));

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