import { useEffect, useState } from "react";
import './GamePage.css';
import CardSearch from "../../components/CardSearch/CardSearch";
import CardAttributes from "../../components/CardAttributes/CardAttributes";
import SearchPreview from "../../components/SearchPreview/SearchPreview";
import GameGrid from "../../components/GameGrid/GameGrid";
import PostGameStats from "../../components/PostGameStats/PostGameStats";
import GameSettings from "../../components/GameSettings/GameSettings";

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
    // state for displaying game settings after clicking "start"
    const [startClicked, setStartClicked] = useState(false);
    // state for moving through game start steps (login > setSelect > difficulty)
    const [optionsStep, setOptionsStep] =useState(0); // make setup process a while loop? (break after X steps)
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
        setImageSelect(evt.target.value);
    }

    function startBtn() {
        startClicked ? setStartClicked(false) : setStartClicked(true);
    }

    return (
        <>
            <h1>MTGdle Unlimited</h1>
            
            <button onClick={startBtn} className="StartBtn" id={startClicked ? "hidden" : "visible"}>Start Game</button>
            <section className="GameSettings" id={startClicked ? "visible" : "hidden"} >
                {/* Move start button here? */}
                <GameSettings />
            </section>
            <section className="SearchCard">
                {/* Input form for card search */}
                <div style={{ marginRight: searchCard ? '2rem' : '0' }}>
                    <CardSearch setSearchCard={setSearchCard} cancelClicked={cancelClicked} setCancelClicked={setCancelClicked} setFlip={setFlip} setImageSelect={setImageSelect} />
                    { searchCard && (
                        <div className="CardInfo">
                            <CardAttributes searchCard={searchCard} cardLegals={cardLegals} FORMAT_COLOR={FORMAT_COLOR} />
                        </div>
                    )}
                </div>
                <div className="SearchPreview">
                    {/* Preview image of card */}
                    <SearchPreview searchCard={searchCard} toggleFlip={toggleFlip} artSelect={artSelect} IMAGES={IMAGES} imageSelect={imageSelect} />
                </div>
                <div className="SearchConfirm">
                    <button>Guess</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </section>
            <section className="GameGrid">
                {/* Card attribute comparison display (grid format) */}
                <GameGrid />
            </section>
            <section className="PostGameStats">
                {/* Hidden card reveal plus game stats */}
                <PostGameStats />
            </section>
        </>
    );
}