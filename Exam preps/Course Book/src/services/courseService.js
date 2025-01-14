import Course from "../models/Course.js";
import User from "../models/User.js";

export const courseService = {
    create(courseData, ownerId) {
        return Course.create({ ...courseData, owner: ownerId });
    },
    lastThree() {
        return Course.find().sort({ createdAt: -1 }).limit(3);
    },
    getAll() {
        return Course.find();
    },
    getOne(courseId) {
        return Course.findById(courseId);
    },
    getOwner(ownerId) {
        return User.findById(ownerId);
    },
    signUp(courseId, userId) {
        return Course.findByIdAndUpdate(courseId, { $push: {signUpList: userId}});
    },
    getUser(userId) {
        return User.findById(userId);
    },
    remove(courseId) {
        return Course.findByIdAndDelete(courseId);
    }
};