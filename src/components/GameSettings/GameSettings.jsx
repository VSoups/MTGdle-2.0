import { useState } from 'react';
import { Sets } from '../../data/SetSelect';
import './GameSettings.css';

export default function GameSettings() {
    // State for saving user's custom list of sets to include for the game
    const [setIncludes, setSetIncludes] = useState([]);

    function handleSet(evt) {
        const inputVal = evt.target.value;
        let newList;

        if (!evt.target.checked) {
            // Make a new list of everything except the unchecked item
            newList = setIncludes.filter(val => val !== inputVal);
            console.log(`Item Removed: ${inputVal}`);
        } else {
            newList = [...setIncludes, inputVal];
            console.log(`Item Added: ${inputVal}`);
        }

        // update state with new copy
        setSetIncludes(newList);
        console.log(`New List: ${newList}`);
    }

    return (
        <div className="SettingsMenu">
            <button>Start Game</button>
            <form action="" className="GameSettings">
                <section className="setSelect">
                    <legend>Select Sets to include</legend>
                    { Sets.map((set, key) => 
                        <>
                            <input type="checkbox" value={set.acronym} onChange={handleSet} id={set.acronym} key={key} />
                            <label htmlFor={set.acronym}>{set.name}</label>
                        </>
                    )}
                </section>
            </form>
        </div>
    );
}