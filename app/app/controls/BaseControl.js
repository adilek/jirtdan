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

    constructor(board) {
        this.board = board;
        this.paper = board.paper;
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
        for (let i = 0; i < this.inPins.length; i++) {
            this.inPins[i].translate(dx - this.oldX, dy - this.oldY);
        }

        for (let i = 0; i < this.outPins.length; i++) {
            this.outPins[i].translate(dx - this.oldX, dy - this.oldY);
        }

        this.oldX = dx;
        this.oldY = dy;
    }

    //FIXME: temporary solution
    static applyDefaultAttributes(node) {
        node.attr("fill", "#fff");
        node.attr("fill-opacity", 1);
        node.attr("fill-rule", "evenodd");
        node.attr("stroke-width", 7);
        node.attr("stroke-linecap", "butt");
        node.attr("stroke-linejoin", "round");
        node.attr("stroke-miterlimit", 4);
        node.attr("stroke-dashoffset", 0);
        node.attr("stroke-opacity", 1);
        node.attr("stroke", DEFAULT_STROKE_COLOR);
    }

    /**
     * Set the shapes to be drawn to represent the current control visually.
     * @param {Array} shapes array of shapes.
     */
    setShapes(shapes) {
        this.shapes = shapes;

        //FIXME: Design needs to be fixed.
        let obj = this.paper.set(this.shapes);

        BaseControl.applyDefaultAttributes(obj);


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
        for (let i = 0; i < arguments.length; i++) {
            this.inPins.push(arguments[i]);
        }
    }

    /**
     * Add output pin objects into this control.
     * @param {...T} pins list of output pin objects as arguments.
     */
    addOutputPins(pins) {
        for (let i = 0; i < arguments.length; i++) {
            this.outPins.push(arguments[i]);
        }
    }
}