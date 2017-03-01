/**
 * Created by adil on 17. 2. 19.
 */

"use strict";
/*jshint esversion: 6*/

const DEFAULT_CONNECTION_PIN_RADIUS = 12.062335;
const PIN_TYPE_IN = "in";
const PIN_TYPE_OUT = "out";


class ConnectionPin {

    /**
     * Constructor of ConnectionPin
     * @param parent the parent control that the pin is used for
     * @param x the x coordinate for pin
     * @param y the y coordinate for pin
     * @param type either "in" or "out"
     */
    constructor(parent, x, y, type) {
        this.control = parent;
        this.board = this.control.board;
        this.paper = this.board.paper;
        this.x = x;
        this.y = y;
        this.type = (type === PIN_TYPE_IN || type === PIN_TYPE_OUT) ? type : null;
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

    getType() {
        return this.type;
    }

    isInputType() {
        return this.type === PIN_TYPE_IN;
    }

    isOutputType() {
        return this.type === PIN_TYPE_OUT;
    }

    canConnect(pin) {
        if (this.control == pin.getParent()) return false;
        if (this.type == null || pin.getType() == null) return false;
        if (this.type == pin.getType()) return false;

        let inputPin = this.isInputType() ? this : pin;

        if (!inputPin.canConnect) return false;
        //TODO: if already connected return false
        return true;
    }

    getParent() {
        return this.control;
    }

    translate(x, y) {
        this.element.translate(x, y);
    }

    setCanConnect(enable) {
        this.canConnect = enable;
    }

    /**
     * Used to externally trigger the state change.
     * @param newState
     */
    notifyStateChange(newState) {
        if (this.stateChangeListener == null) return;
        this.stateChangeListener(newState);
    }

    /**
     * Listener is used for input/output pins and triggered when the state is changed.
     * @param listener
     */
    setStateChangeListener(listener) {
        this.stateChangeListener = listener;

        if (this.isOutputType()) {
            this.notifyStateChange(this.control.getValue());
        }
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