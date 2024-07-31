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
    mana_cost: String,
    keywords: Array,
    legalities: Object,
    rarity: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

cardSchema.virtual('getSmallImg').get(function() {
    return this.image_uris.art_crop;
})


module.exports = mongoose.model('Card', cardSchema);