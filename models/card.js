const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MAJOR BUG: Crashing when searching multiface/flip cards
// Separate image_uris (obj) and card_faces (arr)

const cardSchema = new Schema({
    name: { type: String, reqired: true },
    // Scryfall API ID
    id: { type: String, required: true },
    // some cards have image_uris nested within card_faces (flip/transform cards)
    image_uris: Object,

    // some cards with card_faces do not contain image_uris (CHK and other flip cards)
    // cards without card_faces will stay null
    card_faces: { type: Object, default: null },

    type_line: String,
    oracle_text: String,
    color_identity: Array,
    cmc: Number,
    mana_cost: String,
    keywords: Array,
    legalities: Object,
    rarity: String,

    // custom property that will be manually added in the backend (see controllers/api/cards.js)
    // first_printing: String,

    // release_date: String, // look for released_at property in the original json
    // original_artist: String // also pull from oldest release fetch

    artist: String,
    edhrec_rank: Number, // possibly for daily randomizer?
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

cardSchema.virtual('getSmallImg').get(function() {
    return this.image_uris.art_crop;
})


module.exports = mongoose.model('Card', cardSchema);