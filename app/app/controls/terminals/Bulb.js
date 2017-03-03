/**
 * Created by adil on 17. 2. 18.
 */

"use strict";
/*jshint esversion: 6*/


/**
 * Control for High Constant (1).
 */
//TODO: Remove the direct dependency from raphael.
class Bulb extends BaseControl {
    /**
     * Constructor for Bulb
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        this.componentBody = this.paper.path("m 198.231,3.4333413 0,159.6333587 -122.986417,0 0,-159.6333587 122.986417,0 z M 74.386833,83.250031 l -49.87061,0 49.87061,0 z");

        let inputPin = new ConnectionPin(this, 20, 83, "in");

        this.setShapes([this.componentBody]);
        this.addOutputPins(inputPin);
        this.setState(POWER_STATE_LOW);
        let _this = this;

        // Bulb will turn on/off depending on pin value.
        inputPin.addStateChangeListener(
            function (newState) {
                _this.setState(newState);
            });
    }

    setState(state) {
        if (state == POWER_STATE_HIGH) {
            this.componentBody.attr("fill", "#fa0");
        } else {
            this.componentBody.attr("fill", DEFAULT_FILL_COLOR);
        }
    }
}
