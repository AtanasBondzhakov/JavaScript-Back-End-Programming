import { Router } from "express";

import { courseService } from "../services/courseService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const courses = await courseService.lastThree().lean();

        res.render('home', { title: 'Home Page', courses });
    } catch (err) {
        res.render('home', { title: 'Home Page', error: getErrorMessage(err) });
    }
});

export default homeController;