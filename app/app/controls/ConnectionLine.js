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

"use strict";
/*jshint esversion: 6*/

import {
    BaseControl,
    POWER_STATE_HIGH,
    DEFAULT_SIGNAL_PRESENCE_COLOR,
    DEFAULT_FILL_COLOR,
    DEFAULT_STROKE_COLOR
} from './BaseControl.js'

export class ConnectionLine {

    constructor(board, pin1, pin2) {
        this.board = board;
        this.paper = this.board.paper;
        this.inputPin = pin1.isInputType() ? pin1 : (pin2.isInputType() ? pin2 : null);
        this.outputPin = pin2.isOutputType() ? pin2 : (pin1.isOutputType() ? pin1 : null);

        if (this.inputPin == null || this.outputPin == null) {
            throw new Error("Something went wrong");
        }

        this.init();

        let _this = this;
        this.outputPin.addStateChangeListener(function (newState) {
            _this.inputPin.notifyStateChange(newState);
            _this.setState(newState);
        });
        this.inputPin.setCanConnect(false);
    }

    /**
     * Initialization of the components.
     * The method should not be called externally.
     */
    init() {
        //FIXME: Clean this dirty shit

        let x1 = this.inputPin.element.attr("cx") + this.inputPin.element.matrix.e;
        let y1 = this.inputPin.element.attr("cy") + this.inputPin.element.matrix.f;

        this.start = [x1, y1];

        let x2 = this.outputPin.element.attr("cx") + this.outputPin.element.matrix.e;
        let y2 = this.outputPin.element.attr("cy") + this.outputPin.element.matrix.f;

        this.end = [x2, y2];

        this.element = this.paper.path("M " + x1 + "," + y1 + " L " + x2 + "," + y2);
        //TODO:
        BaseControl.applyDefaultAttributes(this.element);
    }

    /**
     * The method is used to translate the pin locations during drag-drop.
     * @param pin
     * @param x
     * @param y
     */
    onPinTranslate(pin, x, y) {
        if (pin != this.inputPin && pin != this.outputPin) return;

        let pathAttr = this.element.attr("path");
        if (pin == this.inputPin) {
            //TODO:
            pathAttr[0][1] += x;
            pathAttr[0][2] += y;

        } else {
            //TODO:
            pathAttr[1][1] += x;
            pathAttr[1][2] += y;
        }
        this.element.attr("path", pathAttr);
    }

    /**
     * Set binary state(LOW/HIGH) for the connection line.
     * This method should not be called externally.
     * @param state POWER_STATE_HIGH or POWER_STATE_LOW
     */
    setState(state) {
        if (state == POWER_STATE_HIGH) {
            this.element.attr("fill", DEFAULT_SIGNAL_PRESENCE_COLOR);
            this.element.attr("stroke", DEFAULT_SIGNAL_PRESENCE_COLOR);
        } else {
            this.element.attr("fill", DEFAULT_FILL_COLOR);
            this.element.attr("stroke", DEFAULT_STROKE_COLOR);
        }
    }
}