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
    DEFAULT_STROKE_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_FILL_COLOR
} from '../BaseControl.js'
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
     * Constructor for OrGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.inputPin1Value = 0;
        this.inputPin2Value = 0;
    }

    initControl() {
        super.initControl();
        const _this = this;

        let componentBodyShape = this.paper.path("m 24.042012,1.1397398 a 8.9970937,24.095066 0 0 1 7.81836,23.8593742 8.9970937,24.095066 0 0 1 -7.74805,23.83594 l 18.912111,0 c 3.87279,-0.0941 7.760912,0.22228 11.619141,-0.22851 0.207217,-0.0152 0.416539,-0.0435 0.625,-0.0664 A 47.607145,35.778383 0 0 0 96.487324,24.983494 47.607145,35.778383 0 0 0 54.895527,1.4483338 c -1.165669,-0.180727 -2.329811,-0.285881 -3.478516,-0.308594 -9.124318,-2.29e-4 -18.250529,3.7e-5 -27.374999,0 z");
        componentBodyShape.attr("stroke", DEFAULT_STROKE_COLOR);
        componentBodyShape.attr("stroke-width", DEFAULT_STROKE_WIDTH);
        componentBodyShape.attr("stroke-linejoin", "round");
        componentBodyShape.attr("stroke-miterlimit", 4);

        let componentBodyFill = this.paper.path("m 27.173666,2.4266318 c 8.03992,-2e-5 16.080721,-2e-4 24.120125,0 1.09712,0.0216 2.213357,0.12154 3.334407,0.29492 a 1.1425841,1.1397617 0 0 0 0.11748,0.0117 c 18.31121,0.91895 34.055993,9.8106902 40.427993,22.3984422 -6.309887,12.51075 -21.881542,21.39208 -40.061849,22.41795 a 1.1425841,1.1397617 0 0 0 -0.06065,0.004 c -0.228034,0.025 -0.422955,0.0507 -0.583482,0.0625 a 1.1425841,1.1397617 0 0 0 -0.05093,0.006 c -3.718701,0.43342 -7.579067,0.12465 -11.542176,0.22071 l -15.679349,0 c 1.376289,-1.60878 2.497008,-3.82282 3.385312,-6.54882 1.433742,-4.39985 2.270749,-10.04147 2.273195,-16.14844 -0.003,-6.143252 -0.848415,-11.809942 -2.296693,-16.2187522 -0.888876,-2.7059 -2.010837,-4.90449 -3.383358,-6.5 z");
        componentBodyFill.attr("stroke-width", 1);
        componentBodyFill.attr("stroke", DEFAULT_FILL_COLOR);
        componentBodyFill.attr("fill", DEFAULT_FILL_COLOR);

        let componentBodyGradient = this.paper.path("m 27.173666,2.2480318 c 1.376558,1.59551 2.501819,3.7941 3.393309,6.5 1.345339,4.0834402 2.1628,9.2522602 2.279882,14.8730522 2.983286,-1.14133 6.208496,-2.0515 9.773431,-2.50391 4.743002,-0.41071 9.719458,0.66527 12.652242,2.80078 2.962977,1.70977 5.418828,3.93941 9.565291,4.80469 3.579678,0.43561 7.325243,0.24748 10.941847,0.0332 6.646195,-0.62841 13.091169,-1.76111 19.287662,-3.22852 0.102103,-0.19139 0.208642,-0.38107 0.306341,-0.57421 C 88.98293,12.365362 73.191832,3.4736218 54.826765,2.5546718 a 1.1459448,1.1397616 0 0 1 -0.117815,-0.0117 c -1.124346,-0.17338 -2.243878,-0.27332 -3.344224,-0.29492 -8.06304,-2e-4 -16.127492,-2e-5 -24.19106,0 z");
        componentBodyGradient.attr("stroke-width", 0);
        componentBodyGradient.attr("fill", "90-#0066ff-#fff");

        let componentInputWire1 = this.paper.path("m 10,11.233446 19.55419,0");
        componentInputWire1.attr("stroke", DEFAULT_STROKE_COLOR);
        componentInputWire1.attr("stroke-width", DEFAULT_STROKE_WIDTH);

        let componentInputWire2 = this.paper.path("m 10,38.765748 19.55419,0");
        componentInputWire2.attr("stroke", DEFAULT_STROKE_COLOR);
        componentInputWire2.attr("stroke-width", DEFAULT_STROKE_WIDTH);

        let componentOutputWire = this.paper.path("m 96.907772,24.999597 19.554188,0");
        componentOutputWire.attr("stroke", DEFAULT_STROKE_COLOR);
        componentOutputWire.attr("stroke-width", DEFAULT_STROKE_WIDTH);

        let inputPin1 = new ConnectionPin(this, 5, 11, "in");
        let inputPin2 = new ConnectionPin(this, 5, 39, "in");
        let outputPin = new ConnectionPin(this, 120, 25, "out");

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

        this.setShapes([
            componentBodyShape,
            componentBodyFill,
            componentBodyGradient,
            componentInputWire1,
            componentInputWire2,
            componentOutputWire]);
        this.addInputPins(inputPin1, inputPin2);
        this.addOutputPins(outputPin);
    }

    getValue() {
        return this.inputPin1Value || this.inputPin2Value;
    }
}
