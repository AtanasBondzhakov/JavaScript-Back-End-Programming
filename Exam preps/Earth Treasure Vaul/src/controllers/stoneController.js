import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import { stoneService } from "../services/stoneService.js";

const stoneController = Router();

stoneController.get('/create', isAuth, (req, res) => {
    res.render('stones/create', { title: 'Create Page' });
});

stoneController.post('/create', async (req, res) => {
    const stoneData = req.body;
    const ownerId = req.user._id;

    try {
        await stoneService.create(stoneData, ownerId);

        res.redirect('/stones/dashboard')
    } catch (err) {
        //TODO error
        res.render('stones/create', { title: 'Create Page', stone: stoneData })
    }
});

stoneController.get('/dashboard', async (req, res) => {
    try {
        const stones = await stoneService.getAll().lean();

        res.render('stones/dashboard', { title: 'Dashboard Page', stones });
    } catch (err) {
        //TODO error

        res.render('stones/dashboard', { title: 'Dashboard Page' });
    }
});

stoneController.get('/:stoneId/details', async (req, res) => {
    try {
        const stone = await stoneService.getOne(req.params.stoneId).lean();
        const isOwner = stone.owner == req.user?._id

        res.render('stones/details', { title: 'Details Page', stone, isOwner })
    } catch (error) {
        //TODO error
    }

})



export default stoneController;