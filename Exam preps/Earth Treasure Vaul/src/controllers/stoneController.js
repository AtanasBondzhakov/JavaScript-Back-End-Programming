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
    // console.log(owner);
    

    try {
        await stoneService.create(stoneData, ownerId);

        res.render('/dashboard', { title: 'Dashboard Page' });
    } catch (err) {
        //TODO error
        res.render('/create', {title: 'Create Page', stone: stoneData})
    }

})

export default stoneController;