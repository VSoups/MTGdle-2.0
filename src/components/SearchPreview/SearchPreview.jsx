import './SearchPreview.css';

export default function SearchPreview({ searchCard, toggleFlip, artSelect, IMAGES, imageSelect }) {
    return (
        <>
            { searchCard && (
                // add card back image when card state is empty
                <img src={IMAGES[imageSelect]} className="ImgPreview" alt="Card Preview" />
            )}
            {/* flip for multisided cards */}
            { searchCard && searchCard.image_uris.back && (
                <button onClick={toggleFlip}>Flip ↺</button>
            )}
            {/* REFACTOR: rotate button for horizontal/upside down cards */}
            {/* BUG: select not resetting to "new" when changing cards */}
            { searchCard && (searchCard.image_uris.front.normal !== searchCard.first_print.image_uris.front.normal) && (
                <select onChange={artSelect} id="artSelect">
                    {/* REFACTOR: add set symbol to option text */}
                    <option value="new" >{searchCard.set_name}</option>
                    <option value="old">{searchCard.first_print.set_name}</option>
                </select>
            )}
        </>
    );
}