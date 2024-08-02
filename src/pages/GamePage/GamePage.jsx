import { useEffect, useState } from "react";
import './GamePage.css';
import CardSearch from "../../components/CardSearch/CardSearch";

export default function GamePage() {
    // state containing user card input object
    const [searchCard, setSearchCard] = useState(null);
    // contains card legalities so only relevant formats are listed/tracked
    const [cardLegals, setCardLegals] = useState(null);
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
            
            // loop over legalities array and save to state so code is dry
            const newLegs = {};
            filterLegs.forEach(([key, value]) => newLegs[key] = value);
            // update state with filtered list
            setCardLegals(newLegs);

        } else setCardLegals(null);
    }, [searchCard]);

    function clearCard() {
        setSearchCard(null);
        // clear search bar in CardSearch component
    }

    return (
        <>
            <h1>MTGdle</h1>
            
            <section className="SearchCard">
                {/* Input form for card search */}
                <div>
                    <CardSearch setSearchCard={setSearchCard} />
                    { searchCard && (
                        <div>
                            <p>Card Name: {searchCard.name}</p>
                            <p>Type: {searchCard.type_line}</p>
                            <p>Mana Cost: {searchCard.mana_cost || "None"}</p>
                            {/* fix listing & add "None" alt */}
                            <p>Keywords: {searchCard.keywords.map(kw => (
                                `| ${kw} |`
                            ))}</p>
                            {/* taken from useEffect */}
                            <p>Legalities:</p>
                            { cardLegals && (
                                <ul className="LegalityList">
                                    {/* might break if empty? */}
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
                        <img src={searchCard.image_uris.normal} className="ImgPreview" alt="Card Preview" />
                    )}
                </div>
                <div className="SearchConfirm">
                    <button>Guess</button>
                    <button onClick={clearCard}>Cancel</button>
                </div>
            </section>
        </>
    );
}