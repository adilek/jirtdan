/**
 * Created by adil on 17. 2. 19.
 */

"use strict";
/*jshint esversion: 6*/

const DEFAULT_CONNECTION_PIN_RADIUS = 12.062335;

class ConnectionPin {

    constructor(parent, x, y) {
        this.control = parent;
        this.board = this.control.board;
        this.paper = this.board.paper;
        this.x = x;
        this.y = y;
        this.init();
    }

    init() {
        this.element = this.paper.circle(this.x, this.y, DEFAULT_CONNECTION_PIN_RADIUS);

        BaseControl.applyDefaultAttributes(this.element);

        // Assign event handlers.
        let _this = this;
        this.element.mousedown(function () {
            _this.onActionDown(this);
        });
        this.element.mouseup(function () {
            _this.onActionUp(this);
        });
        this.element.mouseover(function () {
            _this.onHoverIn(this);
        });
        this.element.mouseout(function () {
            _this.onHoverOut(this);
        });
        this.element.click(function () {
            _this.onClick(this);
        });
    }

    translate(x, y) {
        this.element.translate(x, y);
    }

    /**
     * Event for input-pin down action.
     */
    onActionDown() {
        this.element.attr("stroke", "#00f");
        this.element.attr("fill", "#0f0");
    }

    /**
     * Event for input-up action.
     */
    onActionUp() {
        this.element.attr("stroke", "#f00");
        this.element.attr("fill", "#fff");
    }

    /**
     * Event for hover-in action.
     */
    onHoverIn() {
        this.element.attr("stroke", "#f00");
    }

    /**
     * Event for hover-out action.
     */
    onHoverOut() {
        this.element.attr("stroke", "#000");
    }

    onClick() {
        this.board.startFinishConnection(this);
    }
}