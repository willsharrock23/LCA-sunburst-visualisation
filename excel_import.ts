import * as XLSX from "xlsx";

async function excel_import() {

    const workbook = XLSX.readFile("database/Excel/Input_Data.xlsx", { type: "binary" });
    const structure = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header: 1});
    let column = 0;
    structure.forEach((row) => {
        structure.forEach((row) => column = row[0] = (row[0] != null ? row[0] : column));
        structure.forEach((row) => column = row[1] = (row[1] != null ? row[1] : column));
        structure.forEach((row) => column = row[2] = (row[2] != null ? row[2] : column));
        structure.forEach((row) => column = row[3] = (row[3] != null ? row[3] : column));
    })
    const values = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], {header: 1});
    values.forEach((row) => {
        values.forEach((row) => column = row[0] = (row[0] != null ? row[0] : column));
        values.forEach((row) => column = row[1] = (row[1] != null ? row[1] : column));
        values.forEach((row) => column = row[2] = (row[2] != null ? row[2] : column));
    });
    await Deno.writeTextFile("database/JSON/structure.json", JSON.stringify(structure));
    await Deno.writeTextFile("database/JSON/values.json", JSON.stringify(values));
    console.log('\x1b[32m%s\x1b[0m', "Data successfully imported.");
}

export default excel_import;