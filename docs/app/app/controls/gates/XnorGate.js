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

const LOGTAG = 'XnorGate';

/**
 * Control for XNOR gate.
 *
 * Truth table:
 * |In1|In2|Out|
 * |0  |0  |1  |
 * |0  |1  |0  |
 * |1  |0  |0  |
 * |1  |1  |1  |
 */
export class XnorGate extends BaseControl {
    /**
     * Constructor for XorGate
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

        this.componentInputWire1 = this.paper.path('m 10.000001,11.23345 29.55419,0');
        this.componentInputWire1.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentInputWire1.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentInputWire2 = this.paper.path('m 10.000001,38.765752 29.55419,0');
        this.componentInputWire2.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentInputWire2.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentOutputWire = this.paper.path('m 98.90777,24.999601 19.55419,0');
        this.componentOutputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentOutputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentBodyShape = this.paper.path('M 35.564453 0.98242188 A 6.6318398 24.254708 0 0 1 41.328125 25 ' +
            'A 6.6318398 24.254708 0 0 1 35.617188 48.992188 L 49.556641 48.992188 C 52.41131 48.897468 55.277154 ' +
            '49.217449 58.121094 48.763672 C 58.273834 48.748362 58.428381 48.718372 58.582031 48.695312 ' +
            'A 35.091661 36.015432 0 0 0 88.964844 24.984375 A 35.091661 36.015432 0 0 0 58.306641 1.2929688 ' +
            'C 57.447411 1.1110448 56.588907 1.0052849 55.742188 0.98242188 C 49.016568 0.98219088 ' +
            '42.290182 0.98245887 35.564453 0.98242188 z M 95.029297 19.449219 A 5.6206879 5.5509597 ' +
            '0 0 0 89.410156 25 A 5.6206879 5.5509597 0 0 0 95.029297 30.550781 A 5.6206879 5.5509597 ' +
            '0 0 0 100.65039 25 A 5.6206879 5.5509597 0 0 0 95.029297 19.449219 z');
        this.componentBodyShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentBodyShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        this.componentBodyShape.attr('stroke-linejoin', 'round');
        this.componentBodyShape.attr('stroke-miterlimit', 4);

        this.componentBodyFill = this.paper.path('m 37.87299,2.277085 c 5.9263,-2e-5 11.85325,-2.01e-4 ' +
            '17.77917,0 0.80869,0.02174 1.63148,0.122346 2.45782,0.296874 a 0.84220924,1.1473134 0 0 0 ' +
            '0.0866,0.01178 C 71.69394,3.510775 83.29957,12.46143 87.99642,25.132585 83.34535,37.726225 ' +
            '71.86734,46.666401 58.46647,47.699068 a 0.84220924,1.1473134 0 0 0 -0.0447,0.004 ' +
            'c -0.16808,0.02516 -0.31176,0.05104 -0.43009,0.06292 a 0.84220924,1.1473134 0 0 0 -0.0375,0.006 ' +
            'c -2.74109,0.436292 -5.5866,0.125475 -8.50784,0.222173 l -11.5574,0 c 1.01449,-1.619408 ' +
            '1.84058,-3.848117 2.49536,-6.592179 1.05682,-4.429001 1.67379,-10.108 1.67559,-16.255433 ' +
            'C 42.05789,18.962613 41.43451,13.258377 40.36697,8.820355 39.71177,6.096526 38.88476,3.883369 ' +
            '37.87306,2.277288 Z');
        this.componentBodyFill.attr('stroke-width', 1);
        this.componentBodyFill.attr('stroke', DEFAULT_FILL_COLOR);
        this.componentBodyFill.attr('fill', DEFAULT_FILL_COLOR);

        this.componentBodyGradient = this.paper.path('m 37.87299,1.918712 c 1.01467,1.606081 1.84411,3.819238 ' +
            '2.50124,6.543067 0.99166,4.110495 1.59422,9.313563 1.68052,14.971596 2.19901,-1.148891 ' +
            '4.57634,-2.065092 7.20409,-2.520499 3.49611,-0.413432 7.1643,0.669677 9.32608,2.819336 ' +
            '2.18404,1.7211 3.99427,3.965511 7.05066,4.836524 2.63862,0.438497 5.39951,0.24912 ' +
            '8.06534,0.03343 4.89897,-0.632573 9.64962,-1.772778 14.21711,-3.24991 0.0753,-0.192658 ' +
            '0.15379,-0.383594 0.22581,-0.578015 C 83.43316,12.103076 71.7934,3.152422 58.25634,2.227384 ' +
            'a 0.84468645,1.1473133 0 0 1 -0.0868,-0.01178 c -0.82877,-0.17453 -1.65398,-0.275132 ' +
            '-2.46506,-0.296875 -5.94334,-2.01e-4 -11.88772,-2e-5 -17.83145,0 z');
        this.componentBodyGradient.attr('stroke-width', 0);
        this.componentBodyGradient.attr('fill', '90-#0066ff-#fff');

        this.componentBodyShapeSmallCircleFill = this.paper.path('m 94.989561,20.447622 c 2.56339,1.77e-4 ' +
            '4.61988,2.031151 4.62007,4.56276 -1.9e-4,2.531598 -2.05668,4.562572 -4.62007,4.562759 ' +
            '-2.5634,-1.87e-4 -4.61989,-2.031161 -4.62008,-4.562759 1.9e-4,-2.531609 2.05668,-4.562583 ' +
            '4.62008,-4.56276 z');
        this.componentBodyShapeSmallCircleFill.attr('stroke-width', 1);
        this.componentBodyShapeSmallCircleFill.attr('stroke', DEFAULT_FILL_COLOR);
        this.componentBodyShapeSmallCircleFill.attr('fill', DEFAULT_FILL_COLOR);

        this.componentBodyShapeSmallCircleGradient = this.paper.path('m 94.989561,20.447622 c -2.1263,1.48e-4 ' +
            '-3.88416,1.406609 -4.42864,3.328018 3.39003,0.192324 6.60259,1.0941 8.83577,2.538937 ' +
            '0.12507,-0.415575 0.2129,-0.846935 0.21294,-1.304195 -1.9e-4,-2.531609 -2.05668,-4.562583 ' +
            '-4.62007,-4.56276 z');
        this.componentBodyShapeSmallCircleGradient.attr('stroke-width', 0);
        this.componentBodyShapeSmallCircleGradient.attr('fill', '90-#0066ff-#fff');

        this.componentRearShape = this.paper.path('m 26.653817,0.95557543 a 6.1130418,24.293471 0 0 ' +
            '1 5.312156,24.05583957 6.1130418,24.293471 0 0 1 -5.264382,24.03221 l 4.076678,0 ' +
            'A 6.1130418,24.293471 0 0 0 36.04265,25.011415 6.1130418,24.293471 0 0 0 30.730495,0.95557543 ' +
            'c -1.358901,1.311e-5 -2.717864,8.07e-6 -4.076678,0 z');
        this.componentRearShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentRearShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        this.componentRearShape.attr('stroke-linejoin', 'round');
        this.componentRearShape.attr('stroke-miterlimit', 4);

        this.componentRearShapeFill = this.paper.path('m 28.857204,2.3052176 c 0.556932,0 1.113836,4e-6 ' +
            '1.670765,0 1.082614,0.63879 2.38004,3.2125883 3.286465,7.2683448 0.925257,4.1400216 ' +
            '1.495739,9.6573496 1.497511,15.6394466 -0.0017,5.945897 -0.56635,11.435078 -1.482738,15.568555 ' +
            '-0.902355,4.070176 -2.19838,6.65789 -3.283778,7.313636 l -1.673451,0 c 0.944063,-1.622027 ' +
            '1.712818,-3.854298 2.322148,-6.602752 0.983473,-4.436074 1.557612,-10.122188 1.559292,-16.279439 ' +
            'a 0.7837526,1.1491468 0 0 0 0,-0.002 C 32.751583,19.017153 32.171453,13.303808 ' +
            '31.178009,8.858693 30.568285,6.1305068 29.798678,3.9138211 28.857204,2.3051702 Z');
        this.componentRearShapeFill.attr('stroke-width', 1);
        this.componentRearShapeFill.attr('stroke', DEFAULT_FILL_COLOR);
        this.componentRearShapeFill.attr('fill', DEFAULT_FILL_COLOR);

        this.componentRearShapeGradient = this.paper.path('m 28.890286,1.8988889 c 0.930247,1.6086509 ' +
            '1.690677,3.8253367 2.293131,6.5535229 0.673964,3.0520142 1.149273,6.7098672 1.385433,10.7026442 ' +
            '0.0074,-0.0045 0.02383,-0.01477 0.0292,-0.01772 0.306614,-0.162034 0.630581,-0.09389 ' +
            '0.947509,-0.06892 0.236802,0.01865 0.149154,0.04507 0.30522,-0.03545 0.07131,-0.02228 ' +
            '0.142888,-0.04113 0.213654,-0.06696 0.323177,-0.117963 0.166719,-0.110328 0.581245,-0.17526 ' +
            '0.105111,-0.01647 0.210619,-0.0068 0.315837,-0.02166 0.03479,-0.0049 0.06848,-0.02299 ' +
            '0.102182,-0.03742 C 34.823572,15.130848 34.382175,11.85609 33.788404,9.1672277 ' +
            '32.892787,5.1114712 31.610832,2.5376719 30.541128,1.8988819 l -1.650842,0 z');
        this.componentRearShapeGradient.attr('stroke-width', 0);
        this.componentRearShapeGradient.attr('fill', '90-#0066ff-#fff');
    }

    initControl() {
        super.initControl();

        const inputPin1 = new ConnectionPin(this, 5, 11, 'in');
        const inputPin2 = new ConnectionPin(this, 5, 39, 'in');
        const outputPin = new ConnectionPin(this, 124, 25, 'out');

        const _this = this;
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
            this.componentOutputWire,
            this.componentRearShape,
            this.componentRearShapeFill,
            this.componentRearShapeGradient,
            this.componentBodyShapeSmallCircleFill,
            this.componentBodyShapeSmallCircleGradient,
        ]);
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
     * Return the value of calculated expression.
     * @returns {boolean}
     */
    getValue() {
        return !((this.inputPin1Value + this.inputPin2Value) % 2);
    }
}
