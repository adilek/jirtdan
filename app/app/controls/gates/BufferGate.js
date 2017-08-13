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
    DEFAULT_STROKE_WIDTH,
    DEFAULT_STROKE_COLOR,
    DEFAULT_FILL_COLOR,
    DEBUG,
} from '../BaseControl.js';
import {ConnectionPin} from '../ConnectionPin.js';

const LOGTAG = 'BufferGate';

/**
 * Control for Buffer gate.
 *
 * Truth table:
 * |In1|Out|
 * |0  |0  |
 * |1  |1  |
 */
export class BufferGate extends BaseControl {
    /**
     * Constructor for NotGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.inputPin1Value = 0;
    }

    /**
     * Draw the component surface
     */
    draw() {
        super.draw();

        this.componentBodyShape = this.paper.path('m 30.402093,0.99310903 0,48.01216997 ' +
            'L 78.706762,24.999194 30.402093,0.99310903 Z');
        this.componentBodyShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentBodyShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        this.componentBodyShape.attr('stroke-linejoin', 'round');
        this.componentBodyShape.attr('stroke-miterlimit', 4);

        this.componentBodyShapeFill = this.paper.path('M 30.561946,1.9908772 76.707033,24.924195 ' +
            '30.561946,47.85626 l 0,-45.8653828 z');
        this.componentBodyShapeFill.attr('stroke-width', 1);
        this.componentBodyShapeFill.attr('stroke', DEFAULT_FILL_COLOR);
        this.componentBodyShapeFill.attr('fill', DEFAULT_FILL_COLOR);

        this.componentBodyShapeGradient = this.paper.path('m 30.561946,1.9908772 0,19.4008788 ' +
            'c 1.331848,-0.311925 2.699954,-0.582136 4.135594,-0.762063 4.743957,-0.405697 9.71957,0.65715 ' +
            '12.652942,2.766593 2.963578,1.6889 5.421043,3.891324 9.56834,4.746042 3.580402,0.430283 ' +
            '7.326277,0.244459 10.943607,0.0328 0.883108,-0.08248 1.753554,-0.195534 2.62944,-0.295183 ' +
            'L 76.707963,24.791159 30.82957,1.9908772 c -0.08922,0 -0.178416,0 -0.267624,0 z');
        this.componentBodyShapeGradient.attr('stroke-width', 0);
        this.componentBodyShapeGradient.attr('fill', '90-#0066ff-#fff');

        this.componentOutputWire = this.paper.path('m 75.907772,24.999597 19.554188,0');
        this.componentOutputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentOutputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentInputWire = this.paper.path('m 10.907768,24.999597 19.554188,0');
        this.componentInputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentInputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.inputPin = new ConnectionPin(this, 5, 25, 'in');
        this.outputPin = new ConnectionPin(this, 101, 25, 'out');
    }

    /**
     * Initialize the component.
     */
    initControl() {
        super.initControl();

        const _this = this;

        this.inputPin.addStateChangeListener(
            function(newState) {
                _this.inputPin1Value = newState;
                _this.outputPin.notifyStateChange(_this.getValue());
            });

        this.setShapes([
            this.componentBodyShape,
            this.componentBodyShapeFill,
            this.componentBodyShapeGradient,
            this.componentOutputWire,
            this.componentInputWire,
        ]);
        this.addInputPins(this.inputPin);
        this.addOutputPins(this.outputPin);
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
     * Get the value of the control.
     * @returns {boolean}
     */
    getValue() {
        return this.inputPin1Value;
    }
}
