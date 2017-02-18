var el;
$(document).ready(function () {

    var r = Raphael("holder", 1024, 800);
    var	ns = "http://www.w3.org/2000/svg";
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
    r.defs.appendChild(element);

    $("#btn-add").click(function (event) {

        new AndGate(r);


    });

});