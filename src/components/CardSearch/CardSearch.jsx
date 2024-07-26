import { useState } from 'react';
import * as cardsAPI from '../../utilities/cards-api';

export default function CardSearch({ setSearchCard }) {
    const [card, setCard] = useState('');
    const [error, setError] = useState('');

    async function search(evt) {
        evt.preventDefault();
        // set card name string format for fuzzy search
        let inputCard = card.split(' ').join('+');

        try {
            const fetchCard = await cardsAPI.getCardByName(inputCard);
            console.log(fetchCard);
        }   catch (err) {
            console.log(`Fetch error: ${err}`);
            setError('Search Error: Card not found');
        }   
    }

    function handleInput(evt) {
        const cardName = evt.target.value;
        setCard(cardName);
    }

    return (
        <form onSubmit={search} className="CardSearch">
            <input type="text" name="name" onChange={handleInput} placeholder="Enter a card name" />
            <button type="submit">Search</button>
            <p>{error}</p>
        </form>
    );
}