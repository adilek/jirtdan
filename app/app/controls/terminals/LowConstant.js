/**
 * Created by adil on 17. 2. 18.
 */

"use strict";
/*jshint esversion: 6*/

/**
 * Control for Low Constant (0).
 */
//TODO: Remove the direct dependency from raphael.
class LowConstant extends BaseControl {
    /**
     * Constructor for LowConstant
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 2,3 0,159 122,0 0,-159 -122,0 z M 126,83 l 49,0 -49,0 z");
        let componentText = this.paper.path("m 81,83 q 0,-20 -3,-28 -3,-8 -12,-8 -9,0 -12,8 -3,8 -3,28 0,20 3,29 3,8 12,8 8,0 12,-8 3,-8 3,-29 z m 28,0 q 0,27 -11,41 -11,14 -33,14 -21,0 -33,-14 -11,-14 -11,-41 0,-27 11,-41 Q 43,27 65,27 q 21,0 33,14 11,14 11,41 z");
        let componentPin3 = new ConnectionPin(this, 186, 83, "out");

        this.setShapes([componentBody, componentText]);
        this.addOutputPins(componentPin3);
    }

    getValue() {
        return 0;
    }
}
