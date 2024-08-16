import { useEffect, useState } from 'react';
import './CardSearch.css'
import * as cardsAPI from '../../utilities/cards-api';

export default function CardSearch({ setSearchCard, cancelClicked, setCancelClicked, setFlip }) {
    const [card, setCard] = useState('');
    const [error, setError] = useState('');

    async function search(evt) {
        evt.preventDefault();
        // set card name string format for fuzzy search
        let inputCard = card.split(' ').join('+');

        try {
            // REFACTOR: check mongoDB first to not overload fetch calls
            const fetchCard = await cardsAPI.getCardByName(inputCard);
            // update flip state or else crash
            setFlip('front');
            if (typeof(fetchCard) === 'string') return setError('Search Error: card not found')
            console.log(fetchCard);
            setSearchCard(fetchCard);
            setError('');
        }   catch (err) {
            console.log(`Fetch error: ${err}`);
            setError('API Error');
        }   
    }

    useEffect(() => {
        if (cancelClicked) setCard('');
        setCancelClicked(false);
        setError('');
    }, [cancelClicked]);

    function handleInput(evt) {
        const cardName = evt.target.value;
        setCard(cardName);
    }

    return (
        <form onSubmit={search} className="SearchInput">
            <input type="text" name="name" onChange={handleInput} placeholder="Enter a card name" value={card} required />
            <button type="submit">Search</button>
            <p>{error}</p>
        </form>
    );
}