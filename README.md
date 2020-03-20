# API wrapper for Webgcode

This branch implements API wrapper for the source [Webgcode's](https://github.com/nraynaud/webgcode) web tool path visualization module. Original structure not maintained, remove as not focused part.

## How it works
Widget will create all inner components and insert them into the given rootElement. The toolpath generation itself happens into 2 workers (worker.js from the same dir). It strongly tied to the external code that bundled into the second bundle (webGcodeWidget.worker.bundle).
Worker implementation (definition and calls) could be rewrote for the single JS bundle sake and loading/processing speed. But it requires an additional time.

## Project structure

- bundler - scripts to use with r.js (require.js optimization tool that used for bundling)
- dist - compiled and usable files
    - require.min.js (shared minified require.js lib)
    - spinner.svg
    - webGcodeWidget.bundle.js (bundle for entire widget)
    - webGcodeWidget.worker.bundle.js (bundle for worker)
    - wgc.min.css
- example
    - index.html - example page
- src - source Webgcode (mainly, original webgcode/webapp folder)

## How to run example
### Environment set up
If not installed NodeJS - install from https://nodejs.org/uk/download/
If not installed npx - install from https://www.npmjs.com/package/npm

### Run
1. In the cloned repo root folder run console command:
```sh
npx http-server -p 9292
```
2. Open in browser: http://127.0.0.1:9292/example

## Usage
1. Inject base styles.
```html
<link rel="stylesheet" href="../dist/wgc.min.css" type="text/css">
```
2. Create parent HTML element beforehand. It's ID shold be passed to API wrapper as a parameter.
```html
<div id="app1" class="app"></div>
```
3. Insert require.js script & widget bundled lib before the first widget call. /dist folder contains all necessary and ready-to-use minified, uglyfied files. Including css, svg.
```html
<script src="../dist/require.min.js"></script>
<script src="../dist/webGcodeWidget.bundle.js"></script>
```
4. Insert widget call script with it's parameters.
```html
require(['webGcodeWidget/main'], function (wgcMain) {
    wgcMain.visualize(
    ...
    );
});
```
5. The parameters for wgcMain.visualize():
    1. rootElementId: string - ID of the parent containing widget element
    2. style2D: string - 2DView stringified CSS
    3. style3D: string - 3DView stringified CSS
    4. styleEdit: string - EditView stringified CSS
    5. gCode: string - G-Code path to draw
6. worker.js must be placed in the same folder with your page

## Multiple usage
On the same page there could be added a few widgets. Each will have own parameters (rootElement, hidden/visible 2D window, visible 3D window, edit window with 'Simulate' button (section supports drag&drop with following simulation run), gCode). The most of inner widget elements have own ID or CLASS to be additionally styled via CSS.

## Function call example
```js
    require(['webGcodeWidget/main'], function (wgcMain) {
        wgcMain.visualize(
                'app1', //rootElementId
                'display: none;border: solid gray 1px;background: #000;height: 400px;', //style2D
                'border: solid gray 1px;background: #000;height: 400px;position: relative;', //style3D
                'display: none;position: relative;float: left;width: 39%;height: 400px;padding: 1px;margin: 0;', //styleEdit
                `G0 Y10 Z-5
                G1 Z-10
                G1 Y20
                G02 X10 Y30 R10
                G1 X30
                ...` //gCode
        );
    });
```