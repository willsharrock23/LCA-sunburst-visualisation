import sunburstStructure from "../sunburst_data.ts";

export default function AfterGraph() {

    const [_parents, _children, _colourMap, graphCodeBefore] = sunburstStructure();

    return (
        <div style="height: 800px">
            <iframe srcDoc={graphCodeBefore} width="100%" height="100%" title="after-plot" id="plot-after"></iframe>
        </div>
    );

}