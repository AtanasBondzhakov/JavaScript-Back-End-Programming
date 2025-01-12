import Course from "../models/Course.js";

export const courseService = {
    create(courseData, ownerId) {
        return Course.create({ ...courseData, owner: ownerId });
    },
    lastThree() {
        return Course.find().sort({ createdAt: -1 }).limit(3);
    }
};