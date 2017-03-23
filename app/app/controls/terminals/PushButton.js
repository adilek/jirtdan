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
    DEFAULT_FILL_COLOR
} from '../BaseControl.js'
import {ConnectionPin} from '../ConnectionPin.js'
/**
 * Control for Switch Button.
 */
//TODO: Remove the direct dependency from raphael.
export class PushButton extends BaseControl {
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

        let outputPin3 = new ConnectionPin(this, 186, 83, "out");
        this.value = 0;
        this.setShapes([componentBody]);
        this.addOutputPins(outputPin3);

        let _this = this;
        componentBody.mousedown(function () {
            _this.value = 1;
            componentBody.attr("fill", _this.value ? "#0000ff" : DEFAULT_FILL_COLOR);
            outputPin3.notifyStateChange(_this.getValue());
        });
        componentBody.mouseup(function () {
            _this.value = 0;
            componentBody.attr("fill", _this.value ? "#0000ff" : DEFAULT_FILL_COLOR);
            outputPin3.notifyStateChange(_this.getValue());
        });
    }

    getValue() {
        return this.value;
    }
}
