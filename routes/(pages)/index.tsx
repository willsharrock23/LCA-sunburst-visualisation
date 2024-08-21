import Data from "./data.tsx";
import ClickToChange from "./clicktochange.tsx";
import DropdownGraph from "./dropdowngraph.tsx";
import BeforeAfter from "./beforeafter.tsx";

export default function Index() {
    
    return (
        <div className="tab-content" id="navTabContent">
            <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                <Data />
            </div>
            <div className="tab-pane fade" id="edit-scenario" role="tabpanel" aria-labelledby="edit-scenario-tab">
                <DropdownGraph />
            </div>
            <div className="tab-pane fade" id="edit-scenario1" role="tabpanel" aria-labelledby="edit-scenario-tab1">
                <ClickToChange />
            </div>
            <div className="tab-pane fade" id="edit-scenario2" role="tabpanel" aria-labelledby="edit-scenario-tab2">
                <BeforeAfter />
            </div>
        </div>
    );
}