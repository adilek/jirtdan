/**
 * Created by adil on 17. 2. 19.
 */

"use strict";
/*jshint esversion: 6*/

class ConnectionLine {

    constructor(board, pin1, pin2) {
        //TODO:
        this.board = board;
        this.paper = this.board.paper;
        this.pin1 = pin1;
        this.pin2 = pin2;
        this.init();
    }

    init() {
        //FIXME: Clean this dirty shit

        let x1 = this.pin1.element.attr("cx") + this.pin1.element.matrix.e;
        let y1 = this.pin1.element.attr("cy") + this.pin1.element.matrix.f;

        this.start = [x1, y1];

        let x2 = this.pin2.element.attr("cx") + this.pin2.element.matrix.e;
        let y2 = this.pin2.element.attr("cy") + this.pin2.element.matrix.f;

        this.end = [x2, y2];

        this.element = this.paper.path("M " + x1 + "," + y1 + " L " + x2 + "," + y2);
        //TODO:
        BaseControl.applyDefaultAttributes(this.element);
    }

    onPinTranslate(pin, x, y) {
        if (pin != this.pin1 && pin != this.pin2) return;

        let pathAttr = this.element.attr("path");
        if (pin == this.pin1) {
            //TODO:
            pathAttr[0][1] += x;
            pathAttr[0][2] += y;

        } else {
            //TODO:
            pathAttr[1][1] += x;
            pathAttr[1][2] += y;
        }
        this.element.attr("path", pathAttr);
    }

}