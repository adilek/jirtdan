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
        this.inputPin = pin1.isInputType() ? pin1 : (pin2.isInputType() ? pin2 : null);
        this.outputPin = pin2.isOutputType() ? pin2 : (pin1.isOutputType() ? pin1 : null);

        if (this.inputPin == null || this.outputPin == null) {
            throw new Error("Something went wrong");
        }

        this.init();

        let _this = this;
        this.outputPin.addStateChangeListener(function (newState) {
            _this.inputPin.notifyStateChange(newState);
            _this.setState(newState);
        });
        this.inputPin.setCanConnect(false);
    }

    init() {
        //FIXME: Clean this dirty shit

        let x1 = this.inputPin.element.attr("cx") + this.inputPin.element.matrix.e;
        let y1 = this.inputPin.element.attr("cy") + this.inputPin.element.matrix.f;

        this.start = [x1, y1];

        let x2 = this.outputPin.element.attr("cx") + this.outputPin.element.matrix.e;
        let y2 = this.outputPin.element.attr("cy") + this.outputPin.element.matrix.f;

        this.end = [x2, y2];

        this.element = this.paper.path("M " + x1 + "," + y1 + " L " + x2 + "," + y2);
        //TODO:
        BaseControl.applyDefaultAttributes(this.element);
    }

    onPinTranslate(pin, x, y) {
        if (pin != this.inputPin && pin != this.outputPin) return;

        let pathAttr = this.element.attr("path");
        if (pin == this.inputPin) {
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

    setState(state) {
        if (state == POWER_STATE_HIGH) {
            this.element.attr("fill", DEFAULT_SIGNAL_PRESENCE_COLOR);
            this.element.attr("stroke", DEFAULT_SIGNAL_PRESENCE_COLOR);
        } else {
            this.element.attr("fill", DEFAULT_FILL_COLOR);
            this.element.attr("stroke", DEFAULT_STROKE_COLOR);
        }
    }
}