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

import {BaseControl} from '../BaseControl.js'
import {ConnectionPin} from '../ConnectionPin.js'
/**
 * Control for NOT gate.
 *
 * Truth table:
 * |In1|Out|
 * |0  |1  |
 * |1  |0  |
 */
//TODO: Remove the direct dependency from raphael.
export class NotGate extends BaseControl {
    /**
     * Constructor for NotGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.inputPin1Value = 0;
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 152,7 0,158 L 266,86 152,7 Z m 134,59 a 20,20 0 0 0 -20,20 20,20 0 0 0 20,20 20,20 0 0 0 20,-20 20,20 0 0 0 -20,-20 z M 36,86 l 113,0 -113,0 z m 271,0 113,0 -113,0 z");
        let inputPin = new ConnectionPin(this, 20, 86, "in");
        let outputPin = new ConnectionPin(this, 415, 86, "out");
        let _this = this;

        inputPin.addStateChangeListener(
            function (newState) {
                _this.inputPin1Value = newState;
                outputPin.notifyStateChange(_this.getValue());

            });

        this.setShapes([componentBody]);
        this.addInputPins(inputPin);
        this.addOutputPins(outputPin);
    }

    getValue() {
        return !this.inputPin1Value;
    }
}
