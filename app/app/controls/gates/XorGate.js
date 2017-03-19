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
 * Control for XOR gate.
 *
 * Truth table:
 * |In1|In2|Out|
 * |0  |0  |0  |
 * |0  |1  |1  |
 * |1  |0  |1  |
 * |1  |1  |0  |
 */
export class XorGate extends BaseControl {
    /**
     * Constructor for XorGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.inputPin1Value = 0;
        this.inputPin2Value = 0;
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 118,4 2,3 0,0 c 0,0 24,29 24,74 0,44 -24,74 -24,74 l -0,0 -2,3 4,0 57,0 c 9,0 30,0 54,-9 23,-9 49,-29 70,-67 l 0,-1 -0,-1 C 263,4 199,4 180,4 l -57,0 -4,0 z m -23,2 1,1 0,0 0,0 0,0 c 0,0 7,9 13,24 0,1 0,2 1,3 0,1 0,2 1,3 l -77,0 0,4 78,0 c 3,11 6,24 6,39 0,14 -2,27 -5,38 l -79,0 0,4 77,0 c -0,2 -1,4 -2,6 -0,1 -0,2 -1,3 -6,14 -12,22 -13,22 l -0,0 -0,0 -0,0 -1,1 2,0 c 0,-0 0,-0 0,-0 1,-1 3,-4 6,-9 l 0,-0 -0,0 0,-0 0,-0 c 2,-4 5,-9 7,-15 0,-1 0,-2 1,-3 0,-1 1,-3 2,-5 l 18,0 0,-4 -16,0 c 3,-10 5,-23 5,-38 0,-15 -2,-28 -6,-39 l 17,0 0,-4 -18,0 c -0,-0 -0,-1 -0,-2 -0,-1 -0,-2 -1,-3 -2,-7 -6,-13 -8,-17 l -0,-0 0,-0 c -2,-3 -4,-6 -6,-9 l -2,0 z m 212,74 0,4 98,0 0,-4 -98,0 z");
        let inputPin1 = new ConnectionPin(this, 18, 40, "in");
        let inputPin2 = new ConnectionPin(this, 18, 120, "in");
        let outputPin = new ConnectionPin(this, 415, 81, "out");
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
        console.log(this.inputPin1Value ^ this.inputPin2Value);
        return this.inputPin1Value ^ this.inputPin2Value;
    }
}
