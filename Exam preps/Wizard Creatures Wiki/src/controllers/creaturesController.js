import { Router } from "express";
import creatureService from "../services/creatureService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMIddleware.js";

const creatureController = Router();

creatureController.get('/all-posts', async (req, res) => {
    try {
        const creatures = await creatureService.getAll().lean();

        res.render('creatures/all-posts', { title: 'Catalog Page', creatures });
    } catch (err) {
        res.render('creatures/all-posts', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

creatureController.get('/create', isAuth, (req, res) => {
    res.render('creatures/create', { title: 'Create Page' });
});

creatureController.post('/create', isAuth, async (req, res) => {
    const creatureData = req.body;
    const ownerId = req.user?._id;

    try {
        await creatureService.create(creatureData, ownerId);

        res.redirect('/creatures/all-posts');
    } catch (err) {
        res.render('creatures/create', { title: 'Create Page', error: getErrorMessage(err), creature: creatureData });
    }
});

export default creatureController;