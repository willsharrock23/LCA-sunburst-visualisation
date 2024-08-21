import tabledataexport from "../tabledataexport.ts";
import structureData from "../data_restructure.ts";
import * as tablecolors from "../database/JSON/tablecolours.json" with { type: "json" };

import { Check } from "lucide-preact";

const [[cColumn1, cColumn2, cColumn3, cColumn4, cColumn5], [rColumn1, rColumn2, rColumn3, rColumn4, rColumn5]] = tabledataexport();

interface EditDataProps {
    node?: string;
    risk?: string;
}

function editData({ node, risk }: EditDataProps) {
    const [tableData, colorData] = structureData();
    const parents = [""];
    const children = ["Level 0"];
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

    children.forEach((child, index) => {
        if (JSON.stringify(child) === JSON.stringify(node)) {
            console.log(colourMap[index]);
            colourMap[index] = Number(risk);
            console.log(child);
            console.log(risk);
        }
    });

    const dataAfter = [{
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

    const graphCodeAfter = `<!DOCTYPE html>
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
                + JSON.stringify(dataAfter) +
                `;var layout = `
                + JSON.stringify(layout) + 
                `; Plotly.newPlot('main-plot', data, layout, {showSendToCloud: true}); myPlot = document.getElementById("main-plot");
            </script>
        </body>
    </html>`;

    document.getElementById("plot-after")?.setAttribute("srcdoc", graphCodeAfter)
}

export default function TableData() {

    return (
        <div className="row">
            <div className="col-1"></div>

            <div className="col-2" style="padding: 0; margin: 10px; border: 1px solid black">
                <table className="table-bordered" width="100%">
                    <thead className="table-secondary">
                        <tr height="45px">
                            <th scope="col" width="50%" style="text-align: center">Node</th>
                            <th scope="col" width="50%" style="text-align: center">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cColumn1.map((value, index) => {
                            return (
                                <tr key={index} height="40px">
                                    <td id={JSON.stringify(value + index)} style={tablecolors.default[rColumn1[index]]}>
                                        {value}
                                    </td>
                                    <td style="text-align: center" className="bg-white">
                                        <div className="d-flex justify-content-between">
                                        <div></div>
                                        <div contentEditable id={JSON.stringify(value)}>{rColumn1[index]}</div>
                                            <button className="btn btn-success p-0" style="height:26px; width:26px;" onClick={() => {
                                                editData( { node: value, risk: document.getElementById(JSON.stringify(value))?.innerText });
                                                if (document.getElementById(JSON.stringify(value))?.innerText === "1") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #70AD47; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "2") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FFFF00; color: black; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "3") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #ED7D31; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "4") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FF0000; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "5") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: rgb(0,0,0); color: white; text-align: center; border: 1px solid black");
                                                }
                                                }}><Check /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-2" style="padding: 0; margin: 10px; border: 1px solid black">
                <table className="table-bordered" width="100%">
                    <thead className="table-secondary">
                        <tr height="45px">
                            <th scope="col" width="50%" style="text-align: center">Node</th>
                            <th scope="col" width="50%" style="text-align: center">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cColumn2.map((value, index) => {
                            return (
                                <tr key={index} height="40px">
                                    <td id={JSON.stringify(value + index)} style={tablecolors.default[rColumn2[index]]}>
                                        {value}
                                    </td>
                                    <td style="text-align: center" className="bg-white">
                                        <div className="d-flex justify-content-between">
                                        <div></div>
                                        <div contentEditable id={JSON.stringify(value)}>{rColumn2[index]}</div>
                                            <button className="btn btn-success p-0" style="height:26px; width:26px;" onClick={() => {
                                                editData( { node: value, risk: document.getElementById(JSON.stringify(value))?.innerText });
                                                if (document.getElementById(JSON.stringify(value))?.innerText === "1") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #70AD47; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "2") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FFFF00; color: black; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "3") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #ED7D31; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "4") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FF0000; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "5") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: rgb(0,0,0); color: white; text-align: center; border: 1px solid black");
                                                }
                                                }}><Check /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-2" style="padding: 0; margin: 10px; border: 1px solid black">
                <table className="table-bordered" width="100%">
                    <thead className="table-secondary">
                        <tr height="45px">
                            <th scope="col" width="50%" style="text-align: center">Node</th>
                            <th scope="col" width="50%" style="text-align: center">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cColumn3.map((value, index) => {
                            return (
                                <tr key={index} height="40px">
                                    <td id={JSON.stringify(value + index)} style={tablecolors.default[rColumn3[index]]}>
                                        {value}
                                    </td>
                                    <td style="text-align: center" className="bg-white">
                                        <div className="d-flex justify-content-between">
                                        <div></div>
                                        <div contentEditable id={JSON.stringify(value)}>{rColumn3[index]}</div>
                                            <button className="btn btn-success p-0" style="height:26px; width:26px;" onClick={() => {
                                                editData( { node: value, risk: document.getElementById(JSON.stringify(value))?.innerText });
                                                if (document.getElementById(JSON.stringify(value))?.innerText === "1") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #70AD47; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "2") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FFFF00; color: black; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "3") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #ED7D31; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "4") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FF0000; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "5") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: rgb(0,0,0); color: white; text-align: center; border: 1px solid black");
                                                }
                                                }}><Check /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-2" style="padding: 0; margin: 10px; border: 1px solid black">
                <table className="table-bordered" width="100%">
                    <thead className="table-secondary">
                        <tr height="45px">
                            <th scope="col" width="50%" style="text-align: center">Node</th>
                            <th scope="col" width="50%" style="text-align: center">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cColumn4.map((value, index) => {
                            return (
                                <tr key={index} height="40px">
                                    <td id={JSON.stringify(value + index)} style={tablecolors.default[rColumn4[index]]}>
                                        {value}
                                    </td>
                                    <td style="text-align: center" className="bg-white">
                                        <div className="d-flex justify-content-between">
                                        <div></div>
                                        <div contentEditable id={JSON.stringify(value)}>{rColumn4[index]}</div>
                                            <button className="btn btn-success p-0" style="height:26px; width:26px;" onClick={() => {
                                                editData( { node: value, risk: document.getElementById(JSON.stringify(value))?.innerText });
                                                if (document.getElementById(JSON.stringify(value))?.innerText === "1") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #70AD47; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "2") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FFFF00; color: black; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "3") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #ED7D31; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "4") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FF0000; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "5") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: rgb(0,0,0); color: white; text-align: center; border: 1px solid black");
                                                }
                                                }}><Check /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-2" style="padding: 0; margin: 10px; border: 1px solid black">
                <table className="table-bordered" width="100%">
                    <thead className="table-secondary">
                        <tr height="45px">
                            <th scope="col" width="50%" style="text-align: center">Node</th>
                            <th scope="col" width="50%" style="text-align: center">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cColumn5.map((value, index) => {
                            return (
                                <tr key={index} height="40px">
                                    <td id={JSON.stringify(value + index)} style={tablecolors.default[rColumn5[index]]}>
                                        {value}
                                    </td>
                                    <td style="text-align: center" className="bg-white">
                                        <div className="d-flex justify-content-between">
                                        <div></div>
                                        <div contentEditable id={JSON.stringify(value)}>{rColumn5[index]}</div>
                                            <button className="btn btn-success p-0" style="height:26px; width:26px;" onClick={() => {
                                                editData( { node: value, risk: document.getElementById(JSON.stringify(value))?.innerText });
                                                if (document.getElementById(JSON.stringify(value))?.innerText === "1") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #70AD47; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "2") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FFFF00; color: black; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "3") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #ED7D31; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "4") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: #FF0000; color: white; text-align: center; border: 1px solid black");
                                                } else if (document.getElementById(JSON.stringify(value))?.innerText === "5") {
                                                    document.getElementById(JSON.stringify(value + index))?.setAttribute("style", "background-color: rgb(0,0,0); color: white; text-align: center; border: 1px solid black");
                                                }
                                                }}><Check /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-1"></div>
        </div>
    )
}