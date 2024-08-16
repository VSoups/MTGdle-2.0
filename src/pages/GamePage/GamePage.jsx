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
    // state for flipping double sided card img (default: 'front')
    const [flip, setFlip] = useState('front');
    // ICEBOX: Add state to allow changing preview img art (dropdown)
    // format value colors
    const FORMAT_COLOR = {
        'legal': 'green',
        'not_legal': 'gray',
        'banned': 'red',
        'restricted': 'blue',
    };

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

            // after successful search, reset cancel so it can be used again
            setCancelClicked(false);

            // after successful search, reset flip btn
            setFlip('front');
            
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

    return (
        <>
            <h1>MTGdle</h1>
            
            <section className="SearchCard">
                {/* Input form for card search */}
                <div style={{ marginRight: searchCard ? '2rem' : '0' }}>
                    <CardSearch setSearchCard={setSearchCard} cancelClicked={cancelClicked} setCancelClicked={setCancelClicked} setFlip={setFlip} />
                    { searchCard && (
                        <div className="CardInfo">
                            <p><span className="InfoHeader">Card Name:</span> {searchCard.name}</p>
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
                        <img src={searchCard.image_uris[flip].normal} className="ImgPreview" alt="Card Preview" />
                    )}
                    {/* flip for multisided cards */}
                    { searchCard && searchCard.image_uris.back && (
                        <button onClick={toggleFlip}>Flip ↺</button>
                    )}
                    {/* REFACTOR: flip for rotating/horizontal cards */}
                </div>
                <div className="SearchConfirm">
                    <button>Guess</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </section>
        </>
    );
}