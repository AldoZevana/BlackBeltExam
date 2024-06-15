const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, 'Name must be at least 3 characters long!']
    },
    ImgUrl: {
        type: String,
        required: [true]
    },
    treasure:{
        type:Number,
        required:[true]
    },
    catchPhrase:{
        type:String,
        required:[true]
    },
    position: {
        type: String,
        enum: ['First Mate', 'Quarter Master','Boatswain','PowderMonkey','Captain']
    },
    pegLeg: {
        type: Boolean,
        default: true
    },
    eyePatch: {
        type: Boolean,
        default: true
    },
    hookHand: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Pirate', PirateSchema);
