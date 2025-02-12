import { Router } from "express";
import creatureService from "../services/creatureService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const creatureController = Router();

creatureController.get('/all-posts', async (req, res) => {
    try {
        const creatures = await creatureService.getAll().lean();

        res.render('creatures/all-posts', { title: 'Catalog Page', creatures });
    } catch (err) {
        res.render('creatures/all-posts', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

export default creatureController;