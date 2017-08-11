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


const LOGTAG = 'SwitchButton';
/**
 * Control for Switch Button.
 */
export class SwitchButton extends BaseControl {
    /**
     * Constructor for SwitchButton
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

        this.outputWire = this.paper.path('m 34.717802,23.591722 19.55419,0');
        this.outputWire.attr('stroke', DEFAULT_STROKE_COLOR);
        this.outputWire.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.componentBodyShape = this.paper.rect(0.86, 0.86, 33.3, 45.46);
        this.componentBodyShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentBodyShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
        this.componentBodyShape.attr('fill', DEFAULT_FILL_COLOR);
        this.componentBodyShape.attr('stroke-linejoin', 'round');

        this.componentBodyGradient = this.paper.path('m 1.7234929,1.7200376 0,10.6074104 c 1.526046,-0.868787 ' +
            '3.147822,-1.555409 4.90039,-1.941406 3.061362,-0.4600704 6.2750111,0.746512 8.1679691,3.138672 ' +
            '1.91245,1.915255 3.497508,4.411588 6.173828,5.38086 2.310502,0.487962 4.728173,0.277131 7.0625,0.03711 ' +
            '1.788763,-0.293529 3.547676,-0.705442 5.289063,-1.181641 l 0,-16.0410044 -31.5937501,0 z');
        this.componentBodyGradient.attr('stroke', 'none');
        this.componentBodyGradient.attr('fill', '90-#0066ff-#8fbcff');

        this.ledIndicator = this.paper.circle(29.25, 6.7, 2.1);
        this.ledIndicator.attr('stroke', DEFAULT_STROKE_COLOR);
        this.ledIndicator.attr('stroke-width', 0.25);
        this.ledIndicator.attr('fill', '#550000');

        this.bolt = this.paper.path('m 24.554026,35.776142 -14.06936,-10e-7 -7.0346795,-12.184423 ' +
            '7.0346805,-12.184423 14.06936,1e-6 7.034679,12.184423 z');
        this.bolt.attr('stroke', DEFAULT_STROKE_COLOR);
        this.bolt.attr('stroke-width', 0.31);
        this.bolt.attr('fill', '#aa4400');

        this.boltGradient = this.paper.path('M 10.62891,11.563893 4.3645788,22.37763 c 1.475504,-0.536312 ' +
            '3.0199229,-0.966523 4.6531707,-1.240309 4.0267525,-0.460619 8.2509535,0.745246 10.7408635,3.140201 ' +
            '2.512556,1.915218 4.597034,4.410767 8.10978,5.38364 l 3.552282,-6.132471 ' +
            '-6.930386,-11.964798 -13.861379,0 z');
        this.boltGradient.attr('stroke', 'none');
        this.boltGradient.attr('fill', '90-#aa4400-#fff');

        this.knobBottom = this.paper.circle(17.5, 23.5, 9.78);
        this.knobBottom.attr('stroke', DEFAULT_STROKE_COLOR);
        this.knobBottom.attr('stroke-width', 0.5);
        this.knobBottom.attr('fill', 'r#ffffff-#808080');

        this.offTextOLetter = this.paper.path('m 12.522397,38.532558 q -0.644531,0 -0.999756,0.476074 ' +
            '-0.355224,0.476074 -0.355224,1.340332 0,0.860596 0.355224,1.33667 0.355225,0.476075 ' +
            '0.999756,0.476075 0.648194,0 1.003419,-0.476075 0.355224,-0.476074 0.355224,-1.33667 ' +
            '0,-0.864258 -0.355224,-1.340332 -0.355225,-0.476074 -1.003419,-0.476074 z m 0,-1.021729 ' +
            'q 1.31836,0 2.06543,0.754395 0.747071,0.754394 0.747071,2.08374 0,1.325684 -0.747071,2.080079 ' +
            '-0.74707,0.754394 -2.06543,0.754394 -1.314697,0 -2.06543,-0.754394 -0.7470699,-0.754395 ' +
            '-0.7470699,-2.080079 0,-1.329346 0.7470699,-2.08374 0.750733,-0.754395 2.06543,-0.754395 z');
        this.offTextOLetter.attr('stroke', 'none');
        this.offTextOLetter.attr('fill', '#ffffff');

        this.offTextFLetter1 = this.paper.path('m 16.39691,37.609706 3.804932,0 0,1.065674 -2.39502,0 ' +
            '0,1.018067 2.252198,0 0,1.065674 -2.252198,0 0,2.318115 -1.409912,0 0,-5.46753 z');
        this.offTextFLetter1.attr('stroke', 'none');
        this.offTextFLetter1.attr('fill', '#ffffff');

        this.offTextFLetter2 = this.paper.path('m 21.523864,37.609706 3.804932,0 0,1.065674 -2.39502,0 ' +
            '0,1.018067 2.252198,0 0,1.065674 -2.252198,0 0,2.318115 -1.409912,0 0,-5.46753 z');
        this.offTextFLetter2.attr('stroke', 'none');
        this.offTextFLetter2.attr('fill', '#ffffff');

        this.onTextOLetter = this.paper.path('m 14.53839,5.0217298 q -0.644532,0 -0.999756,0.4760743 ' +
            '-0.355225,0.4760743 -0.355225,1.3403322 0,0.8605958 0.355225,1.3366701 0.355224,0.4760743 ' +
            '0.999756,0.4760743 0.648193,0 1.003418,-0.4760743 0.355224,-0.4760743 0.355224,-1.3366701 ' +
            '0,-0.8642579 -0.355224,-1.3403322 Q 15.186583,5.0217298 14.53839,5.0217298 Z m 0,-1.0217286 ' +
            'q 1.318359,0 2.06543,0.7543946 0.74707,0.7543947 0.74707,2.0837405 0,1.3256838 ' +
            '-0.74707,2.0800784 -0.747071,0.7543946 -2.06543,0.7543946 -1.314698,0 -2.06543,-0.7543946 ' +
            '-0.747071,-0.7543946 -0.747071,-2.0800784 0,-1.3293458 0.747071,-2.0837405 0.750732,-0.7543946 ' +
            '2.06543,-0.7543946 z');
        this.onTextOLetter.attr('stroke', 'none');
        this.onTextOLetter.attr('fill', '#ffffff');

        this.onTextNLetter = this.paper.path('m 18.412902,4.0988782 1.574707,0 1.988526,3.7500004 0,-3.7500004 ' +
            '1.33667,0 0,5.46753 -1.574707,0 -1.988526,-3.7500005 0,3.7500005 -1.33667,0 0,-5.46753 z');
        this.onTextNLetter.attr('stroke', 'none');
        this.onTextNLetter.attr('fill', '#ffffff');

        this.knobHandleOff = this.paper.path('m 17.51935,48.480417 c -2.53066,0 -4.593627,-1.800469 ' +
            '-4.593627,-4.009132 0,-0.289217 0.03763,-0.570999 0.104804,-0.843034 l -0.01514,-9.3e-4 ' +
            '1.481119,-18.622949 0.02398,0 c 0.164708,-1.323393 1.439691,-2.361615 2.998862,-2.361615 ' +
            '1.67027,0 3.031696,1.187092 3.031696,2.644832 0,0.0215 -0.007,0.0414 -0.0076,0.06279 l ' +
            '1.449584,18.222916 c 0.07635,0.289114 0.119951,0.589189 0.119951,0.898146 -7e-6,2.208654 ' +
            '-2.062967,4.009132 -4.593628,4.009132 z');
        this.knobHandleOff.attr('stroke', DEFAULT_STROKE_COLOR);
        this.knobHandleOff.attr('stroke-width', 0.5);
        this.knobHandleOff.attr('fill', '0-#ffffff-#808080');

        this.knobHandleOn = this.paper.path('m 17.519352,-1.3570893 c 2.53066,0 4.593627,1.80046934 ' +
            '4.593627,4.0091327 0,0.289217 -0.03763,0.570999 -0.104804,0.843034 l 0.01514,9.3e-4 ' +
            '-1.481119,18.6229506 -0.02398,0 c -0.164708,1.323393 -1.439691,2.361615 -2.998862,2.361615 ' +
            '-1.67027,0 -3.031696,-1.187092 -3.031696,-2.644832 0,-0.0215 0.007,-0.0414 0.0076,-0.06279 ' +
            'L 13.045674,3.5500334 c -0.07635,-0.289114 -0.119951,-0.589189 -0.119951,-0.898146 ' +
            '7e-6,-2.20865436 2.062967,-4.0091327 4.593628,-4.0091327 z');
        this.knobHandleOn.attr('stroke', DEFAULT_STROKE_COLOR);
        this.knobHandleOn.attr('stroke-width', 0.5);
        this.knobHandleOn.attr('fill', '0-#808080-#ffffff');
        this.knobHandleOn.hide();
    }

    /**
     * Initialize the control. Add the pin and set up the component.
     */
    initControl() {
        super.initControl();

        const outputPin = new ConnectionPin(this, 59, 23, 'out');
        this.value = 0;
        this.setShapes([
            this.componentBodyShape,
            this.componentBodyGradient,
            this.outputWire,
            this.bolt,
            this.boltGradient,
            this.offTextOLetter,
            this.offTextFLetter1,
            this.offTextFLetter2,
            this.onTextOLetter,
            this.onTextNLetter,
            this.ledIndicator,
            this.knobBottom,
            this.knobHandleOff,
            this.knobHandleOn,
        ]);
        this.addOutputPins(outputPin);

        const _this = this;
        const clickAction = function() {
            if (!_this.__isMouseDownActionPerformed) return;
            _this.value = !_this.value;
            if (_this.value == 0) {
                _this.ledIndicator.attr('stroke', DEFAULT_STROKE_COLOR);
                _this.ledIndicator.attr('fill', '#550000');
                _this.knobHandleOff.show();
                _this.knobHandleOn.hide();
            } else {
                _this.ledIndicator.attr('fill', '#ff0000');
                _this.ledIndicator.attr('stroke', '#800000');
                _this.knobHandleOff.hide();
                _this.knobHandleOn.show();
            }
            outputPin.notifyStateChange(_this.getValue());
        };

        const mouseDown = function() {
            _this.__isMouseDownActionPerformed = true;
        };
        this.knobBottom.mousedown(mouseDown);
        this.knobHandleOff.mousedown(mouseDown);
        this.knobHandleOn.mousedown(mouseDown);
        this.knobBottom.mouseup(clickAction);
        this.knobHandleOff.mouseup(clickAction);
        this.knobHandleOn.mouseup(clickAction);
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
     * Get the value of expression.
     * @returns {number|boolean|*}
     */
    getValue() {
        return this.value;
    }
}
