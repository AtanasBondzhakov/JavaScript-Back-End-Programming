import { Router } from "express";
import { electronicService } from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const electronicController = Router();

electronicController.get('/create', (req, res) => {
    res.render('electronics/create', { title: 'Create Page' });
});

electronicController.post('/create', (req, res) => {
    const electronicData = req.body;
    const ownerId = req.user?._id;

    try {
        electronicService.create(electronicData, ownerId);

        res.redirect('/electronics/catalog')
    } catch (err) {
        res.render('electronics/create', { title: 'Create Page', error: getErrorMessage(err) });
    }
});

export default electronicController;