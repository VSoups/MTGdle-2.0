const Card = require('../../models/card');

module.exports = {
    getCardByName,
};

async function getCardByName(req, res) {
    // fetch card json from Scryfall
    const fetchCard = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${req.params.cardName}`)
    .then(res => res.json()).then(card => card); 
    // console.log(`Card id ---- ${fetchCard.id} ----`);
    const card = await Card.findOne({id: fetchCard.id});

    // if card is not in DB, need to fetch oldest release through this poperty and manually add to saved object
    // prints_search_uri: String // separate fetch for array of all reprint objects ordered from newest to oldest

    // Search DB for preexisting card object

    // // Return data to front end (if/else)
    if (!card && !!fetchCard.id) {
        const newCard = await Card.create(fetchCard);
        console.log('Card created: ', newCard.name);
        res.json(newCard);
    // Find card in db if it does exist
    } else if (card)  {
        // const newCard = await Card.findOne({id: fetchCard.id});
        console.log('Card found: ', card.name)
        res.json(card);
    // User input invalid
    } else {
        console.log('Card not found');
        res.json('Card not found')
    }
}