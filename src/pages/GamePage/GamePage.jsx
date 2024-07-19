import { useState } from "react";
import CardSearch from "../../components/CardSearch/CardSearch";

export default function GamePage() {
    // state containing user card input object
    const [searchCard, setSearchCard] = useState(null);

    return (
        <>
            <h1>MTGdle</h1>
            
            <section className="SearchCard">
                {/* Input form for card search */}
                <div className="SearchInput">
                    <CardSearch setSearchCard={setSearchCard} />
                </div>
                <div className="SearchPreview">
                    {/* Preview image of card */}
                </div>
            </section>
        </>
    );
}