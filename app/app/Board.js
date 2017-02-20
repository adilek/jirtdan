/**
 * Created by adil on 17. 2. 19.
 */
"use strict";
/*jshint esversion: 6*/

//FIXME: Draft
//TODO: Dependency from raphael needs to be removed.
class Board {
    constructor() {
        this.initBoard();
        this.connections = [];
        this.controls = [];
        this.isConnecting = false;
    }

    initBoard() {
        this.paper = Raphael("board", 1024, 800);
        this.createFilter();
    }

    addControl(control) {
        //TODO:
        this.controls.push(control);
    }

    startConnection(pin) {
        //TODO:
        this.isConnecting = true;
        this.pin1 = pin;
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
        if (this.pin1 == pin) return;
        //TODO:
        this.createConnection(this.pin1, pin);
        this.isConnecting = false;
    }

    createConnection(pin1, pin2) {
        this.connections.push(new ConnectionLine(this, pin1, pin2));
    }

    translateConnections(pin, x, y) {
        for (var i = 0; i < this.connections.length; i++) {
            this.connections[i].onPinTranslate(pin, x, y);
        }
    }

    createFilter() {
        //FIXME: Clean this bullshit.
        var ns = "http://www.w3.org/2000/svg";
        var filter = `
              
                    <feFlood
                    flood-opacity="1"
                    flood-color="rgb(0,0,248)"
                    result="flood"
                    id="feFlood4515" />
                    <feComposite
                    in="flood"
                    in2="SourceGraphic"
                    operator="in"
                    result="composite1"
                    id="feComposite4517" />
                    <feGaussianBlur
                    in="composite1"
                    stdDeviation="10"
                    result="blur"
                    id="feGaussianBlur4519" />
                    <feOffset
                    dx="0"
                    dy="0"
                    result="offset"
                    id="feOffset4521" />
                    <feComposite
                    in="SourceGraphic"
                    in2="offset"
                    operator="over"
                    result="composite2"
                    id="feComposite4523" />
                 `;
        var element = document.createElementNS(ns, "filter");
        element.innerHTML = filter;
        element.id = "filter1";
        element.style = "color-interpolation-filters:sRGB;";
        this.paper.defs.appendChild(element);
    }
}