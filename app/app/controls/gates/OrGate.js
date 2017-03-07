"use strict";
/*jshint esversion: 6*/

class OrGate extends BaseControl {
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

        let componentBody = this.paper.path("m 101.5,3.5 7,8 7,8 c 0,0 20,24 20,60 0,36 -20,60 -20,60 l -15,17 24,0 53,0 c 9,0 30,0 54,-9 23,-9 50,-28 70,-64 1,-2 2,-4 2,-5 l -2,-4 c -39,-69 -105,-71 -123,-71 l -53,0 z m 203,75 99,0 m -274.48844,41 -99.51156,0 m 99,-73 -99,0");
        let componentPin1 = new ConnectionPin(this, 15, 47, "in");
        let componentPin2 = new ConnectionPin(this, 15, 119, "in");
        let componentPin3 = new ConnectionPin(this, 415, 78, "out");
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
        return this.pin1Value || this.pin2Value;
    }
}
