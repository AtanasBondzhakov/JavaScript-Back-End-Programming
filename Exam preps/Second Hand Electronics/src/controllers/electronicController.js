import { Router } from "express";
import { electronicService } from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const electronicController = Router();

electronicController.get('/create', (req, res) => {
    res.render('electronics/create', { title: 'Create Page' });
});

export default electronicController;