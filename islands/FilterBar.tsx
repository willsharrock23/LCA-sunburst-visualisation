import sunburstStructure from "../sunburst_data.ts";
import generateSmallPlot from "../generate_small_plot.ts";

export default function FilterBar() {

    const [parents, children, colourMap, values] = sunburstStructure();

    return (
        <div>
            <div className="row">
                <div className="col-3"><h6 style="text-align: center; padding-top: 10px">Select a node for deeper analysis:</h6></div>
                <div className="dropdown d-grid border rounded-2 col-2" style="padding: 0">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <input type="text" id="subplot-placeholder" placeholder="Select..." className="border-0"/>
                    </button>
                    <div className="dropdown-menu col-12" aria-labelledby="dropdownMenuButton">
                        {[...new Set(parents)].map((item, index) => {
                            return(
                                <button className="dropdown-item" onClick={(event: Event) => {
                                    const { target } = event 
                                    if (target) (document.getElementById("subplot-placeholder") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                                    generateSmallPlot();
                                    }} key={index} >{item}</button>
                                )    
                            })}
                    </div>
                </div>
                <div className="col-7"></div>
            </div>
        </div>
    );

}