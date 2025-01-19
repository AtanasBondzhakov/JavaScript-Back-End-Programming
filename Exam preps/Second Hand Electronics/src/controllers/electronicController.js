import { Router } from "express";
import { electronicService } from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMIddleware.js";

const electronicController = Router();

electronicController.get('/create', isAuth, (req, res) => {
    res.render('electronics/create', { title: 'Create Page' });
});

electronicController.post('/create', isAuth, async (req, res) => {
    const electronicData = req.body;
    const ownerId = req.user?._id;

    try {
        await electronicService.create(electronicData, ownerId);

        res.redirect('/electronics/catalog');
    } catch (err) {
        res.render('electronics/create', { title: 'Create Page', error: getErrorMessage(err) });
    }
});

electronicController.get('/catalog', async (req, res) => {
    try {
        const electronics = await electronicService.getAll().lean();

        res.render('electronics/catalog', { title: 'Catalog Page', electronics });
    } catch (err) {
        res.render('electronics/catalog', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

electronicController.get('/:electronicId/details', async (req, res) => {
    const electronicId = req.params.electronicId;
    const userId = req.user?._id;

    try {
        const electronic = await electronicService.getOne(electronicId).lean();
        const isOwner = userId == electronic.owner;
        const isBought = electronic.buyingList.some(user => user._id == userId);

        res.render('electronics/details', { title: 'Details Page', electronic, isOwner, isBought });
    } catch (err) {
        res.render('electronics/details', { title: 'Details Page', error: getErrorMessage(err) });
    }
});

electronicController.get('/:electronicId/buy', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    const userId = req.user?._id;

    try {
        await electronicService.buy(electronicId, userId);

        res.redirect(`/electronics/${electronicId}/details`);
    } catch (err) {
        res.render('electronics/details', { title: 'Details Page', error: getErrorMessage(err) });
    }
});

electronicController.get('/:electronicId/delete', isElectronicOwner, async (req, res) => {
    try {
        const electronicId = req.params.electronicId;

        await electronicService.remove(electronicId);

        res.redirect('/electronics/catalog');
    } catch (err) {
        res.render('electronics/catalog', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

electronicController.get('/:electronicId/edit', isElectronicOwner, async (req, res) => {
    try {
        const electronic = await electronicService.getOne(req.params.electronicId).lean();

        res.render('electronics/edit', { title: 'Edit Page', electronic });
    } catch (err) {
        res.render('electronics/details', { title: 'Details Page', error: getErrorMessage(err) });
    }
});

electronicController.post('/:electronicId/edit', isElectronicOwner, async (req, res) => {
    const electronicId = req.params.electronicId;
    const electronicData = req.body;

    try {
        await electronicService.edit(electronicId, electronicData);

        res.redirect(`/electronics/${electronicId}/details`);
    } catch (err) {
        res.render('electronics/edit', { title: 'Edit Page', error: getErrorMessage(err), electronic: electronicData });
    }
});

async function isElectronicOwner(req, res, next) {
    const electronic = await electronicService.getOne(req.params.electronicId);

    if (electronic.owner == req.user?._id) {
        return next();
    }
    res.redirect('/404');
}

export default electronicController;