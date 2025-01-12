import { Schema, Types, model } from "mongoose";

const stoneSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'The name should be at least 2 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        minLength: [3, 'The Category should be at least 3 characters']
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
        minLength: [2, 'The Color should be at least 2 characters']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\/.+/, 'Image should start with http:// or https://']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location should be at least 5 characters'],
        maxLength: [15, 'Location cannot be more than 15 characters']
    },
    formula: {
        type: String,
        required: [true, 'Formula is required'],
        minLength: [3, 'Formula should be at least 3 characters'],
        maxLength: [30, 'Formula cannot be more than 30 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description should be at least 10 characters']
    },
    likedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Stone = model('Stone', stoneSchema);

export default Stone;