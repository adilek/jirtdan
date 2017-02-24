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
     * Constructor for AndGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
    }

    initControl() {
        super.initControl();

        let componentBody = this.paper.path("m 2.9332995,3.4333413 0,159.6333587 122.9864205,0 0,-159.6333587 -122.9864205,0 z M 126.77747,83.250031 l 49.87061,0 -49.87061,0 z");
        let componentText = this.paper.path("m 81.82545,83.380807 q 0,-20.424635 -3.86609,-28.740379 -3.79315,-8.38869 -12.83835,-8.38869 -9.04519,0 -12.91128,8.38869 -3.8661,8.315744 -3.8661,28.740379 0,20.643473 3.8661,29.105103 3.86609,8.46164 12.91128,8.46164 8.97225,0 12.83835,-8.46164 3.86609,-8.46163 3.86609,-29.105103 z m 28.08387,0.218836 q 0,27.062637 -11.67122,41.797557 -11.67122,14.66197 -33.11709,14.66197 -21.51881,0 -33.19003,-14.66197 -11.67122,-14.73492 -11.67122,-41.797557 0,-27.135587 11.67122,-41.797557 Q 43.6022,27.06717 65.12101,27.06717 q 21.44587,0 33.11709,14.734916 11.67122,14.66197 11.67122,41.797557 z");
        var componentPin3 = new ConnectionPin(this, 186, 83, "out");

        this.setShapes([componentBody, componentText]);
        this.addOutputPins(componentPin3);
    }

    getValue() {
        return 0;
    }
}
