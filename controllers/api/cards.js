const Card = require('../../models/card');

module.exports = {
    getCardByName,
};

async function getCardByName(req, res) {
    console.log(`Ctrl card name: ${req.params.cardName}`);
    const fetchCard = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${req.params.cardName}`)
    .then(res => res.json()).then(card => card);
    console.log(fetchCard);
}