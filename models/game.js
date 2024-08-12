const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Schema for individual game information
const gameSchema = new Schema({
    // checks for unlimited or daily mode
    mode: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null, // stays null if visitor is playing
    },
    isVisitor: {
        type: Boolean,
        default: true,
    },
    // user guessed cards (object of card objects with key being guess order)
    cardGuesses: { type: Object, required: true }, // take .length for total score
    // hidden card for the game
    secretCard: { type: Object, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

module.exports = mongoose.model('Game', gameSchema);