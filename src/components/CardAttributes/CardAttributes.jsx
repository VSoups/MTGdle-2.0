import './CardAttributes.css';

export default function CardAttributes({ searchCard, cardLegals, FORMAT_COLOR }) {
    return (
        <>
            <p><span className="InfoHeader">Card Name:</span> {searchCard.name}</p>
            <p><span className="InfoHeader">First Printing:</span> {searchCard.first_print.release_date}</p>
            <p><span className="InfoHeader">Origin Set:</span> {searchCard.first_print.set_name}</p>
            <p><span className="InfoHeader">Type:</span> {searchCard.type_line}</p>
            <p><span className="InfoHeader">Mana Cost:</span> {searchCard.mana_cost || "None"}</p>
            {/* fix listing & add "None" alt */}
            <p><span className="InfoHeader">Keywords:</span> {
                searchCard.keywords.length ? searchCard.keywords.map(kw => (`${kw}, `)) : 'None'
            }</p>
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
        </>
    )
}