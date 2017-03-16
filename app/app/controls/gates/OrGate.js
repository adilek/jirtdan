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
 * Control for OR gate.
 *
 * Truth table:
 * |In1|In2|Out|
 * |0  |0  |0  |
 * |0  |1  |1  |
 * |1  |0  |1  |
 * |1  |1  |1  |
 */
export class OrGate extends BaseControl {
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

        let componentBody = this.paper.path("m 101.5,3.5 7,8 7,8 c 0,0 20,24 20,60 0,36 -20,60 -20,60 l -15,17 24,0 53,0 c 9,0 30,0 54,-9 23,-9 50,-28 70,-64 1,-2 2,-4 2,-5 l -2,-4 c -39,-69 -105,-71 -123,-71 l -53,0 z m 203,75 99,0 m -274.48844,41 -99.51156,0 m 99,-73 -99,0");
        let inputPin1 = new ConnectionPin(this, 15, 47, "in");
        let inputPin2 = new ConnectionPin(this, 15, 119, "in");
        let outputPin = new ConnectionPin(this, 415, 78, "out");
        let _this = this;
        inputPin1.addStateChangeListener(
            function (newState) {
                _this.inputPin1Value = newState;
                outputPin.notifyStateChange(_this.getValue());

            });

        inputPin2.addStateChangeListener(
            function (newState) {
                _this.inputPin2Value = newState;
                outputPin.notifyStateChange(_this.getValue());
            });

        this.setShapes([componentBody]);
        this.addInputPins(inputPin1, inputPin2);
        this.addOutputPins(outputPin);
    }

    getValue() {
        return this.inputPin1Value || this.inputPin2Value;
    }
}
