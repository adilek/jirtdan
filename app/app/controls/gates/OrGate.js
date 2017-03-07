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

        let componentBody = this.paper.path("m 101.07632,3.5678062 7.66487,8.9876198 7.62023,8.9375 c 0.0373,0.0444 20.25609,24.17656 20.25609,60.90816 0,36.765454 -20.27841,60.936804 -20.27841,60.936804 l -15.26278,17.89647 24.11086,0 53.34156,0 c 9.13623,0 30.35123,0.12027 54.07828,-9.23108 23.7379,-9.35571 50.05011,-28.36946 70.25634,-64.352854 1.47897,-2.14502 2.31316,-4.63806 2.70129,-5.68619 l -2.70129,-4.8125 C 262.42079,5.1313062 196.82451,3.5678062 178.52874,3.5678062 l -53.34156,0 z M 306.49478,82.401136 c 76.20221,0 95.25276,0 95.25276,0 M 131.373,119.06778 l -102.873,0 m 99.06288,-73.333284 -99.06288,0");
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
        return this.pin1Value || this.pin2Value;
    }
}
