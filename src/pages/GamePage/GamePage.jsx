import { useState } from "react";
import './GamePage.css';
import CardSearch from "../../components/CardSearch/CardSearch";

export default function GamePage() {
    // state containing user card input object
    const [searchCard, setSearchCard] = useState(null);

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
                            {/* Showing blank for 0 cmc cards */}
                            <p>Mana Cost: {searchCard.mana_cost}</p>
                            <p>Keywords:</p>
                        </div>
                    )}
                </div>
                <div className="SearchPreview">
                    {/* Preview image of card */}
                    { searchCard && (
                        <>
                            <img src={searchCard.image_uris.normal} className="ImgPreview" alt="Card Preview" />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}