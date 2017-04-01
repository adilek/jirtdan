/*

 Copyright (c) 2017 Jirtdan Team and other collaborators

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

"use strict";
/*jshint esversion: 6*/

export const DEFAULT_STROKE_COLOR = "#000";
export const DEFAULT_FILL_COLOR = "#0000ff";
export const DEFAULT_STROKE_WIDTH = 2;
export const DEFAULT_SIGNAL_PRESENCE_COLOR = "#fa0";
export const POWER_STATE_HIGH = 1;
export const POWER_STATE_LOW = 0;

/**
 * BaseControl is the super-class of all logic controls.
 * The BaseControl class provides basic functionality that all
 * controls should have:
 * - drag-drop
 * - focus
 * - manage the input/output pins
 *
 * All classes that extends BaseControl should override the initControl()
 * method.
 */
//TODO: remove the direct dependency from raphael
export class BaseControl {

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
        let x = dx - this.oldX;
        let y = dy - this.oldY;

        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].translate(x, y);
        }
        for (let i = 0; i < this.inPins.length; i++) {
            this.inPins[i].translate(x, y);
            this.board.translateConnections(this.inPins[i], x, y);
        }

        for (let i = 0; i < this.outPins.length; i++) {
            this.outPins[i].translate(x, y);
            this.board.translateConnections(this.outPins[i], x, y);
        }

        this.oldX = dx;
        this.oldY = dy;
    }

    /**
     * Due to bug in raphael gradient is lost after transformations.
     * We do some workaround to bypass the issue.
     * @param obj
     * @param newGradient
     */
    changeGradient(obj, newGradient) {
        let tr = obj.transform();
        obj.transform("");
        obj.attr("fill", newGradient);
        obj.transform(tr);
    }

    /**
     * Set the shapes to be drawn to represent the current control visually.
     * @param {Array} shapes array of shapes.
     */
    setShapes(shapes) {
        this.shapes = shapes;

        //FIXME: Design needs to be fixed.
        let obj = this.paper.set(this.shapes);

        let _this = this;

        obj.drag(function (dx, dy) {
            _this.onDrag(dx, dy);
        }, function () {
            _this.onDragStart();
        });

        obj.mousedown(function () {
            for (let i = 0; i < _this.shapes.length; i++) {
                //_this.shapes[i].node.setAttribute("filter", "url(#filter1)");
            }
        });

        obj.mouseup(function () {
            for (let i = 0; i < _this.shapes.length; i++) {
                //_this.shapes[i].node.removeAttribute("filter");
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