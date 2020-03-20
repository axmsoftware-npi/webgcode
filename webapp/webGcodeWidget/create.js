define(function () {
    return {
        addParam: function (elemId, style2D, style3D, styleEdit, gCode) {
            if (elemId && style2D && style3D && styleEdit && gCode) {
                if (!document.webGCodeParams) {
                    document.webGCodeParams = [];
                }
                const paramObject = {
                    //parent HTML element
                    rootElementId: elemId,
                    //stringed style of 2Dview element
                    style2D: style2D,
                    //show top view
                    //style2D: 'border: solid gray 1px;background: #000;height: 400px;',
                    //stringed style of 3Dview element
                    style3D: style3D,
                    styleEdit: styleEdit,
                    //show edit box with 'Sumilate' button. Drag&drop G-Code there, button click after edit launch the tool path rebuild.
                    //styleEdit: 'position: relative;float: left;width: 39%;height: 400px;padding: 1px;margin: 0;',
                    //G-Code to draw
                    gCode: gCode
                };

                //return inserted param index (last item index)
                return document.webGCodeParams.push(paramObject) - 1;
            } else {
                console.warn('WGC addParam missed it\'s parameter(s). Returning negative ID.');
                return -1;
            }
        }
    }
});