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
 * Control for AND gate.
 *
 * Truth table:
 * |In1|In2|Out|
 * |0  |0  |0  |
 * |0  |1  |0  |
 * |1  |0  |0  |
 * |1  |1  |1  |
 */
//TODO: Remove the direct dependency from raphael.
export class AndGate extends BaseControl {
    /**
     * Constructor for AndGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.inputPin1Value = 0;
        this.inputPin2Value = 0;
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 144,3 0,158 71,0 c 39,0 71,-35 71,-79 0,-43 -31,-79 -70,-79 l -71,0 z M 28,22 l 112,0 -112,0 z m 260,60 113,0 -113,0 z M 28,143 141,143 28,143 Z");
        let inputPin1 = new ConnectionPin(this, 15, 23, "in");
        let inputPin2 = new ConnectionPin(this, 15, 143, "in");
        let outputPin3 = new ConnectionPin(this, 415, 83, "out");
        let _this = this;
        inputPin1.addStateChangeListener(
            function (newState) {
                _this.inputPin1Value = newState;
                outputPin3.notifyStateChange(_this.getValue());

            });

        inputPin2.addStateChangeListener(
            function (newState) {
                _this.inputPin2Value = newState;
                outputPin3.notifyStateChange(_this.getValue());
            });

        this.setShapes([componentBody]);
        this.addInputPins(inputPin1, inputPin2);
        this.addOutputPins(outputPin3);
    }

    getValue() {
        return this.inputPin1Value && this.inputPin2Value;
    }
}
