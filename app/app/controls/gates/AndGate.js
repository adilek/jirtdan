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
//TODO: Remove the direct dependency from raphael.
class AndGate extends BaseControl {
    /**
     * Constructor for AndGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.pin1Value = 0;
        this.pin2Value = 0;
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 144.5892,3.7499993 0,158.5000007 71.29883,0 c 39.3576,0 71.30079,-35.50398 71.30079,-79.250001 0,-43.746016 -31.94225,-79.2500247 -70.83985,-79.2499997 l -71.75977,0 z M 28.677094,22.999999 l 112.999996,0 -112.999996,0 z m 260.210936,60 113,0 -113,0 z M 28.677094,143 141.67709,143 28.677094,143 Z");
        let componentPin1 = new ConnectionPin(this, 15, 23.000004, "in");
        let componentPin2 = new ConnectionPin(this, 15, 143.00003, "in");
        let componentPin3 = new ConnectionPin(this, 415, 83, "out");
        let _this = this;
        componentPin1.addStateChangeListener(
            function (newState) {
                _this.pin1Value = newState;
                componentPin3.notifyStateChange(_this.getValue());

            });

        componentPin2.addStateChangeListener(
            function (newState) {
                _this.pin2Value = newState;
                componentPin3.notifyStateChange(_this.getValue());
            });

        this.setShapes([componentBody]);
        this.addInputPins(componentPin1, componentPin2);
        this.addOutputPins(componentPin3);
    }



    getValue() {
        return this.pin1Value & this.pin2Value;
    }
}
