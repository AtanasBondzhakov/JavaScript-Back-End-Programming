import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import { stoneService } from "../services/stoneService.js";

const stoneController = Router();

stoneController.get('/create', isAuth, (req, res) => {
    res.render('stones/create', { title: 'Create Page' });
});

stoneController.post('/create', isAuth, async (req, res) => {
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
        const isOwner = stone.owner == req.user?._id;
        const isLiked = stone.likedList.some(userId => userId == req.user._id);

        res.render('stones/details', { title: 'Details Page', stone, isOwner, isLiked })
    } catch (error) {
        //TODO error
    }
});

stoneController.get('/:stoneId/delete', isStoneOwner, async (req, res) => {
    try {
        await stoneService.remove(req.params.stoneId);

        res.redirect('/');
    } catch (err) {
        //TODO err
        console.log(err);
    }
});

stoneController.get('/:stoneId/edit', isStoneOwner, async (req, res) => {
    const stone = await stoneService.getOne(req.params.stoneId).lean();
    res.render('stones/edit', { title: 'Edit Page', stone });
});

stoneController.post('/:stoneId/edit', async (req, res) => {
    const stoneId = req.params.stoneId;
    const stoneData = req.body;

    try {
        await stoneService.edit(stoneId, stoneData);

        res.redirect(`/stones/${stoneId}/details`)

    } catch (err) {
        //TODO error
    }
});

stoneController.get('/:stoneId/like', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    const userId = req.user._id;

    try {
        await stoneService.like(stoneId, userId);

        res.redirect(`/stones/${stoneId}/details`);

    } catch (err) {

    }
})


async function isStoneOwner(req, res, next) {
    const stone = await stoneService.getOne(req.params.stoneId);

    if (stone.owner == req.user?._id) {
        return next();
    }

    res.redirect('/404');
};

export default stoneController;