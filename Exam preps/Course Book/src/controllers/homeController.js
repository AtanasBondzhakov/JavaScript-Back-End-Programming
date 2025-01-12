import { Router } from "express";

import { courseService } from "../services/courseService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const courses = await courseService.lastThree().lean();

    res.render('home', {title: 'Home Page', courses});
});

export default homeController;