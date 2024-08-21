import structureData from "./data_restructure.ts";

export type EditDataProps = {
    node: string;
    risk: string;
}

export default function editData({ node, risk }: EditDataProps) {

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

    children.forEach((child, index) => {
        if (JSON.stringify(child) === JSON.stringify(node)) {
            colourMap[index] = Number(risk);
        }
    })

    return [parents, children, colourMap, values];

}