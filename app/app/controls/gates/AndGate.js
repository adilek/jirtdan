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

        let componentBody = this.paper.path("m 144,3 0,158 71,0 c 39,0 71,-35 71,-79 0,-43 -31,-79 -70,-79 l -71,0 z M 28,22 l 112,0 -112,0 z m 260,60 113,0 -113,0 z M 28,143 141,143 28,143 Z");
        let componentPin1 = new ConnectionPin(this, 15, 23, "in");
        let componentPin2 = new ConnectionPin(this, 15, 143, "in");
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
