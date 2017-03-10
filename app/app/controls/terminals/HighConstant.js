/**
 * Created by adil on 17. 2. 18.
 */

"use strict";
/*jshint esversion: 6*/
import {BaseControl} from '../BaseControl.js'
import {ConnectionPin} from '../ConnectionPin.js'
/**
 * Control for High Constant (1).
 */
//TODO: Remove the direct dependency from raphael.
export class HighConstant extends BaseControl {
    /**
     * Constructor for HighConstant
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 2,3 0,159 122,0 0,-159 -122,0 z M 126,83 l 49,0 -49,0 z");
        let componentText = this.paper.path("m 30,119 c 8,0 17,0 25,0 0,-24 0,-48 0,-72 -8,1 -17,3 -26,5 0,-6 0,-13 0,-19 8,-1 17,-3 26,-5 9,0 18,0 27,0 0,30 0,61 0,92 8,0 17,0 25,0 0,6 0,13 0,19 -26,0 -52,0 -78,0 0,-6 0,-13 0,-19 z");
        let outputPin3 = new ConnectionPin(this, 186, 83, "out");

        this.setShapes([componentBody, componentText]);
        this.addOutputPins(outputPin3);
    }

    getValue() {
        return 1;
    }
}
