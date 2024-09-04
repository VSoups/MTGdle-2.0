import { useState } from 'react';
import { Sets } from '../../data/SetSelect';
import './GameSettings.css';
import helpIcon from '../../Icons/help-icon-png-0-158211801.jpg';


export default function GameSettings() {
    // State for saving user's custom list of sets to include for the game
    const [setIncludes, setSetIncludes] = useState([]);
    // State for revealing/hiding color legend in SetSelect section
    const [legendOpen, setLegendOpen] = useState(false);

    function handleSet(evt) {
        const inputVal = evt.target.value;
        let newList;

        if (!evt.target.checked) {
            // Make a new list of everything except the unchecked item
            newList = setIncludes.filter(val => val !== inputVal);
            // console.log(`Item Removed: ${inputVal}`);
        } else {
            newList = [...setIncludes, inputVal];
            // console.log(`Item Added: ${inputVal}`);
        }

        // update state with new copy
        setSetIncludes(newList);
        // console.log(`New List: ${newList}`);
    }

    // onClick function for HelpIcon img element
    function showLegend() {
        legendOpen === true ? setLegendOpen(false) : setLegendOpen(true);
    }

    return (
        <div className="SettingsMenu">
            <form action="" className="SettingsForm">
                <section className="SetSelect">
                    <h3>Select Sets to include:</h3>
                    <div className="FormatSelectDiv">
                        <select id="FormatSelect">
                            <option>-- Select by format --</option>
                            <option value="all">All (Vintage/Commander)</option>
                            <option value="standard">Standard</option>
                            <option value="pioneer">Pioneer</option>
                            <option value="modern">Modern</option>
                            {/* Redundant because of shared card pool with vintage? */}
                            {/* <option value="commander">Commander</option> */}
                        </select>
                    </div>
                    <div className={legendOpen ? "SetLegend" : "SetLegend LegendOff"}>
                        <img src={helpIcon} onClick={showLegend} id="HelpIcon" alt="Question mark icon" />
                        <p>Color Legend:</p>
                        <ul>
                            <li className="LegendGreen">Standard</li>
                            <li className="LegendBlue">Supplimental</li>
                            <li className="LegendOrange">Modern</li>
                            <li className="LegendRed">Commander</li>
                            <li className="LegendPurple">Compilation</li>
                            {/* Might not be worth adding */}
                            {/* <li className="LegendGray">Un-Set</li> */}
                        </ul>
                    </div>
                    { Sets.map((set, key) => 
                        <div className={`SetSelectOption ${setIncludes.includes(set.acronym) ? "Checked" : ""}`}>
                            <label htmlFor={set.acronym} style={{ color: set.type }}>{set.name}</label>
                            <input type="checkbox" value={set.acronym} onChange={handleSet} id={set.acronym} key={key} />
                        </div>
                    )}
                </section>
            </form>
        </div>
    );
}