const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cardSchema = new Schema({
    name: { type: String, reqired: true },
    // Scryfall API ID
    id: { type: String, required: true },
    image_uris: Object,
    type_line: String,
    oracle_text: String,
    color_identity: Array,
    cmc: Number,
    keywords: Array,
    legalities: Object,
    rarity: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

