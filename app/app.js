var el;
$(document).ready(function () {

    var r = Raphael("holder", 1024, 800);

    var dragger = function (x, y) {
        this.ox = 0;
        this.oy = 0;
    };

    var move = function (dx, dy) {
        this.translate(dx - this.ox, dy - this.oy);
        this.ox = dx;
        this.oy = dy;
    };

    $("#btn-add").click(function (event) {

        var obj = r.set(r.path("m 144.36914,3.7499993 0,158.5000007 71.29882,0 c 39.3576,0 71.30079,-35.50398 71.30079,-79.249998 0,-43.746022 -31.94225,-79.2500277 -70.83985,-79.2500027 l -71.75976,0 z M 15.812499,21.937499 a 12.062335,12.062335 0 0 0 -12.0624997,12.0625 12.062335,12.062335 0 0 0 12.0624997,12.0625 12.062335,12.062335 0 0 0 12.0625,-12.0625 12.062335,12.062335 0 0 0 -12.0625,-12.0625 z m 13.675781,12.0625 113,0 -113,0 z m 387.63476,36.937503 a 12.062335,12.062335 0 0 0 -12.06054,12.0625 12.062335,12.062335 0 0 0 12.06054,12.0625 12.062335,12.062335 0 0 0 12.0625,-12.0625 12.062335,12.062335 0 0 0 -12.0625,-12.0625 z m -128.45508,12.0625 113,0 -113,0 z M 15.812499,119.9375 A 12.062335,12.062335 0 0 0 3.7499993,132 12.062335,12.062335 0 0 0 15.812499,144.0625 12.062335,12.062335 0 0 0 27.874999,132 12.062335,12.062335 0 0 0 15.812499,119.9375 Z M 29.48828,132 l 113,0 -113,0 z"));

        obj.attr("fill", "#fff");
        obj.attr("fill-opacity", 1);
        obj.attr("fill-rule", "evenodd");
        obj.attr("stroke-width", 7);
        obj.attr("stroke-linecap", "butt");
        obj.attr("stroke-linejoin", "round");
        obj.attr("stroke-miterlimit", 4);
        obj.attr("stroke-dashoffset", 0);
        obj.attr("stroke-opacity", 1);
        obj.attr("stroke", "#000");

        obj.drag(move, dragger);
    });

});