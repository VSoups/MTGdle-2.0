const Card = require('../../models/card');

module.exports = {
    getCardByName,
    generateRandCard,
};

async function getCardByName(req, res) {
    // REFACTOR: find a way to reduce total number of fetches for efficiency 
    // fetch third part api json
    const fetchCard = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${req.params.cardName}`)
    .then(res => res.json());
    // checking if card is already in DB
    const card = await Card.findOne({ id: fetchCard.id });
    // extract first print info
    const originCard = await fetch(`${fetchCard.prints_search_uri}`).then(res => res.json())
    .then(fullPrintList => fullPrintList.data.at(-1)); // take only last item from json data list

    if (card) { // card in db
        console.log('Card found in DB: ', card.name);
        res.json(card);
    } else if (!card && fetchCard) { // create new card in db
        if (!fetchCard.image_uris) { // extract image_uris from card_faces prop
            // extract image_uris objects from each side and create a new object to contain them
            const extractedImgs = {
                front: fetchCard.card_faces[0].image_uris,
                back: fetchCard.card_faces[1].image_uris,
            };
            const originInfo = {
                release_date: originCard.released_at,
                artist: originCard.artist,
                card_faces: originCard.card_faces,
                image_uris: {
                    front: originCard.card_faces[0].image_uris,
                    back: originCard.card_faces[1].image_uris,
                },
                set_name: originCard.set_name,
            }
            // add the new object to the json
            fetchCard.image_uris = extractedImgs;
            fetchCard.first_print = originInfo;
        } else {
            // if image_uris exists, nest the array within a 'front' property for consistency
            const Imgs = fetchCard.image_uris;
            fetchCard.image_uris = {
                front: Imgs,
            };
            const originInfo = {
                release_date: originCard.released_at,
                artist: originCard.artist,
                image_uris: {
                    front: originCard.image_uris,
                },
                set_name: originCard.set_name,
            }
            fetchCard.first_print = originInfo;
        }

        // save to db
        const newCard = await Card.create(fetchCard);
        console.log('Card created: ', newCard.name);
        res.json(newCard);
    } else { // no card in db or api
        console.log(error);
        res.json('Card not found');
    }
}


function generateRandCard(req, res) {
    // api doc page: https://scryfall.com/docs/api/cards/collector
    // fetch request format: https://api.scryfall.com/cards/xln/96
    // randomize set acronym and card number
}