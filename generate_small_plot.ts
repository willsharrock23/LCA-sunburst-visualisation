import structureData from "./data_restructure.ts";
import * as structure from "./database/JSON/structure.json" with {type: "json"};

export default function generateSmallPlot() {

    const [tableData, colourData] = structureData();
    const parents = [""];
    const children = ["Level 0"];
    const colourList = [colourData[0]];

    for (let i=0; i<tableData.length; i++) {
        parents.push(tableData[i][0]);
        children.push(tableData[i][1]);
        colourList.push(colourData[i]);
    }

    const selectedNode = (document.getElementById("subplot-placeholder") as HTMLInputElement).value;

    const testList = [];
    const colourTestList = [];
    let shortStorage = [];
    children.forEach((child, index) => {
        if (JSON.stringify(child) === JSON.stringify(selectedNode)) {
            testList.push(["", child]);
            colourTestList.push(colourList[index]);
        }
    })
    parents.forEach((parent, index) => {
        if (JSON.stringify(parent) === JSON.stringify(selectedNode)) {
            testList.push([parent, children[index]]);
            colourTestList.push(colourList[index]);
            shortStorage.push(children[index]);
            };
            
    let i=0;
    while (i < structure.default[0].length -1) {
        parents.forEach((parent, index) => {
            if (shortStorage.includes(parent)) {
                testList.push([parent, children[index]]);
                colourTestList.push(colourList[index]);
                shortStorage.push(children[index]);
            }
        });
        shortStorage = [];
        i++;
    }
    });

    const completeArray = [];
    colourTestList.forEach((colour, index) => {
        completeArray.push([testList[index][0], testList[index][1], colour]);
    })

    const subPlotChildren = [];
    const subPlotParents = [];
    const subPlotColour = [];
    completeArray.forEach((row) => {
        subPlotParents.push(row[0]);
        subPlotChildren.push(row[1]);
        subPlotColour.push(row[2]);
        if ((new Set(subPlotChildren)).size !== subPlotChildren.length) {
            subPlotChildren.pop();
            subPlotParents.pop();
            subPlotColour.pop();
        }
    });

    // Generate code for sub-plot
    const data = [{
        'type': 'sunburst',
        'labels': subPlotChildren,
        'parents': subPlotParents,
        'leaf': {'opacity': 1},
        'marker': {
            "line": {"width": 2},
            "colors": subPlotColour,
            "cmin": 1,
            "cmax": 5,
            "colorscale": [
                [0, '#70AD47'], [0.25, '#FFFF00'], [0.5, '#ED7D31'], [0.75, '#FF0000'], [1, 'rgb(0,0,0)']
            ],
            "showscale": false,
            "autocolorscale": false,
        },
        "branchvalues": 'total',
        'insidetextorientation': 'radial'
    }]; 
        
    const layout = {
        "width": "100%", 
        "height": "750",
        "margin": {l: 35, r: 0, b: 0, t: 25},
        "padding": {l: 0, r: 0, b: 0, t: 0},
    };

    const graphCode = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
            <script src="https://cdn.plot.ly/plotly-2.34.0.min.js" charset="utf-8"></script>
        </head>
        <body>
            <div id="left-column" style="height:100%;">
            <div id="main-plot"></div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            <script> 
                var data = `
                + JSON.stringify(data) +
                `;var layout = `
                + JSON.stringify(layout) + 
                `; Plotly.newPlot('main-plot', data, layout, {showSendToCloud: true}); myPlot = document.getElementById("main-plot");
            </script>
        </body>
    </html>`;

    document.getElementById("smallgraph")?.setAttribute("srcdoc", graphCode);
};