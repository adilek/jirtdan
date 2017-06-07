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

//FIXME: Draft
//TODO: Dependency from raphael needs to be removed.
export class Board {
    constructor(paper) {
        this.paper = paper;
        this.connections = [];
        this.controls = [];
        this.isConnecting = false;
    }

    addControl(control) {
        //TODO:
        this.controls.push(control);
    }

    startConnection(pin) {
        //TODO:
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
     * Delete selected elements
     */
    deleteSelected() {
        let connectionsToBeDeleted = []
        for (let i = 0; i < this.connections.length; i++) {
            let item = this.connections[i];
            if (item.isSelected()) {
                connectionsToBeDeleted.push(item);
            }
        }

        this.deleteConnections(connectionsToBeDeleted);

        //TODO: Delete components
    }

    /**
     * Detach pin - remove all connections of pin
     * @param pin
     */
    detachPin(pin) {
        let connectionsToBeDeleted = [];
        for (let i = 0; i < this.connections.length; i++) {
            let connection = this.connections[i];
            if (connection.inputPin == pin || connection.outputPin == pin) {
                connectionsToBeDeleted.push(connection);
            }
        }

        this.deleteConnections(connectionsToBeDeleted);
    }

    /**
     * Helper function.
     * @param connectionsToBeDeleted
     */
    deleteConnections(connectionsToBeDeleted) {
        for (let i = 0; i < this.connections.length; i++) {
            for (let j = 0; j < connectionsToBeDeleted.length; j++) {
                if (this.connections[i] == connectionsToBeDeleted[j]) {
                    this.connections[i].disconnect();
                    this.connections[i] = null;
                    break;
                }
            }
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
}