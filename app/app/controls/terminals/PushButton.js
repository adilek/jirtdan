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

const LOGTAG = 'PushButton';
/**
 * Control for Push Button.
 */
export class PushButton extends BaseControl {
    /**
     * Constructor for PushButton
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    /**
     * Draw the component surface
     */
    draw() {
        super.draw();
        this.componentBodyShape = this.paper.rect(1, 1, 45.183437, 45.183437);
        this.componentBodyShape.attr('fill', DEFAULT_FILL_COLOR);
        this.componentBodyShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentBodyShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.fillGradient = this.paper.path('m 1.9885,2.1222325 0,18.3451895 c 2.38846,-1.62726 ' +
            '4.94603,-2.93244 7.75586,-3.60465 4.13269,-0.67466 8.468022,1.0912 11.023432,4.59905 ' +
            '2.58172,2.80852 4.72301,6.47002 8.33594,7.89135 3.11906,0.71555 6.38197,0.40939 ' +
            '9.5332,0.0574 2.20797,-0.39356 4.38045,-0.94273 6.53516,-1.5617 l 0,-25.7266095 -43.183592,0 z');
        this.fillGradient.attr('fill', '90-#0066ff-#fff');
        this.fillGradient.attr('stroke', 'none');

        this.dotKnob1 = this.paper.circle(8.6, 38.5, 4);
        this.dotKnob1.attr('stroke-width', 1);
        this.dotKnob1.attr('stroke', DEFAULT_STROKE_COLOR);
        this.dotKnob1.attr('fill', '#333333');

        this.dotKnob2 = this.paper.circle(8.6, 8.6, 4);
        this.dotKnob2.attr('stroke-width', 1);
        this.dotKnob2.attr('stroke', DEFAULT_STROKE_COLOR);
        this.dotKnob2.attr('fill', '#333333');

        this.dotKnob3 = this.paper.circle(38.5, 38.5, 4);
        this.dotKnob3.attr('stroke-width', 1);
        this.dotKnob3.attr('stroke', DEFAULT_STROKE_COLOR);
        this.dotKnob3.attr('fill', '#333333');

        this.dotKnob4 = this.paper.circle(38.5, 8.6, 4);
        this.dotKnob4.attr('stroke-width', 1);
        this.dotKnob4.attr('stroke', DEFAULT_STROKE_COLOR);
        this.dotKnob4.attr('fill', '#333333');

        this.buttonShape = this.paper.circle(23.591736, 23.591736, 11.311212);
        this.buttonShape.attr('fill', '#aa4400');
        this.buttonShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.buttonShape.attr('stroke-width', 2.5);

        this.buttonGradient = this.paper.path('m 23.603052,12.644222 a 10.870626,10.870626 0 0 0 -8.887832,4.62129 ' +
            'c 2.417812,0.63102 4.632332,2.08698 6.173622,4.20272 2.48115,2.69912 4.53904,6.21731 8.01124,7.58328 ' +
            '1.24553,0.28574 2.51599,0.3971 3.79164,0.41107 a 10.870626,10.870626 0 0 0 1.78132,-5.94837 ' +
            '10.870626,10.870626 0 0 0 -10.86999,-10.86999 z');
        this.buttonGradient.attr('fill', '90-#aa4400-#fff');
        this.buttonGradient.attr('stroke', '#aa4400');
        this.buttonGradient.attr('stroke-width', 1);

        this.buttonLedIndicator = this.paper.circle(23.591724, 6.2949352, 2.1710765);
        this.buttonLedIndicator.attr('fill', '#550000');
        this.buttonLedIndicator.attr('stroke', DEFAULT_STROKE_COLOR);
        this.buttonLedIndicator.attr('stroke-width', 0.24772592);

        this.outputWire = this.paper.path('m 46.106981,23.591722 19.55419,0');
        this.outputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        this.outputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);
    }

    /**
     * Initialize the control. Basically add the connection pins and set up component itself.
     */
    initControl() {
        super.initControl();

        const outputPin = new ConnectionPin(this, 71, 24, 'out');
        this.value = 0;
        this.setShapes([
            this.componentBodyShape,
            this.fillGradient,
            this.outputWire,
            this.buttonShape,
            this.buttonGradient,
            this.buttonLedIndicator,
            this.dotKnob1,
            this.dotKnob2,
            this.dotKnob3,
            this.dotKnob4,
        ]);
        this.addOutputPins(outputPin);

        const _this = this;
        const mouseDown = function() {
            _this.value = 1;

            _this.buttonShape.attr('fill', '#803300');
            _this.buttonShape.attr('stroke', DEFAULT_STROKE_COLOR);
            _this.buttonShape.attr('stroke-width', 1);

            _this.changeGradient(_this.buttonGradient, '90-#803300-#e9c6af');
            _this.buttonGradient.attr('stroke', '#803300');
            _this.buttonGradient.attr('stroke-width', 1);

            _this.buttonLedIndicator.attr('fill', '#ff0000');
            _this.buttonLedIndicator.attr('stroke', '#800000');


            outputPin.notifyStateChange(_this.getValue());
        };
        const mouseUp = function() {
            _this.value = 0;
            _this.buttonShape.attr('fill', '#aa4400');
            _this.buttonShape.attr('stroke', DEFAULT_STROKE_COLOR);
            _this.buttonShape.attr('stroke-width', 2.5);

            _this.changeGradient(_this.buttonGradient, '90-#aa4400-#fff');
            _this.buttonGradient.attr('stroke', '#aa4400');
            _this.buttonGradient.attr('stroke-width', 1);

            _this.buttonLedIndicator.attr('fill', '#550000');
            _this.buttonLedIndicator.attr('stroke', DEFAULT_STROKE_COLOR);

            outputPin.notifyStateChange(_this.getValue());
        };

        _this.buttonShape.mousedown(mouseDown);
        _this.buttonShape.mouseup(mouseUp);
        _this.buttonGradient.mousedown(mouseDown);
        _this.buttonGradient.mouseup(mouseUp);
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
     * Get the value of the component.
     * @returns {number}
     */
    getValue() {
        return this.value;
    }
}
