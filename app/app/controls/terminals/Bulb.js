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
     * Constructor for AndGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 198.231,3.4333413 0,159.6333587 -122.986417,0 0,-159.6333587 122.986417,0 z M 74.386833,83.250031 l -49.87061,0 49.87061,0 z");
        //let componentText = this.paper.path("m 30.266032,119.60624 c 8.501315,0 17.00263,0 25.503945,0 0,-24.12873 0,-48.25747 0,-72.3862 -8.72635,1.80028 -17.452699,3.60055 -26.179049,5.40083 0,-6.55101 0,-13.10203 0,-19.65304 8.770589,-1.78124 17.52568,-3.71345 26.305903,-5.40083 9.059123,0 18.118247,0 27.17737,0 0,30.67975 0,61.35949 0,92.03924 8.501315,0 17.002629,0 25.503949,0 0,6.651 0,13.3021 0,19.9531 -26.104042,0 -52.20808,0 -78.312118,0 0,-6.651 0,-13.3021 0,-19.9531 z");
        var componentPin3 = new ConnectionPin(this, 20, 83, "in");

        this.setShapes([componentBody]);
        this.addOutputPins(componentPin3);
    }
}
