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
import {ConnectionLine} from './controls/ConnectionLine.js';

/**
 * Minimal height/width value for selection box to be appear.
 * The selection box will not appear unless its height and width
 * are greater that this number.
 * @type {number}
 */
const SELECTION_BOX_START_THRESHOLD = 10;
const SELECTION_BOX_FILL_COLOR = '#355faf';

/**
 * The workspace board object where all components are placed and
 * interact with each other.
 */
export class Board {
    /**
     * Constructor of the {@link Board} class.
     * @param paper paper object of {@link Raphael} library.
     */
    constructor(paper) {
        this.paper = paper;
        this.connections = [];
        this.controls = [];
        this.isConnecting = false;
        this.selectionBox = null;
    }

    /**
     * Add the control to be controlled by current Board.
     * @param {BaseControl} control any control
     */
    addControl(control) {
        this.controls.push(control);
    }

    /**
     * Start connection activity from {@link ConnectionPin} object.
     * @param {ConnectionPin} pin pin where connection starts from
     */
    startConnection(pin) {
        this.isConnecting = true;
        this.inputPin = pin;
    }

    /**
     * Decide automatically to start or finalize the connection
     * activity depending on situation.
     * In case of startConnection was called previously the connection
     * will be finalized.
     * @param {ConnectionPin} pin pin where connection goes to
     */
    startFinishConnection(pin) {
        if (!this.isConnecting) {
            this.startConnection(pin);
            return;
        }
        this.finishConnection(pin);
    }

    /**
     * Finalize the connection activity. The connection will be
     * established with previously started connection pin and
     * two pins will communicate.
     * @param {ConnectionPin} pin object to be connected to
     */
    finishConnection(pin) {
        if (!this.isConnecting) return;
        if (this.inputPin == pin) return;

        if (this.inputPin.canConnect(pin)) {
            this.createConnection(this.inputPin, pin);
        }
        this.isConnecting = false;
    }

    /**
     * Create new connection and add it to the list.
     * @param {ConnectionPin} pin1 start of the connection line
     * @param {ConnectionPin} pin2 end of the connection line.
     */
    createConnection(pin1, pin2) {
        this.connections.push(new ConnectionLine(this, pin1, pin2));
    }

    /**
     * Translate the start and end points of all connections visually,
     * depending on pins they connect to.
     * This method is fired on drag-drop of the control.
     * @param {ConnectionPin} pin the pin that are being moved
     * @param {number} x the coordinate on X axis
     * @param {number} y the coordinate on Y axis.
     */
    translateConnections(pin, x, y) {
        for (let i = 0; i < this.connections.length; i++) {
            this.connections[i].onPinTranslate(pin, x, y);
        }
    }

    /**
     * Un-select all selected elements on {@link Board}.
     */
    unselect() {
        for (let i = 0; i < this.connections.length; i++) {
            let item = this.connections[i];
            if (item.isSelected()) {
                item.unselect();
            }
        }

        for (let i = 0; i < this.controls.length; i++) {
            let item = this.controls[i];
            if (item.isSelected()) {
                item.unselect();
            }
        }
    }

    /**
     * Delete the connection lines given in elements array.
     * @param {ConnectionLine[]} elements connection lines to be deleted.
     */
    deleteConnectionLines(elements) {
        for (let i = 0; i < elements.length; i++) {
            let item = elements[i];
            item.disconnect();
            this.connections[this.connections.indexOf(item)] = null;
        }

        let newConnections = [];
        for (let i = 0; i < this.connections.length; i++) {
            let item = this.connections[i];
            if (item != null) {
                newConnections.push(item);
            }
        }
        this.connections = newConnections;
    }

    /**
     * Delete elements from the Board contained in elements.
     * @param {BaseControl[]} elements the list of components to be deleted.
     */
    deleteControls(elements) {
        // First we do need to delete all connection lines
        // which are connected to the component.
        let pins = [];
        for (let i = 0; i < elements.length; i++) {
            let item = elements[i];
            pins = pins.concat(item.getPins());
        }

        let linesToDelete = [];
        for (let i = 0; i < this.connections.length; i++) {
            let item = this.connections[i];
            for (let j = 0; j < pins.length; j++) {
                if (item.isConnectedToPin(pins[j])) {
                    linesToDelete.push(item);
                }
            }
        }

        this.deleteConnectionLines(linesToDelete);

        // Now we can delete the component itself
        for (let i = 0; i < elements.length; i++) {
            let item = elements[i];
            item.deleteControl();
            this.controls[this.controls.indexOf(item)] = null;
        }

        let newControls = [];
        for (let i = 0; i < this.controls.length; i++) {
            let item = this.controls[i];
            if (item != null) {
                newControls.push(item);
            }
        }
        this.controls = newControls;
    }

    /**
     * Delete selected elements on the {@link Board}
     */
    deleteSelected() {
        // Delete connection lines
        let linesToDelete = [];
        for (let i = 0; i < this.connections.length; i++) {
            let item = this.connections[i];
            if (item.isSelected()) {
                linesToDelete.push(item);
            }
        }

        this.deleteConnectionLines(linesToDelete);

        // Delete components
        let controlsToDelete = [];
        for (let i = 0; i < this.controls.length; i++) {
            let item = this.controls[i];
            if (item.isSelected()) {
                controlsToDelete.push(item);
            }
        }

        this.deleteControls(controlsToDelete);
    }

    /**
     * Select all controls within boundaries of given area.
     *
     * <pre>
     * x,y--------------x2,y
     * |///////////////////|
     * |///////////////////|
     * |///////////////////|
     * x,y2-------------x2,y2
     * </pre>
     */
    selectControlsWithinArea(x, y, x2, y2) {
        this.unselect();

        for (let i = 0; i < this.controls.length; i++) {
            let item = this.controls[i];

            if (item.isWithinArea(x, y, x2, y2)) {
                item.select(false);
            }
        }
    }

    /**
     * Is called when onMouseDown event occur on {@link Board}.
     * @param {Event} event event object
     */
    onMouseDown(event) {
        if (this.paper.getElementByPoint(event.clientX, event.clientY) != null) {
            return;
        }
        if (this.selectionBox == null) {
            this.unselect();
            let x = event.offsetX;
            let y = event.offsetY;
            this.selectionBox = new SelectionBox(this.paper, x, y);
        }
    }

    /**
     * Is called when onMouseUp event occur on {@link Board}.
     * @param {Event} event event object
     */
    onMouseUp(event) {
        if (this.selectionBox != null) {
            this.selectionBox.remove();
            this.selectionBox = null;
        }
    }

    /**
     * Is called when onMouseMove event occur on {@link Board}.
     * @param {Event} event event object
     */
    onMouseMove(event) {
        if (this.selectionBox != null) {
            let x = event.offsetX;
            let y = event.offsetY;
            this.selectionBox.change(x, y);

            let position = this.selectionBox.getControlPoints();

            this.selectControlsWithinArea(
                position.x1,
                position.y1,
                position.x2,
                position.y2
            );
        }
    }
}

/**
 * Selection rectangle used to select the objects
 * within specified area.
 */
class SelectionBox {
    constructor(paper, x, y) {
        this.paper = paper;
        this.startX = x;
        this.startY = y;
        this.isDrawing = false;
        this.controlPoints = {
            x1: 0, y1: 0,
            x2: 0, y2: 0,
        };
    }

    draw(x1, y1, x2, y2) {
        let x = x1 > x2 ? x2 : x1;
        let y = y1 > y2 ? y2 : y1;
        let w = Math.abs(x2 - x1);
        let h = Math.abs(y2 - y1);
        if (this.isDrawing) {
            let attr = this.element.attr();
            attr.x = x;
            attr.y = y;
            attr.width = w;
            attr.height = h;
            this.element.attr(attr);
        } else {
            this.element = this.paper.rect(x, y, w, h);
            this.element.attr('fill', SELECTION_BOX_FILL_COLOR);
            this.element.attr('fill-opacity', 0.3);
            this.isDrawing = true;
        }
    }

    remove() {
        if (this.element != null) {
            this.element.remove();
        }
    }

    setControlPoints(x2, y2) {
        let x1 = this.startX;
        let y1 = this.startY;
        let newX1 = x1 > x2 ? x2 : x1;
        let newY1 = y1 > y2 ? y2 : y1;
        let newX2 = x1 < x2 ? x2 : x1;
        let newY2 = y1 < y2 ? y2 : y1;

        this.controlPoints.x1 = newX1;
        this.controlPoints.y1 = newY1;

        this.controlPoints.x2 = newX2;
        this.controlPoints.y2 = newY2;
    }

    /**
     * Get the control points of rectangle.
     *
     * <pre>
     * x1,y1-----------x2,y1
     * |///////////////////|
     * |///////////////////|
     * |///////////////////|
     * x1,y2-----------x2,y2
     * </pre>
     *
     * @returns {{x1: number, y1: number,
     *            x2: number, y2: number}|*}
     */
    getControlPoints() {
        return this.controlPoints;
    }

    change(x2, y2) {
        let dx = Math.abs(x2 - this.startX);
        let dy = Math.abs(y2 - this.startY);
        if (dx >= SELECTION_BOX_START_THRESHOLD && dy >= SELECTION_BOX_START_THRESHOLD || this.isDrawing) {
            this.draw(this.startX, this.startY, x2, y2);
            this.setControlPoints(x2, y2);
        }
    }
}
