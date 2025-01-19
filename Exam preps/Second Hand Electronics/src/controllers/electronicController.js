import { Router } from "express";
import { electronicService } from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const electronicController = Router();

electronicController.get('/create', (req, res) => {
    res.render('electronics/create', { title: 'Create Page' });
});

electronicController.post('/create', async (req, res) => {
    const electronicData = req.body;
    const ownerId = req.user?._id;

    try {
        await electronicService.create(electronicData, ownerId);

        res.redirect('/electronics/catalog')
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
        const isOwner = await isElectronicOwner(electronicId, userId);
        const isBought = electronic.buyingList.some(user => user._id == userId);

        res.render('electronics/details', { title: 'Details Page', electronic, isOwner, isBought });
    } catch (err) {
        res.render('electronics/details', { title: 'Details Page', error: getErrorMessage(err) });
    }
});

async function isElectronicOwner(electronicId, userId) {
    const electronic = await electronicService.getOne(electronicId);

    return electronic.owner == userId;
}

export default electronicController;