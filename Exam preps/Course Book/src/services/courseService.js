import Course from "../models/Course.js";

export const courseService = {
    create(courseData, ownerId) {
        return Course.create({ ...courseData, owner: ownerId });
    }
};