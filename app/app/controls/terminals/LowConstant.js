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
 * Control for Low Constant (0).
 */
//TODO: Remove the direct dependency from raphael.
export class LowConstant extends BaseControl {
    /**
     * Constructor for LowConstant
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 2,3 0,159 122,0 0,-159 -122,0 z M 126,83 l 49,0 -49,0 z");
        let componentText = this.paper.path("m 81,83 q 0,-20 -3,-28 -3,-8 -12,-8 -9,0 -12,8 -3,8 -3,28 0,20 3,29 3,8 12,8 8,0 12,-8 3,-8 3,-29 z m 28,0 q 0,27 -11,41 -11,14 -33,14 -21,0 -33,-14 -11,-14 -11,-41 0,-27 11,-41 Q 43,27 65,27 q 21,0 33,14 11,14 11,41 z");
        let outputPin = new ConnectionPin(this, 186, 83, "out");

        this.setShapes([componentBody, componentText]);
        this.addOutputPins(outputPin);
    }

    getValue() {
        return 0;
    }
}
