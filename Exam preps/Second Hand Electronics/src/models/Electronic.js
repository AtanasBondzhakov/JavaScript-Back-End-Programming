import { Schema, Types, model } from "mongoose";

const electronicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    damages: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    production: {
        type: Number,
        required: true,
    },
    exploitation: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    buyingList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Electronic = model('Electronic', electronicSchema);

export default Electronic;