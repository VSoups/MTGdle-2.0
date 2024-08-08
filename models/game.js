const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Schema for individual game information
const gameSchema = new Schema({
    // checks for unlimited or daily mode
    mode: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // user guessed cards
    // guesses: { type: },
    // finalCard: { type: Object, required: true },
    
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});