import sunburstStructure from "./sunburst_data.ts";

export default function tabledataexport() {

    const [_parents, children, colourData, _values] = sunburstStructure();
    const [cColumn1, cColumn2, cColumn3, cColumn4, cColumn5] = [[],[],[],[],[]];
    const [rColumn1, rColumn2, rColumn3, rColumn4, rColumn5] = [[],[],[],[],[]];

    for (let i=0; i<children.length; i++) {
        if (i%5 === 0) {
            cColumn1.push(children[i]);
            rColumn1.push(colourData[i]);
        }
        if (i%5 === 1) {
            cColumn2.push(children[i]);
            rColumn2.push(colourData[i]);
        }
        if (i%5 === 2) {
            cColumn3.push(children[i]);
            rColumn3.push(colourData[i]);
        }
        if (i%5 === 3) {
            cColumn4.push(children[i]);
            rColumn4.push(colourData[i]);
        }
        if (i%5 === 4) {
            cColumn5.push(children[i]);
            rColumn5.push(colourData[i]);
        }
    };

    return (
        [[cColumn1, cColumn2, cColumn3, cColumn4, cColumn5], [rColumn1, rColumn2, rColumn3, rColumn4, rColumn5]]
    );
}