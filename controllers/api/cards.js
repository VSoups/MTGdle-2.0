const Card = require('../../models/card');

module.exports = {
    getCardByName,
};

async function getCardByName(req, res) {
    const fuzzyName = req.params.cardName.split('+').join(' ');
    console.log(`--- fuzzyName: ${fuzzyName} ---`);
    // checking if card is already in DB
    const card = await Card.findOne({name: fuzzyName});

    try {
        if (card) {
            console.log('Card in DB: ', card.name)
            res.json(card)
        } else {
            // fetch third part api json
            const fetchCard = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${req.params.cardName}`)
            .then(res => res.json());
            if (!fetchCard.image_uris) {
                // extract image_uris objects from each side and create a new object to contain them
                const extractedImgs = {
                    front: fetchCard.card_faces[0].image_uris,
                    back: fetchCard.card_faces[1].image_uris,
                };
                // add the new object to the json
                fetchCard.image_uris = extractedImgs;
            } else {
                console.log('--- at line 30 ---')
                const Imgs = fetchCard.image_uris;

                // BUG: 'BSONError: cyclic dependency detected'
                // fetchCard.image_uris.front = Imgs;
            }
            // save to db
            const newCard = await Card.create(fetchCard);
            console.log('Card created: ', newCard.name);
            res.json(newCard);
        }
    } catch (error) {
        console.log(error);
        res.json('Card not found');
    }





//     // REFACTOR: need to check DB before fetching json to minimize total fetch calls
//     // fetch card json from Scryfall
//     const fetchCard = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${req.params.cardName}`)
//     .then(res => res.json()).then(card => card); 
//     // console.log(`Card id ---- ${fetchCard.id} ----`);
//     const card = await Card.findOne({id: fetchCard.id});

//     // if card is not in DB, need to fetch oldest release through this poperty and manually add to saved object
//     // const reprintListURI = fetchCard.prints_search_uri // (string) // separate fetch for array of all reprint objects ordered from newest to oldest

//     // Search DB for preexisting card object

//     // Return data to front end (if/else)
//     if (!card && !!fetchCard.id) {
//         const newCard = await Card.create(fetchCard);
//         console.log('Card created: ', newCard.name);
//         res.json(newCard);
//     // Find card in db if it does exist
//     } else if (card)  {
//         // const newCard = await Card.findOne({id: fetchCard.id});
//         console.log('Card found: ', card.name)
//         res.json(card);
//     // User input invalid
//     } else {
//         console.log('Card not found');
//         res.json('Card not found')
//     }
}