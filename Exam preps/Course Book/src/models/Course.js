import { Schema, Types, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [5, 'Title should be at least 5 characters']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        minLength: [3, 'Type should be at least 3 characters']
    },
    certificate: {
        type: String,
        required: [true, 'Certificate is required'],
        minLength: [2, 'Certificate should be at least 2 characters']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\/.+/, 'Image should start with http:// or https://']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description should be at least 10 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price should be positive number']
    },
    signUpList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Course = model('Course', courseSchema);

export default Course;