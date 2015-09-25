/*!
Copyright 2015 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/floe/universal/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("floe.tests");

    jqUnit.test("Test floe.d3.jQueryToD3()", function () {
        jqUnit.expect(3);

        var jQueryContainer = $(".floec-container");
        jqUnit.assertNotUndefined("The source container is a jQuery container", jQueryContainer.jquery);

        var d3Elem = floe.d3.jQueryToD3(jQueryContainer);
        jqUnit.assertUndefined("The source container is a jQuery container", d3Elem[0].jquery);
        jqUnit.assertEquals("The jQuery element has been converted to D3 element", jQueryContainer[0], d3Elem[0][0]);
    });

    floe.tests.mouseOverListenerCalled = false;

    floe.tests.mouseOverListener = function () {
        floe.tests.mouseOverListenerCalled = true;
    };

    jqUnit.test("Test floe.d3.getColorScale()", function () {
        jqUnit.expect(2);

        var container = $(".floec-d3Listener");
        floe.d3.addD3Listeners(container, "mouseover", "floe.tests.mouseOverListener");

        jqUnit.assertFalse("The mouseover listener have not been triggered", floe.tests.mouseOverListenerCalled);
        var d3Container = floe.d3.jQueryToD3(container);
        d3Container.on("mouseover")();
        jqUnit.assertTrue("The mouseover listener have been registered", floe.tests.mouseOverListenerCalled);

    });

    jqUnit.test("Test floe.d3.getColorScale()", function () {
        jqUnit.expect(18);

        var cases = [{
            msg: "Return a proper color scale",
            input: ["#000000", "#ff0000", "#00ff00", "#0000ff", "#aabbcc", "#ccbbaa"],
            expected: ["#000000", "#ff0000", "#00ff00", "#0000ff", "#aabbcc", "#ccbbaa"]
        }, {
            msg: "Return default category10 color scale if the input is undefined",
            input: undefined,
            expected: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
        }];

        fluid.each(cases, function (oneCase) {
            var colorScale = floe.d3.getColorScale(oneCase.input);
            jqUnit.assertEquals("The return color scale is a function", "function", typeof(colorScale));
            var length = oneCase.input ? oneCase.input.length : 10;

            for (var i = 0; i < length; i++) {
                jqUnit.assertEquals(oneCase.msg, oneCase.expected[i], colorScale(i));
            }
        });
    });

})(jQuery, fluid);