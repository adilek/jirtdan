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

'use strict';
/* jshint esversion: 6*/
import {
    BaseControl,
    DEFAULT_FILL_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_STROKE_COLOR,
    DEBUG,
} from '../BaseControl.js';
import {ConnectionPin} from '../ConnectionPin.js';

const LOGTAG = 'LowConstant';
/**
 * Control for Low Constant (0).
 */
export class LowConstant extends BaseControl {
    /**
     * Constructor for LowConstant
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    /**
     * Initialize the component
     */
    initControl() {
        super.initControl();


        this.componentShape = this.paper.rect(1, 1, 45, 45);
        this.componentShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        this.componentShape.attr('fill', DEFAULT_FILL_COLOR);

        const componentShapeGradient = this.paper.path('m 1.9885,2.1222325 0,18.3451895 c 2.38846,-1.62726 ' +
            '4.94603,-2.93244 7.75586,-3.60465 4.13269,-0.67466 8.468022,1.0912 11.023432,4.59905 ' +
            '2.58172,2.80852 4.72301,6.47002 8.33594,7.89135 3.11906,0.71555 6.38197,0.40939 9.5332,0.0574 ' +
            '2.20797,-0.39356 4.38045,-0.94273 6.53516,-1.5617 l 0,-25.7266095 -43.183592,0 z');
        componentShapeGradient.attr('stroke', DEFAULT_FILL_COLOR);
        componentShapeGradient.attr('fill', '90-#0066ff-#fff');

        const outputWire = this.paper.path('m 46.106981,23.591722 19.55419,0');
        outputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        outputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        const ledBg = this.paper.rect(10.2, 6.3, 26.8, 34.5);
        ledBg.attr('stroke', DEFAULT_STROKE_COLOR);
        ledBg.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        ledBg.attr('fill', '#000000');

        const digitBgLine1 = this.paper.path('m 19.122764,25.310548 -1.718829,-1.718828 1.718829,-1.718829 ' +
            '8.937909,0 1.718829,1.718829 -1.718829,1.718828 -8.937909,0 z');
        digitBgLine1.attr('stroke', 'none');
        digitBgLine1.attr('fill', '#1a1a1a');

        const digitLine1 = this.paper.path('m 17.747701,37.686115 -0.687531,-0.687532 2.750126,-2.750126 ' +
            '7.562846,0 2.750126,2.750126 -0.687532,0.687532 -11.688035,0 z');
        digitLine1.attr('stroke', 'none');
        digitLine1.attr('fill', '#00ff00');

        const digitLine2 = this.paper.path('m 16.372638,36.311052 -0.687531,-0.687532 0,-10.312972 ' +
            '0.687531,-0.687531 2.750126,2.750126 0,6.187783 -2.750126,2.750126 0,0 z');
        digitLine2.attr('stroke', 'none');
        digitLine2.attr('fill', '#00ff00');

        const digitLine3 = this.paper.path('m 30.810799,36.311052 -2.750126,-2.750126 0,-6.187783 ' +
            '2.750126,-2.750126 0.687532,0.687531 0,10.312972 -0.687532,0.687532 0,0 z');
        digitLine3.attr('stroke', 'none');
        digitLine3.attr('fill', '#00ff00');

        const digitLine4 = this.paper.path('m 16.372638,22.560422 -0.687531,-0.687531 0,-10.312972 ' +
            '0.687531,-0.687532 2.750126,2.750126 0,6.187783 -2.750126,2.750126 0,0 z');
        digitLine4.attr('stroke', 'none');
        digitLine4.attr('fill', '#00ff00');

        const digitLine5 = this.paper.path('m 30.810799,22.560422 -2.750126,-2.750126 0,-6.187783 ' +
            '2.750126,-2.750126 0.687532,0.687532 0,10.312972 -0.687532,0.687531 0,0 z');
        digitLine5.attr('stroke', 'none');
        digitLine5.attr('fill', '#00ff00');

        const digitLine6 = this.paper.path('m 19.810296,12.934982 -2.750126,-2.750126 0.687531,-0.6875321 ' +
            '11.688035,0 0.687532,0.6875321 -2.750126,2.750126 -7.562846,0 z');
        digitLine6.attr('stroke', 'none');
        digitLine6.attr('fill', '#00ff00');

        const outputPin = new ConnectionPin(this, 70, 23, 'out');

        this.setShapes([
            this.componentShape,
            componentShapeGradient,
            outputWire,
            ledBg,
            digitBgLine1,
            digitLine1,
            digitLine2,
            digitLine3,
            digitLine4,
            digitLine5,
            digitLine6,
        ]);
        this.addOutputPins(outputPin);
    }

    /**
     * An event fired when element is selected.
     * @param event
     */
    onSelect(event) {
        super.onSelect(event);
        this.glow = this.componentShape.glow();
        this.glow.toBack();
    }

    /**
     * Get the value of control.
     * @returns {number}
     */
    getValue() {
        return 0;
    }
}
