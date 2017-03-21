/*

 Copyright (c) 2017 Jirtdan Team and other collaborators

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import {Board} from './app/Board.js';
import {AndGate} from './app/controls/gates/AndGate.js'
import {OrGate} from 'app/controls/gates/OrGate.js'
import {HighConstant} from 'app/controls/terminals/HighConstant.js'
import {LowConstant} from 'app/controls/terminals/LowConstant.js'
import {Bulb} from 'app/controls/terminals/Bulb.js'
import {NotGate} from 'app/controls/gates/NotGate.js'
import {XorGate} from 'app/controls/gates/XorGate.js'
import {SwitchButton} from 'app/controls/terminals/SwitchButton.js'

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
    $("#btn-add-not").click(function (event) {
        board.addControl(new NotGate(board));
    });
    $("#btn-add-xor").click(function (event) {
        board.addControl(new XorGate(board));
    });
    $("#btn-add-switch").click(function (event) {
        board.addControl(new SwitchButton(board));
    });

});