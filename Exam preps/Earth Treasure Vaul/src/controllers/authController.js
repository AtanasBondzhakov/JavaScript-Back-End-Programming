import { Router } from "express";

import { authService } from "../services/authService.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register Page' });
});

authController.post('/register', async (req, res) => {
    const { email, password, rePassword } = req.body;
    

    try {
        await authService.register(email, password, rePassword);
        res.redirect('/');
        
    } catch (err) {
        //TODO error handling
        
        res.render('auth.register', {title: 'Register Page', email})
    }


})

export default authController;