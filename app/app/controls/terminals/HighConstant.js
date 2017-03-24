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
 * Control for High Constant (1).
 */
//TODO: Remove the direct dependency from raphael.
export class HighConstant extends BaseControl {
    /**
     * Constructor for HighConstant
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 2,3 0,159 122,0 0,-159 -122,0 z M 126,83 l 49,0 -49,0 z");
        let componentText = this.paper.path("m 30,119 c 8,0 17,0 25,0 0,-24 0,-48 0,-72 -8,1 -17,3 -26,5 0,-6 0,-13 0,-19 8,-1 17,-3 26,-5 9,0 18,0 27,0 0,30 0,61 0,92 8,0 17,0 25,0 0,6 0,13 0,19 -26,0 -52,0 -78,0 0,-6 0,-13 0,-19 z");
        let outputPin = new ConnectionPin(this, 186, 83, "out");

        this.setShapes([componentBody, componentText]);
        this.addOutputPins(outputPin);
    }

    getValue() {
        return 1;
    }
}
