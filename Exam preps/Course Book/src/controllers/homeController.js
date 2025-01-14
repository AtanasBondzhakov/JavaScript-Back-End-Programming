import { Router } from "express";

import { courseService } from "../services/courseService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMIddleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const courses = await courseService.lastThree().lean();

        res.render('home', { title: 'Home Page', courses });
    } catch (err) {
        res.render('home', { title: 'Home Page', error: getErrorMessage(err) });
    }
});

homeController.get('/profile', isAuth, async (req, res) => {
    const userId = req.user?._id;

    try {
        const createdCourses = await courseService.getCreatedCourses(userId).lean();
        const signedCourses = await courseService.getSignedUp(userId).lean();

        res.render('home/profile', { title: 'Profile Page', createdCourses, signedCourses });
    } catch (err) {
        res.render('home/profile', { title: 'Profile Page', error: getErrorMessage(err) });
    }
});

export default homeController;