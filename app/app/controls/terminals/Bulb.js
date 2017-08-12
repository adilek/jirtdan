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
    POWER_STATE_LOW,
    POWER_STATE_HIGH,
    DEFAULT_FILL_COLOR,
    DEFAULT_SIGNAL_PRESENCE_COLOR,
    DEFAULT_STROKE_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEBUG,
    BaseControl,
} from '../BaseControl.js';
import {ConnectionPin} from '../ConnectionPin.js';

const LOGTAG = 'Bulb';
/**
 * Control for High Constant (1).
 */
export class Bulb extends BaseControl {
    /**
     * Constructor for Bulb
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

        this.componentShapeFill = this.paper.path('m 25.21556,2.00045 c 12.82641,-7.7e-4 23.20218,10.37241 ' +
            '23.20898,23.19727 -0.0299,1.61391 -1.15221,4.61611 -2.83984,7.98242 -1.68915,3.36933 ' +
            '-3.89985,7.17259 -5.9707,10.7832 -2.07086,3.61061 -4.00014,7.017 -5.14844,9.68945 ' +
            '-0.57415,1.33623 -0.96546,2.47318 -1.05078,3.49219 -0.0427,0.50951 -0.0137,1.01285 ' +
            '0.21484,1.49805 0.095,0.20171 0.34709,0.27143 0.51563,0.43359 l 0,13.59571 c ' +
            '-3.26086,3.07199 -6.38495,4.84688 -9.25196,4.99414 -2.88619,0.14824 -5.70252,-1.22618 ' +
            '-8.60546,-4.78711 l 0,-13.74805 c 0.12936,-0.11614 0.33858,-0.11256 0.41406,-0.26172 ' +
            '0.24581,-0.48574 0.22058,-0.94196 0.15234,-1.38476 C 16.71776,56.59922 16.30837,55.6206 ' +
            '15.72728,54.41842 14.5651,52.01406 12.67123,48.82231 10.6472,45.3149 8.62317,41.8075 ' +
            '6.47383,37.99467 4.82689,34.43404 3.1815,30.87679 2.0642,27.54941 2.00853,25.19381 ' +
            '2.01753,12.37152 12.39122,2.00072 25.21556,2.00045 Z');
        this.componentShapeFill.attr('stroke-width', 1);
        this.componentShapeFill.attr('stroke', DEFAULT_FILL_COLOR);
        this.componentShapeFill.attr('fill', DEFAULT_FILL_COLOR);


        this.componentShapeGradient = this.paper.path('M 21.7944,2.07947 C 10.51582,3.66015 1.85145,13.3257 ' +
            '1.84323,25.04236 c 0.0134,0.56551 0.0904,1.19016 0.21875,1.85742 2.49653,-1.72421 5.2378,-3.13438 ' +
            '8.3457,-3.75976 3.29745,-0.45274 6.75793,0.73186 8.79688,3.08593 2.05993,1.88476 3.76767,4.34499 ' +
            '6.65039,5.29883 2.48868,0.48019 5.09307,0.27134 7.60742,0.0352 4.91719,-0.73719 9.67369,-2.10751 ' +
            '14.23437,-3.87891 0.34531,-1.06241 0.5502,-1.97088 0.5625,-2.63476 C 48.25324,13.58065 ' +
            '39.95777,4.08036 29.03463,2.19474 28.42796,2.13224 27.82269,2.0926 27.22213,2.07951 ' +
            'c -1.80916,-5e-5 -3.61854,1e-5 -5.42773,0 z');
        this.componentShapeGradient.attr('stroke-width', 0);
        this.componentShapeGradient.attr('fill', '90-#0066ff-#fff');


        this.bulbInnerPart1 = this.paper.path('m 23.10966,34.83956 c -0.0653,2.18967 0.0473,4.38015 ' +
            '-0.0302,6.56971 -0.40779,1.44662 -3.17396,0.48015 -3.53144,1.81878 -0.27053,1.54518 ' +
            '0.33086,3.08622 0.47825,4.62594 0.7295,0.87673 1.77243,-1.72986 0.6958,-2.34218 ' +
            '-1.08218,-1.17844 -0.27126,-2.66729 1.62412,-2.6615 1.61183,-0.5564 3.41547,-0.26117 ' +
            '4.99372,0.19812 1.89664,0.6444 1.45032,2.46049 1.39522,3.75873 -0.28368,0.90763 ' +
            '1.7035,1.92203 1.02864,0.4171 -0.18643,-1.50302 0.53608,-3.01986 0.28386,-4.54235 ' +
            '-0.91699,-0.83036 -3.15999,0.31196 -3.43255,-1.19806 -0.16742,-1.32524 0.0529,-2.66885 ' +
            '-0.0476,-4.0031 -0.1338,-0.82709 0.17102,-2.41137 -0.3881,-2.76485 -1.03412,0.92352 ' +
            '-0.42751,2.34091 -0.77332,3.46783 -0.24924,0.83662 0.21667,2.42483 -0.67259,2.77519 ' +
            '-0.84475,-1.19561 -0.6725,-2.78072 -1.05563,-4.14079 -0.12038,-0.66993 -0.2759,-1.34056 ' +
            '-0.56825,-1.97857 z');
        this.bulbInnerPart1.attr('stroke-width', 0);
        this.bulbInnerPart1.attr('fill', '#666666');

        this.bulbSpiral = this.paper.path('m 13.8778,28.17077 c 0.61669,-0.18899 1.20741,-0.54619 ' +
            '1.84791,-0.58243 1.4492,-0.082 2.92405,0.39803 4.35286,0.15038 0,0 2.61253,-0.80616 ' +
            '3.9396,-0.68286 1.10957,0.10308 2.1437,1.3908 3.13237,1.168 0.98772,-0.22259 1.96439,-0.8267 ' +
            '2.96242,-0.68412 0,0 2.72353,0.9063 4.04559,0.57794 0.2336,-0.058 0.584,-0.42473 0.584,-0.42473');
        this.bulbSpiral.attr('stroke', '#000000');
        this.bulbSpiral.attr('stroke-width', 0.5);
        this.bulbSpiral.attr('stroke-linecap', 'round');
        this.bulbSpiral.attr('stroke-linejoin', 'round');


        this.bulbInnerPart2 = this.paper.path('m 27.01721,35.14805 c 0,0 1.01234,-2.83148 1.80509,-4.40656 ' +
            '0.48973,-0.97304 1.23235,-2.10622 1.38036,-3.18545 0.0731,-0.53324 -0.10417,-0.66779 ' +
            '-0.63709,-0.74328 -0.48337,-0.0685 -0.53717,0.14894 -0.53091,0.63709 0.007,0.55056 ' +
            '0.0358,0.9543 0.584,0.90256 0.53266,-0.0503 0.75831,-0.81206 0.90255,-1.32728 0.18631,-0.6655 ' +
            '-0.10618,-2.07055 -0.10618,-2.07055');
        this.bulbInnerPart2.attr('stroke', '#808080');
        this.bulbInnerPart2.attr('stroke-width', 0.5);
        this.bulbInnerPart2.attr('stroke-linecap', 'round');

        this.bulbInnerPart3 = this.paper.path('m 22.71627,35.16159 c 0,0 -1.01234,-2.83148 -1.80509,-4.40656 ' +
            '-0.48973,-0.97304 -1.23235,-2.10622 -1.38036,-3.18545 -0.0731,-0.53324 0.10417,-0.66779 ' +
            '0.63709,-0.74328 0.48337,-0.0685 0.53717,0.14894 0.53091,0.63709 -0.007,0.55056 -0.0358,0.9543 ' +
            '-0.584,0.90256 -0.53266,-0.0503 -0.75831,-0.81206 -0.90255,-1.32728 -0.18631,-0.6655 0.10618,-2.07055 ' +
            '0.10618,-2.07055');
        this.bulbInnerPart3.attr('stroke', '#808080');
        this.bulbInnerPart3.attr('stroke-width', 0.5);
        this.bulbInnerPart3.attr('stroke-linecap', 'round');

        this.bulbInnerPart4 = this.paper.path('m 24.78864,44.53865 0,16.06754');
        this.bulbInnerPart4.attr('fill', '#cccccc');
        this.bulbInnerPart4.attr('stroke', '#cccccc');
        this.bulbInnerPart4.attr('stroke-width', 2.5);
        this.bulbInnerPart4.attr('stroke-linecap', 'round');

        this.bulbInnerPart5 = this.paper.path('m 23.73119,44.67924 c -0.98778,0.11537 -1.18251,1.13597 ' +
            '-2.13287,1.31005 -0.74122,0.43808 -1.30856,1.03434 -1.86349,1.60933 -0.54595,0.92317 -0.27838,1.96787 ' +
            '-0.35801,2.94956 -0.0192,2.35517 -0.16739,4.72432 0.2466,7.06529 0.60658,0.75137 1.70641,-0.22441 ' +
            '1.26739,-0.83104 0.13977,-2.63 -0.24257,-5.29486 0.39815,-7.89601 0.16968,-0.60061 0.46316,-1.506 ' +
            '1.44154,-1.4753 0.7334,0.0522 1.29972,0.70898 2.07968,0.4773 0.59115,-0.27059 1.16761,-0.86178 ' +
            '1.92678,-0.63446 1.07629,0.56582 1.28446,1.66768 1.49984,2.59859 0.5948,2.6222 0.4145,5.29939 ' +
            '0.67149,7.94569 0.77239,0.51922 1.41682,-0.50904 1.06713,-1.02062 -0.0565,-2.82676 -0.0163,-5.65588 ' +
            '-0.15877,-8.48088 -0.0519,-0.57315 -0.30138,-1.20018 -0.96049,-1.51155 -0.46755,-0.61941 ' +
            '-1.28563,-0.99846 -2.16528,-1.12766 -1.00488,-0.28636 -1.87039,-0.89034 -2.95969,-0.97829 z');
        this.bulbInnerPart5.attr('fill', '#666666');
        this.bulbInnerPart5.attr('stroke-width', 0);

        this.bulbInnerPart6 = this.paper.path('m 26.55689,34.64761 c 0.60212,0.0163 1.22169,0.0792 ' +
            '1.77304,0.28478 0.014,0.69768 -0.99538,0.72926 -1.55416,0.83989 -0.9221,0.59112 -2.3681,0.20304 ' +
            '-3.34842,0.10864 -0.35807,-0.0246 -0.71792,-0.0448 -1.06795,-0.11401 -0.35561,-0.0477 ' +
            '-0.73995,-0.2469 -0.78021,-0.56372 0.0143,-0.27866 0.38712,-0.4009 0.68167,-0.40856 ' +
            '0.41875,-0.0202 0.83866,0.0132 1.25736,-0.0174 1.05936,-0.0485 2.13381,-0.0956 3.03867,-0.12958 z');
        this.bulbInnerPart6.attr('fill', '#4d4d4d');
        this.bulbInnerPart6.attr('stroke-width', 0);

        this.bulbInnerPart7 = this.paper.path('m 13.89602,26.34147 c 3.85226,5.05426 6.20565,11.2366 ' +
            '6.68946,17.57311 0.0513,0.67167 0.082,1.34884 0,2.01746 -0.0899,0.73307 -0.30613,1.44383 ' +
            '-0.46961,2.16407 -0.16348,0.72024 -0.25987,1.45387 -0.32675,2.18939 l -0.0531,0.584 0,0 0,0 ' +
            '0,0.584 0,0');
        this.bulbInnerPart7.attr('stroke', '#000');
        this.bulbInnerPart7.attr('stroke-width', 0.3);

        this.bulbInnerPart8 = this.paper.path('m 34.21164,27.14539 c -2.23318,5.28191 -3.80656,10.84238 ' +
            '-4.67201,16.51129 -0.11013,0.72135 -0.20904,1.44703 -0.21236,2.17673 -0.002,0.54986 ' +
            '0.0489,1.10549 -0.0531,1.64582 -0.0452,0.23917 -0.11983,0.47175 -0.17267,0.70934 ' +
            '-0.0528,0.23758 -0.0837,0.48473 -0.0397,0.72412 0.0589,0.32095 0.24613,0.60133 0.37163,0.90255 ' +
            '0.16992,0.40785 0.22632,0.86231 0.16123,1.29932 -0.0651,0.43701 -0.25146,0.85532 ' +
            '-0.53286,1.19595 l 0,0 0,0.10618 0,0 0,0');
        this.bulbInnerPart8.attr('stroke', '#000');
        this.bulbInnerPart8.attr('stroke-width', 0.3);

        this.componentShape = this.paper.path('M 25.20898,1 C 11.83885,1.00028 1.00028,11.83885 1,25.20898 ' +
            '1.24025,35.748 19.39912,58.44727 15.28125,58.72461 l 0,14.54101 c 6.21053,7.84527 ' +
            '12.92183,6.59002 19.85742,-0.10937 l 0,-14.43164 C 30.46352,57.38934 49.28137,33.1955 ' +
            '49.41992,25.20898 49.41964,11.83808 38.57988,0.9992 25.20898,1 Z');
        this.componentShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.componentShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);

        this.bulbBottomShape = this.paper.path('m 16.79476,58.08869 16.74804,0 c 0.0303,0.15287 -0.0175,0.31131 ' +
            '0.0449,0.46289 0.0919,0.22325 0.36935,0.3081 0.55078,0.49024 l 0,13.63086 c -3.26086,3.07199 ' +
            '-6.38495,4.84688 -9.25196,4.99414 -2.88619,0.14824 -5.70252,-1.22618 -8.60546,-4.78711 l ' +
            '0,-13.50586 c 0.003,-0.003 0.008,-10e-4 0.0117,-0.004 0.28462,-0.23031 0.46077,-0.56196 ' +
            '0.53516,-0.86133 0.0368,-0.14814 -0.041,-0.2796 -0.0332,-0.41992 z');
        this.bulbBottomShape.attr('stroke', DEFAULT_STROKE_COLOR);
        this.bulbBottomShape.attr('fill', DEFAULT_STROKE_COLOR);
        this.bulbBottomShape.attr('stroke-width', DEFAULT_STROKE_WIDTH);
    }

    /**
     * Initialize the control.
     */
    initControl() {
        super.initControl();
        this.bulbFill = this.componentShapeFill;
        this.bulbFillGradient = this.componentShapeGradient;

        const inputPin = new ConnectionPin(this, 25, 85, 'in');

        this.setShapes([
            this.componentShapeFill,
            this.componentShapeGradient,
            this.bulbInnerPart1,
            this.bulbSpiral,
            this.bulbInnerPart2,
            this.bulbInnerPart3,
            this.bulbInnerPart4,
            this.bulbInnerPart5,
            this.bulbInnerPart6,
            this.bulbInnerPart7,
            this.bulbInnerPart8,
            this.componentShape,
            this.bulbBottomShape,

        ]);
        this.addOutputPins(inputPin);
        this.setState(POWER_STATE_LOW);
        const _this = this;

        // Bulb will turn on/off depending on pin value.
        inputPin.addStateChangeListener(
            function(newState) {
                _this.setState(newState);
            });
    }

    /**
     * An event fired when element is selected.
     * @param event
     */
    onSelect(event) {
        super.onSelect(event);
        this.glow = this.componentShapeFill.glow();
        this.glow.toBack();
    }

    /**
     * Change the binary state(LOW/HIGH) of the component.
     * @param state
     */
    setState(state) {
        if (state == POWER_STATE_HIGH) {
            this.bulbSpiral.attr('stroke', '#fff');
            this.bulbSpiral.attr('stroke-width', 2);
            this.changeGradient(this.bulbFillGradient, '90-#ff9955-#fff');
            this.bulbFill.attr('fill', '#ff6600');
        } else {
            this.bulbSpiral.attr('stroke', '#000');
            this.bulbSpiral.attr('stroke-width', 0.5);
            this.changeGradient(this.bulbFillGradient, '90-#0066ff-#fff');
            this.bulbFill.attr('fill', DEFAULT_FILL_COLOR);
        }
    }
}
