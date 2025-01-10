import { Router } from "express";

import { stoneService } from "../services/stoneService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const stones = await stoneService.lastThree().lean();
    res.render('home', {title: 'Home Page', stones});
});

export default homeController;