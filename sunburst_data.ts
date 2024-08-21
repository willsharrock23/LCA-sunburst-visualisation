import structureData from "./data_restructure.ts";

export default function sunburstStructure() {

    const [tableData, colorData] = structureData();
    const parents = [""];
    const children = ["Level 0"];
    const values = [];
    const colourMap = [colorData[0]];

    for (let i=0; i<tableData.length; i++) {
        parents.push(tableData[i][0]);
        children.push(tableData[i][1]);
        colourMap.push(colorData[i]);
        if ((new Set(children)).size !== children.length) {
            children.pop();
            parents.pop();
            colourMap.pop();
        }
    };

    children.forEach((child) => {
        if (parents.includes(child)) {
            values.push(parents.filter((x) => x == child).length);
        } else {
            values.push(1);
        }
    })

    const data = [{
        'type': 'sunburst',
        'labels': children,
        'parents': parents,
        'leaf': {'opacity': 1},
        'marker': {
            "line": {"width": 2},
            "colors": colourMap,
            "cmin": 1,
            "cmax": 5,
            "colorscale": [
                [0, '#70AD47'], [0.25, '#FFFF00'], [0.5, '#ED7D31'], [0.75, '#FF0000'], [1, 'rgb(0,0,0)']
            ],
            "showscale": false,
            "autocolorscale": false,
        },
        "textinfo": "value",
        "branchvalues": 'total',
        'insidetextorientation': 'radial'
    }]; 

    const layout = {
        "width": "100%", 
        "height": "750",
        "margin": {l: 35, r: 0, b: 0, t: 25},
        "padding": {l: 0, r: 0, b: 0, t: 0},
    };

    const graphCodeBefore = `<!DOCTYPE html>
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

    return [parents, children, colourMap, graphCodeBefore];
}