import * as structure from "./database/JSON/structure.json" with { type: "json" };
import * as values from "./database/JSON/values.json" with { type: "json" };

export default function structureData() {

    const tableData : string[][]= [];
    const colorData : number[]= [];

    for (let i=0; i<structure.default.length; i++) {
        const structureRow = structure.default[i];
        const valuesRow = values.default[i];
        for (let j=0; j<structureRow.length; j++) {
            if (structureRow[j] != null && structureRow[j+1] != null) {
                tableData.push([structureRow[j], structureRow[j+1]]);
                colorData.push(valuesRow[j]);
            }
        }
    }

    return [tableData, colorData];
}