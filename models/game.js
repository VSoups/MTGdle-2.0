const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Schema for individual game information
const gameSchema = new Schema({
    // checks for unlimited or daily mode
    mode: { type: String, required: true },
    // link to user id for game history with date timestamp
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null, // stays null if visitor is playing
    },
    isVisitor: {
        type: Boolean,
        default: true, // if left to true, maybe save stats to browser cookie?
    },
    // user guessed cards (object of card objects with key being guess order)
    cardGuesses: { type: Object, required: true }, // take .length for total score
    // hidden card for the game
    secretCard: { type: Object, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

// maybe make virtual function to grab avg guess count? (var size = Object.keys(myObj).length;)

module.exports = mongoose.model('Game', gameSchema);