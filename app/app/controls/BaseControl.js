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

'use strict';
/* jshint esversion: 6*/

export const DEFAULT_STROKE_COLOR = '#000';
export const DEFAULT_FILL_COLOR = '#0000ff';
export const DEFAULT_STROKE_WIDTH = 2;
export const DEFAULT_SIGNAL_PRESENCE_COLOR = '#fa0';
export const POWER_STATE_HIGH = 1;
export const POWER_STATE_LOW = 0;
export const DEBUG = true;

const LOGTAG = 'BaseControl';
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
// TODO: remove the direct dependency from raphael
export class BaseControl {
    constructor(board) {
        this.board = board;
        this.paper = board.paper;
        this.shapes = [];
        this.inPins = [];
        this.outPins = [];
        this.glow = null;
        this.isComponentSelected = false;
        this.draw();
        this.initControl();
    }

    /**
     * This method needs to be overridden in subclass.
     * It is aim is to draw the component.
     */
    draw() {
        // Empty
    }

    /**
     * This method needs to be overridden in subclass.
     */
    initControl() {
        // Empty
    }

    /**
     * An event fired when element is selected.
     * @param event
     */
    onSelect(event) {
        // Empty
    }

    /**
     * Select control
     * @param canDismissPreviousSelection
     */
    select(canDismissPreviousSelection) {
        if (!event.ctrlKey && canDismissPreviousSelection) {
            this.board.unselect();
        }
        this.isComponentSelected = true;
        this.onSelect(event);
    }

    unselect() {
        this.isComponentSelected = false;
        if (this.glow == null) return;
        for (let i = 0; i < this.glow.length; i++) {
            this.glow[i].remove();
            this.glow[i] = null;
        }
        this.glow = null;
    }

    isSelected() {
        return this.isComponentSelected;
    }

    /**
     * Fired on dragging start.
     * Basically it is almost same as mouse-down.
     */
    onDragStart() {
        this.oldX = 0;
        this.oldY = 0;
        // Bring to front the selected element.
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].toFront();
        }
    }

    /**
     * Fired while dragging.
     * @param dx
     * @param dy
     */
    onDrag(dx, dy) {
        const x = dx - this.oldX;
        const y = dy - this.oldY;

        if (this.glow != null) {
            this.glow.translate(x, y);
        }

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
        const tr = obj.transform();
        obj.transform('');
        obj.attr('fill', newGradient);
        obj.transform(tr);
    }

    /**
     * Set the shapes to be drawn to represent the current control visually.
     * @param {Array} shapes array of shapes.
     */
    setShapes(shapes) {
        this.shapes = shapes;

        const obj = this.paper.set(this.shapes);

        const _this = this;

        obj.drag(
            function(dx, dy) {
                _this.onDrag(dx, dy);
            }, function() {
                _this.onDragStart();
            });

        obj.mousedown(function(event) {
            _this.select(true);
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

    getPins() {
        let pins = [];
        pins = this.inPins.concat(this.outPins);
        return pins;
    }

    deleteControl() {
        this.unselect();
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].remove();
        }
        this.shapes = null;

        for (let i = 0; i < this.inPins.length; i++) {
            this.inPins[i].deletePin();
        }
        this.inPins = null;

        for (let i = 0; i < this.outPins.length; i++) {
            this.outPins[i].deletePin();
        }
        this.outPins = null;
    }

    /**
     * Find out if element is within
     * the boundaries of given area.
     *
     * x,y--------------x2,y
     * |///////////////////|
     * |///////////////////|
     * |///////////////////|
     * x,y2-------------x2,y2
     */
    isWithinArea(x, y, x2, y2) {
        for (let i = 0; i < this.shapes.length; i++) {
            let position = this.shapes[i].getBBox();

            if ((position.x < x || position.x2 > x2) ||
                (position.y < y || position.y2 > y2)) {
                return false;
            }
        }

        return true;
    }
}
