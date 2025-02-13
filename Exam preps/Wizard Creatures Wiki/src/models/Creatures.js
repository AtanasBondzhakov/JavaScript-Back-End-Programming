import { Schema, Types, model } from "mongoose";

const creatureSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, 'Name should be at least 2 characters long']

    },
    species: {
        type: String,
        required: [true, "Species is required"],
        minLength: [3, 'Species should be at least 3 characters long']

    },
    skinColor: {
        type: String,
        required: [true, "Skin color is required"],
        minLength: [3, 'Skin color should be at least 3 characters long']    
    },
    eyeColor: {
        type: String,
        required: [true, "Eye color is required"],
        minLength: [3, 'Eye color should be at least 3 characters long']
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        validate: [/^https?:\/\/.+/, 'Image should start with http:// or https://']
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [5, 'Description should be at least 5 characters long'],
        maxLength: [500, 'Description cannot be at more than 500 characters long']
    },
    votes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Creature = model('Creature', creatureSchema);

export default Creature;