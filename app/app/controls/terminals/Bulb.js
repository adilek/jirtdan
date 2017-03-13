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
    POWER_STATE_LOW,
    POWER_STATE_HIGH,
    DEFAULT_FILL_COLOR,
    DEFAULT_SIGNAL_PRESENCE_COLOR,
    BaseControl
} from '../BaseControl.js'
import {ConnectionPin} from '../ConnectionPin.js'
/**
 * Control for High Constant (1).
 */
//TODO: Remove the direct dependency from raphael.
export class Bulb extends BaseControl {
    /**
     * Constructor for Bulb
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        this.componentBody = this.paper.path("m 198,3 0,159 -122,0 0,-159 122,0 z M 74,83 l -49,0 49,0 z");

        let inputPin = new ConnectionPin(this, 20, 83, "in");

        this.setShapes([this.componentBody]);
        this.addOutputPins(inputPin);
        this.setState(POWER_STATE_LOW);
        let _this = this;

        // Bulb will turn on/off depending on pin value.
        inputPin.addStateChangeListener(
            function (newState) {
                _this.setState(newState);
            });
    }

    /**
     * Change the binary state(LOW/HIGH) of the component.
     * @param state
     */
    setState(state) {
        if (state == POWER_STATE_HIGH) {
            this.componentBody.attr("fill", DEFAULT_SIGNAL_PRESENCE_COLOR);
        } else {
            this.componentBody.attr("fill", DEFAULT_FILL_COLOR);
        }
    }
}
