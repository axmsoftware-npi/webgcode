define(function () {
    return {
        removeParam: function (index) {
            if (document.webGCodeParams) {
                if (document.webGCodeParams.length) {
                    //remove element by index if it is exists
                    if (index < document.webGCodeParams.length - 1) {
                        document.webGCodeParams.splice(index, 1);
                    } else {
                        console.warn('wgcRemoveParam value is out of range.');
                    }
                    //if no elements left - remove webGCodeParams at all
                    if (!document.webGCodeParams.length) {
                        delete document.webGCodeParams;
                    }
                } else {
                    delete document.webGCodeParams;
                }
            }
        }
    }
});