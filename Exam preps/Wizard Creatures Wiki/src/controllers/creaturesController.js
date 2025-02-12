import { Router } from "express";
import creatureService from "../services/creatureService.js";

const creatureController = Router();

creatureController.get('/all-posts', (req, res) => {
    res.render('creatures/all-posts', { title: 'Catalog Page' });
});

creatureController.post('/all-posts', async (req, res) => {

    try {
        const creatures = await creatureService.getAll();

        res.redirect('/creatures/all-posts', creatures);
    } catch (err) {

    }


});

export default creatureController;