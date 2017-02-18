/**
 * Created by adil on 17. 2. 18.
 */

"use strict";
/*jshint esversion: 6*/

/**
 * Control for AND gate.
 *
 * Truth table:
 * |In1|In2|Out|
 * |0  |0  |0  |
 * |0  |1  |0  |
 * |1  |0  |0  |
 * |1  |1  |1  |
 */
class AndGate extends BaseControl {
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        var componentBody = this.paper.path("m 144.5892,3.7499993 0,158.5000007 71.29883,0 c 39.3576,0 71.30079,-35.50398 71.30079,-79.250001 0,-43.746016 -31.94225,-79.2500247 -70.83985,-79.2499997 l -71.75977,0 z M 28.677094,22.999999 l 112.999996,0 -112.999996,0 z m 260.210936,60 113,0 -113,0 z M 28.677094,143 141.67709,143 28.677094,143 Z");
        var componentPin1 = this.paper.circle(15, 23.000004, 12.062335);
        var componentPin2 = this.paper.circle(15, 143.00003, 12.062335);
        var componentPin3 = this.paper.circle(415, 83, 12.062335);

        this.setShapes([componentBody, componentPin1, componentPin2, componentPin3]);
        this.addInputPins(componentPin1, componentPin2);
        this.addOutputPins(componentPin3);
    }
}
