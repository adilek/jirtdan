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
    DEFAULT_STROKE_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_FILL_COLOR,
    DEBUG,
} from '../BaseControl.js';
import {ConnectionPin} from '../ConnectionPin.js';

const LOGTAG = 'OrGate';

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

    /**
     * Draw the component surface
     */
    draw() {
        super.draw();

        this.componentInputWire1 = this.paper.path('m 10,11.233446 19.55419,0');
        this.componentInputWire1.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentInputWire1.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentInputWire2 = this.paper.path('m 10,38.765748 19.55419,0');
        this.componentInputWire2.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentInputWire2.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentOutputWire = this.paper.path('m 76.907772,24.999597 19.554188,0');
        this.componentOutputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentOutputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentBodyShape = this.paper.path('M 23.884294,0.98165499 A 6.6318398,24.254708 ' +
            '0 0 1 29.647279,24.999109 6.6318398,24.254708 0 0 1 23.93612,48.992974 ' +
            'l 13.940289,0 c 2.854669,-0.09472 5.720639,0.223753 8.564575,-0.230024 ' +
            '0.152743,-0.01531 0.307035,-0.04378 0.460694,-0.06684 A 35.091661,36.015432 ' +
            '0 0 0 77.284394,24.983385 35.091661,36.015432 0 0 0 46.626701,1.2922936 ' +
            'C 45.767476,1.1103691 44.909376,1.0045184 44.062656,0.98165499 c ' +
            '-6.725618,-2.3055e-4 -13.452632,3.721e-5 -20.178362,0 z');
        this.componentBodyShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentBodyShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        this.componentBodyShape.attr('stroke-linejoin', 'round');
        this.componentBodyShape.attr('stroke-miterlimit', 4);

        this.componentBodyFill = this.paper.path('m 26.192665,2.2770733 c 5.926298,-2.02e-5 11.853246,-2.014e-4 ' +
            '17.779164,0 0.808697,0.021743 1.631486,0.1223453 2.457821,0.2968739 a 0.84220914,1.1473132 ' +
            '0 0 0 0.08659,0.011777 C 60.013606,3.5107633 71.619229,12.461416 76.316088,25.132568 ' +
            '71.665013,37.726207 60.187004,46.666381 46.786135,47.699048 a 0.84220914,1.1473132 0 ' +
            '0 0 -0.04471,0.004 c -0.168086,0.02516 -0.311764,0.05104 -0.43009,0.06292 a 0.84220914,1.1473132 ' +
            '0 0 0 -0.03754,0.006 c -2.741088,0.436292 -5.5866,0.125475 -8.507843,0.222173 l -11.557392,0 ' +
            'c 1.014483,-1.619407 1.840575,-3.848116 2.495352,-6.592178 1.056825,-4.429 1.67379,-10.107999 ' +
            '1.675592,-16.255431 -0.0022,-6.183935 -0.62538,-11.88817 -1.692919,-16.3261906 -0.655198,-2.723828 ' +
            '-1.482205,-4.9369847 -2.493904,-6.5430658 z');
        this.componentBodyFill.attr('stroke-width', 1);
        this.componentBodyFill.attr('stroke', DEFAULT_FILL_COLOR);
        this.componentBodyFill.attr('fill', DEFAULT_FILL_COLOR);

        this.componentBodyGradient = this.paper.path('m 26.192665,1.9187 c 1.014674,1.606081 1.844114,3.8192379 ' +
            '2.501239,6.5430657 0.991662,4.1104943 1.594219,9.3135613 1.680522,14.9715933 2.199007,-1.148891 ' +
            '4.576339,-2.065092 7.204085,-2.520499 3.49611,-0.413432 7.164302,0.669677 9.326083,2.819336 ' +
            '2.184037,1.721099 3.994268,3.96551 7.050663,4.836523 2.638613,0.438497 5.399503,0.24912 ' +
            '8.065335,0.03343 4.898971,-0.632573 9.64962,-1.772778 14.217111,-3.24991 0.07526,-0.192658 ' +
            '0.153792,-0.383594 0.225806,-0.578015 C 71.752836,12.103062 60.113075,3.1524102 ' +
            '46.576016,2.2273717 a 0.84468635,1.1473131 0 0 1 -0.08684,-0.011777 C 45.660408,2.0410655 ' +
            '44.83519,1.9404633 44.024116,1.9187202 c -5.94334,-2.014e-4 -11.887721,-2.02e-5 -17.831451,0 z');
        this.componentBodyGradient.attr('stroke-width', 0);
        this.componentBodyGradient.attr('fill', '90-#0066ff-#fff');
    }

    /**
     * Initialize the control.
     */
    initControl() {
        super.initControl();
        const _this = this;

        const inputPin1 = new ConnectionPin(this, 5, 11, 'in');
        const inputPin2 = new ConnectionPin(this, 5, 39, 'in');
        const outputPin = new ConnectionPin(this, 102, 25, 'out');

        inputPin1.addStateChangeListener(
            function(newState) {
                _this.inputPin1Value = newState;
                outputPin.notifyStateChange(_this.getValue());
            });

        inputPin2.addStateChangeListener(
            function(newState) {
                _this.inputPin2Value = newState;
                outputPin.notifyStateChange(_this.getValue());
            });

        this.setShapes([
            this.componentBodyShape,
            this.componentBodyFill,
            this.componentBodyGradient,
            this.componentInputWire1,
            this.componentInputWire2,
            this.componentOutputWire]);
        this.addInputPins(inputPin1, inputPin2);
        this.addOutputPins(outputPin);
    }

    /**
     * An event fired when element is selected.
     * @param event
     */
    onSelect(event) {
        super.onSelect(event);
        this.glow = this.componentBodyShape.glow();
        this.glow.toBack();
    }

    /**
     * Get the calculated value of the expression.
     * @returns {number|*}
     */
    getValue() {
        return this.inputPin1Value || this.inputPin2Value;
    }
}
