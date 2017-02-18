"use strict";
/*jshint esversion: 6*/

const DEFAULT_STROKE_COLOR = "#000";

/**
 * BaseControl is the super-class of all logic controls.
 * The BaseControl class provides basic functionality that all
 * controls should have (ex. drag-drop, focus, etc.).
 *
 * All classes that extends BaseControl should override the initControl()
 * method.
 */
class BaseControl {

    constructor(paper) {
        this.paper = paper;
        this.shapes = [];
        this.inPins = [];
        this.outPins = [];
        this.initControl();
    }

    /**
     * This method needs to be overridden in subclass.
     */
    initControl() {
        // Empty
    }

    /**
     * Fired on dragging start.
     * Basically it is almost same as mouse-down.
     */
    onDragStart() {
        this.oldX = 0;
        this.oldY = 0;
        //TODO: Bring component to front.
    }

    /**
     * Fired while dragging.
     * @param dx
     * @param dy
     */
    onDrag(dx, dy) {
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].translate(dx - this.oldX, dy - this.oldY);
        }

        this.oldX = dx;
        this.oldY = dy;
    }

    /**
     * Event for input-pin down action.
     * @param pin
     */
    onInputPinActionDown(pin) {
        pin.attr("stroke", "#00f");
        pin.attr("fill", "#0f0");
    }

    /**
     * Event for input-up action.
     * @param pin
     */
    onInputPinActionUp(pin) {
        pin.attr("stroke", "#f00");
        pin.attr("fill", "#fff");
    }

    /**
     * Event for hover-in action.
     * @param pin
     */
    onInputPinHoverIn(pin) {
        pin.attr("stroke", "#f00");
    }

    /**
     * Event for hover-out action.
     * @param pin
     */
    onInputPinHoverOut(pin) {
        pin.attr("stroke", "#000");
    }

    /**
     * Set the shapes to be drawn to represent the current control visually.
     * @param {Array} shapes array of shapes.
     */
    setShapes(shapes) {
        this.shapes = shapes;

        //FIXME: Design needs to be fixed.
        let obj = this.paper.set(this.shapes);

        obj.attr("fill", "#fff");
        obj.attr("fill-opacity", 1);
        obj.attr("fill-rule", "evenodd");
        obj.attr("stroke-width", 7);
        obj.attr("stroke-linecap", "butt");
        obj.attr("stroke-linejoin", "round");
        obj.attr("stroke-miterlimit", 4);
        obj.attr("stroke-dashoffset", 0);
        obj.attr("stroke-opacity", 1);
        obj.attr("stroke", DEFAULT_STROKE_COLOR);


        let _this = this;

        obj.drag(function (dx, dy) {
            _this.onDrag(dx, dy);
        }, function () {
            _this.onDragStart();
        });

        obj.mousedown(function () {
            for (let i = 0; i < _this.shapes.length; i++) {
                _this.shapes[i].node.setAttribute("filter", "url(#filter1)");
            }
        });

        obj.mouseup(function () {
            for (let i = 0; i < _this.shapes.length; i++) {
                _this.shapes[i].node.removeAttribute("filter");
            }
        });

    }

    /**
     * Add input pin objects into this control.
     * @param {...T} pins list of input pin objects as arguments.
     */
    addInputPins(pins) {
        let _this = this;
        for (let i = 0; i < arguments.length; i++) {
            this.inPins.push(arguments[i]);
            arguments[i].mousedown(function () {
                _this.onInputPinActionDown(this);
            });
            arguments[i].mouseup(function () {
                _this.onInputPinActionUp(this);
            });
            arguments[i].mouseover(function () {
                _this.onInputPinHoverIn(this);
            });
            arguments[i].mouseout(function () {
                _this.onInputPinHoverOut(this);
            });
        }
    }

    /**
     * Add output pin objects into this control.
     * @param {...T} pins list of output pin objects as arguments.
     */
    addOutputPins(pins) {
        let _this = this;
        for (let i = 0; i < arguments.length; i++) {
            this.outPins.push(arguments[i]);
            arguments[i].mousedown(function () {
                _this.onInputPinActionDown(this);
            });
            arguments[i].mouseup(function () {
                _this.onInputPinActionUp(this);
            });
            arguments[i].mouseover(function () {
                _this.onInputPinHoverIn(this);
            });
            arguments[i].mouseout(function () {
                _this.onInputPinHoverOut(this);
            });
        }
    }
}