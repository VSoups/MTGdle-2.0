import { useEffect, useState } from "react";
import './GamePage.css';
import CardSearch from "../../components/CardSearch/CardSearch";

export default function GamePage() {
    // state containing user card input object
    const [searchCard, setSearchCard] = useState(null);
    // contains card legalities so only relevant formats are listed/tracked
    const [cardLegals, setCardLegals] = useState(null);
    // clicking cancel clears searchbar text
    const [cancelClicked, setCancelClicked] = useState(false);
    // state for flipping double sided card img
    const [flip, setFlip] = useState('front');
    // state for image preview select
    const [imageSelect, setImageSelect] = useState('new');
    // ICEBOX: Add state to allow changing preview img art (dropdown)
    // format value colors
    const FORMAT_COLOR = {
        'legal': 'green',
        'not_legal': 'gray',
        'banned': 'red',
        'restricted': 'blue',
    };
    // image selector values
    const IMAGES = {
        'new': (searchCard) ? searchCard.image_uris[flip].normal : null,
        'old': (searchCard) ? searchCard.first_print.image_uris[flip].normal : null
    }

    useEffect(() => {
        if (searchCard) {
            // potentially change or move for user customization (game settings)
            const formatNames = ['standard', 'commander', 'legacy', 'modern', 'pauper', 'pioneer', 'vintage'];
            // legality object shorthand
            const allLegs = Object.entries(searchCard.legalities);
            // updated legals obj
            const filterLegs = allLegs.filter(([key]) =>
                formatNames.includes(key)
            );

            // after successful search, reset interactable states
            setCancelClicked(false);
            setFlip('front');
            setImageSelect('new');
            
            // loop over legalities array and save to state so code is dry
            const newLegs = {};
            filterLegs.forEach(([key, value]) => newLegs[key] = value);
            // update state with filtered list
            setCardLegals(newLegs);

        } else setCardLegals(null);
    }, [searchCard]);

    function cancelBtn() {
        setSearchCard(null);
        // cancel clears searchbar in CardSearch component
        setCancelClicked(true);
    }

    function toggleFlip() {
        flip === 'front' ? setFlip('back') : setFlip('front');
    }

    function artSelect(evt) {
        console.log(evt.target.value);
        console.log(`searchCard${evt.target.value}${flip}.normal`)
        setImageSelect(evt.target.value);
    }

    return (
        <>
            <h1>MTGdle</h1>
            
            <section className="SearchCard">
                {/* Input form for card search */}
                <div style={{ marginRight: searchCard ? '2rem' : '0' }}>
                    <CardSearch setSearchCard={setSearchCard} cancelClicked={cancelClicked} setCancelClicked={setCancelClicked} setFlip={setFlip} setImageSelect={setImageSelect} />
                    { searchCard && (
                        <div className="CardInfo">
                            <p><span className="InfoHeader">Card Name:</span> {searchCard.name}</p>
                            <p><span className="InfoHeader">First Printing:</span> {searchCard.first_print.release_date}</p>
                            <p><span className="InfoHeader">Origin Set:</span> {searchCard.first_print.set_name}</p>
                            <p><span className="InfoHeader">Type:</span> {searchCard.type_line}</p>
                            <p><span className="InfoHeader">Mana Cost:</span> {searchCard.mana_cost || "None"}</p>
                            {/* fix listing & add "None" alt */}
                            <p><span className="InfoHeader">Keywords:</span> {searchCard.keywords.map(kw => (
                                `${kw} | `
                            ))}</p>
                            {/* taken from useEffect */}
                            <p><span className="InfoHeader">Legalities:</span></p>
                            { cardLegals && (
                                <ul className="LegalityList">
                                    {/* BUG: Capitalize format name and remove underscore from "not_legal" */}
                                    { Object.entries(cardLegals).map(([key, value]) => 
                                        <li>{key}: <span style={{ color: FORMAT_COLOR[value] || 'black' }}>{value}</span></li>
                                    ) }
                                </ul>
                            )}
                        </div>
                    )}
                </div>
                <div className="SearchPreview">
                    {/* Preview image of card */}
                    { searchCard && (
                        // add card back image when card state is empty
                        <img src={IMAGES[imageSelect]} className="ImgPreview" alt="Card Preview" />
                    )}
                    {/* flip for multisided cards */}
                    { searchCard && searchCard.image_uris.back && (
                        <button onClick={toggleFlip}>Flip ↺</button>
                    )}
                    {/* REFACTOR: rotate button for horizontal/upside down cards */}
                    {/* dropdown art select if different */}
                    {/* BUG: select not resetting to "new" when changing cards */}
                    { searchCard && (searchCard.image_uris.front.normal !== searchCard.first_print.image_uris.front.normal) && (
                        <select onChange={artSelect} id="artSelect">
                            <option value="new">{searchCard.set_name}</option>
                            <option value="old">{searchCard.first_print.set_name}</option>
                        </select>
                    )}
                </div>
                <div className="SearchConfirm">
                    <button>Guess</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </section>
        </>
    );
}