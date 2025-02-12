import { Schema, Types, model } from "mongoose";

const creatureSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    species: {
        type: String,
        required: [true, "Species is required"]
    },
    skinColor: {
        type: String,
        required: [true, "Skin color is required"]
    },
    eyeColor: {
        type: String,
        required: [true, "Eye color is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
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