import sunburstStructure from "../../sunburst_data.ts";
import structureData from "../../data_restructure.ts";
import * as structure from "../../database/JSON/structure.json" with {type: "json"};

export default function ClickToChange() {

    const [parents, children, colourMap] = sunburstStructure();

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
        "branchvalues": 'total',
        "textposition": "inside",
        'insidetextorientation': 'radial'
    }]; 
        
    const layout = {
        "width": "100%", 
        "height": "750",
        "margin": {l: 35, r: 0, b: 0, t: 25},
        "padding": {l: 0, r: 0, b: 0, t: 0},
    };

    const [tableData, colourData] = structureData();
    const parentsSmallPlot = [""];
    const childrenSmallPlot = ["Level 0"];
    const colourListSmallPlot = [colourData[0]];
    const stringLength = structure.default[0].length;

    for (let i=0; i<tableData.length; i++) {
        parentsSmallPlot.push(tableData[i][0]);
        childrenSmallPlot.push(tableData[i][1]);
        colourListSmallPlot.push(colourData[i]);
    }

    const graphCode = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
            <script src="https://cdn.plot.ly/plotly-2.34.0.min.js" charset="utf-8"></script>
        </head>
        <body>
            <div class="row" style="height:100%;">
                <div class="col-6" id="main-plot"></div>
                <div class="col-6" id="sub-plot"></div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            <script> 
                var data = `+ JSON.stringify(data) + `;
                var layout = `+ JSON.stringify(layout) + `; 
                Plotly.newPlot('main-plot', data, layout, {showSendToCloud: true})
                    .then((plot) => {
                        plot.on('plotly_sunburstclick', () => false);
                        plot.on('plotly_sunburstclick', function(data) {
                            const selectedNode = data.points[0].label;
                            data.nextLevel = "Level 0";
                            console.log(data);
                            
                            const parentsSmallPlot = ${JSON.stringify(parentsSmallPlot)};
                            const childrenSmallPlot = ${JSON.stringify(childrenSmallPlot)};
                            const colourListSmallPlot = ${JSON.stringify(colourListSmallPlot)};
                            const stringLength = ${stringLength};
                            const testList = [];
                            const colourTestList = [];
                            let shortStorage = [];
                            childrenSmallPlot.forEach((child, index) => {
                                if (JSON.stringify(child) === JSON.stringify(selectedNode)) {
                                    testList.push(["", child]);
                                    colourTestList.push(colourListSmallPlot[index]);
                                }
                            })

                            parentsSmallPlot.forEach((parent, index) => {
                                if (JSON.stringify(parent) === JSON.stringify(selectedNode)) {
                                    testList.push([parent, childrenSmallPlot[index]]);
                                    colourTestList.push(colourListSmallPlot[index]);
                                    shortStorage.push(childrenSmallPlot[index]);
                                };

                                let i=0;
                                while (i < stringLength -1) {
                                    parentsSmallPlot.forEach((parent, index) => {
                                        if (shortStorage.includes(parent)) {
                                            testList.push([parent, childrenSmallPlot[index]]);
                                            colourTestList.push(colourListSmallPlot[index]);
                                            shortStorage.push(childrenSmallPlot[index]);
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

                            const dataSmall = [{
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
                                
                            const layoutSmall = {
                                "width": "100%", 
                                "height": "750",
                                "margin": {l: 35, r: 0, b: 0, t: 25},
                                "padding": {l: 0, r: 0, b: 0, t: 0},
                            };

                            Plotly.newPlot('sub-plot', dataSmall, layoutSmall, {showSendToCloud: true}); 
                            subPlot = document.getElementById("sub-plot");

                        });
                        plot.on('plotly_sunburstclick', () => false);
                    }); 
                    myPlot = document.getElementById("main-plot");
            </script>
        </body>
    </html>`;

    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1 bg-secondary" style="height: 895px; border-right: 3px solid grey"></div>
                        <div className="col-10 pl-0 pr-0" style="padding: 0px">
                        <div className="d-flex justify-content-around pt-2" style="background-color: rgb(240,240,240);">
                            <h3>Main Plot</h3>
                            <h3>Sub Plot</h3>
                        </div>
                            <hr style="padding:0; margin:0"></hr>
                            <div className="row">
                                <div className="col-12" style="height: 800px" id="sunburst-plot">
                                    <iframe srcDoc={ graphCode } width="100%" height="100%" title="main-plot"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 bg-secondary" style="height: 895px; border-right: 3px solid grey"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}