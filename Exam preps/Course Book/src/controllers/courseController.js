import { Router } from "express";

import { isAuth } from "../middlewares/authMIddleware.js";
import { courseService } from "../services/courseService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const courseController = Router();

courseController.get('/create', isAuth, (req, res) => {
    res.render('courses/create', { title: 'Create Page' });
});

courseController.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    const ownerId = req.user?._id;

    try {
        await courseService.create(courseData, ownerId);

        res.redirect('/courses/all-courses');
    } catch (err) {
        res.render('courses/create', { title: 'Create Page', error: getErrorMessage(err) });
    }
});

courseController.get('/all-courses', async (req, res) => {
    const courses = await courseService.getAll().lean();

    res.render('courses/catalog', {title: 'Catalog Page', courses});
});

export default courseController;