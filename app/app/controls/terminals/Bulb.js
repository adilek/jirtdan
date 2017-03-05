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

        this.componentBody = this.paper.path("m 198,3 0,159 -122,0 0,-159 122,0 z M 74,83 l -49,0 49,0 z");

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
            this.componentBody.attr("fill", DEFAULT_SIGNAL_PRESENCE_COLOR);
        } else {
            this.componentBody.attr("fill", DEFAULT_FILL_COLOR);
        }
    }
}
