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
import {ConnectionLine} from './controls/ConnectionLine.js'

const SELECTION_BOX_START_THRESHOLD = 10;

export class Board {
    constructor(paper) {
        this.paper = paper;
        this.connections = [];
        this.controls = [];
        this.isConnecting = false;
        this.selectionBox = null;
    }

    /**
     * Add the control to be controlled by current Board.
     * @param control
     */
    addControl(control) {
        this.controls.push(control);
    }

    startConnection(pin) {
        this.isConnecting = true;
        this.inputPin = pin;
    }

    startFinishConnection(pin) {
        if (!this.isConnecting) {
            this.startConnection(pin);
            return;
        }
        this.finishConnection(pin);
    }

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
     */
    createConnection(pin1, pin2) {
        this.connections.push(new ConnectionLine(this, pin1, pin2));
    }

    /**
     * Translate all connections depending on pins they connect to.
     * This method is fired on drag-drop of the control.
     */
    translateConnections(pin, x, y) {
        for (var i = 0; i < this.connections.length; i++) {
            this.connections[i].onPinTranslate(pin, x, y);
        }
    }

    /**
     * Unselect selected elements.
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
     * @param elements
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
     * @param elements
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
     * Delete selected elements
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

    onMouseUp(event) {
        if (this.selectionBox != null) {
            this.selectionBox.remove();
            this.selectionBox = null;
        }
    }

    onMouseMove(event) {
        if (this.selectionBox != null) {
            let x = event.offsetX;
            let y = event.offsetY;
            this.selectionBox.change(x, y);
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
        this.init();
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
            this.isDrawing = true;
        }
    }

    init() {
        this.isDrawing = false;
    }

    remove() {
        if (this.element != null) {
            this.element.remove();
        }
    }

    change(x2, y2) {
        let dx = Math.abs(x2 - this.startX);
        let dy = Math.abs(y2 - this.startY);
        if (dx >= SELECTION_BOX_START_THRESHOLD && dy >= SELECTION_BOX_START_THRESHOLD || this.isDrawing) {
            this.draw(this.startX, this.startY, x2, y2);
        }
    }
}
