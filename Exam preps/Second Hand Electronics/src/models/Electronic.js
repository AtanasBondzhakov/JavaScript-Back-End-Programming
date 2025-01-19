import { Schema, Types, model } from "mongoose";

const electronicSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [10, 'Name should be at least 10 characters long']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        minLength: [2, 'Type should be at least 2 characters long']
    },
    damages: {
        type: String,
        required: [true, 'Damages is required'],
        minLength: [10, 'Damages should be at least 10 characters long']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\/.+/, 'Image should start with http:// or https://']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description should be at least 10 characters long'],
        maxLength: [200, 'Description cannot be more than 200 characters']
    },
    production: {
        type: Number,
        required: [true, 'Production is required'],
        min: [1900, 'Production cannot be older than 1900 year'],
        max: [2023, 'Production cannot be newer than 2023 year']
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required'],
        min: [0, 'Exploitation should be a positive']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price should be a positive']
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