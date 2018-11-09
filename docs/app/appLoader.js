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

import * as $ from 'jquery';

import { Board } from './app/Board.js';
import { AndGate } from './app/controls/gates/AndGate.js';
import { OrGate } from './app/controls/gates/OrGate.js';
import { HighConstant } from './app/controls/terminals/HighConstant.js';
import { LowConstant } from './app/controls/terminals/LowConstant.js';
import { Bulb } from './app/controls/terminals/Bulb.js';
import { NotGate } from './app/controls/gates/NotGate.js';
import { BufferGate } from './app/controls/gates/BufferGate.js';
import { XorGate } from './app/controls/gates/XorGate.js';
import { SwitchButton } from './app/controls/terminals/SwitchButton.js';
import { PushButton } from './app/controls/terminals/PushButton.js';
import { NandGate } from './app/controls/gates/NandGate.js';
import { NorGate } from './app/controls/gates/NorGate.js';
import { XnorGate } from './app/controls/gates/XnorGate.js';

let board = new Board(Raphael('board', 1280, 800));

$(document).ready(function() {
	$('#board')
		.mousedown(function(event) {
			'use strict';
			board.onMouseDown(event);
		})
		.mousemove(function(event) {
			'use strict';
			board.onMouseMove(event);
		})
		.mouseup(function(event) {
			'use strict';
			board.onMouseUp(event);
		});

	$('#btn-add-and').click(function(event) {
		board.addControl(new AndGate(board));
	});
	$('#btn-add-one').click(function(event) {
		board.addControl(new HighConstant(board));
	});
	$('#btn-add-zero').click(function(event) {
		board.addControl(new LowConstant(board));
	});
	$('#btn-add-bulb').click(function(event) {
		board.addControl(new Bulb(board));
	});
	$('#btn-add-or').click(function(event) {
		board.addControl(new OrGate(board));
	});
	$('#btn-add-not').click(function(event) {
		board.addControl(new NotGate(board));
	});
	$('#btn-add-xor').click(function(event) {
		board.addControl(new XorGate(board));
	});
	$('#btn-add-switch').click(function(event) {
		board.addControl(new SwitchButton(board));
	});
	$('#btn-add-push').click(function(event) {
		board.addControl(new PushButton(board));
	});
	$('#btn-add-buffer').click(function(event) {
		board.addControl(new BufferGate(board));
	});
	$('#btn-add-nand').click(function(event) {
		board.addControl(new NandGate(board));
	});
	$('#btn-add-nor').click(function(event) {
		board.addControl(new NorGate(board));
	});
	$('#btn-add-xnor').click(function(event) {
		board.addControl(new XnorGate(board));
	});
	$('#btn-delete').click(function(event) {
		board.deleteSelected();
	});
	$('body').on('keyup', function(event) {
		// delete selected item
		// when user clicks 'del' button on keyboard
		if (event.keyCode === 46) {
			board.deleteSelected();
		}
	});
	$('#btn-unselect').click(function(event) {
		board.unselect();
	});
});
