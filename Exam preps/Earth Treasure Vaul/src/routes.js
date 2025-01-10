import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import stoneController from "./controllers/stoneController.js";

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/stones', stoneController);

routes.all('*', (req, res) => {
    res.render('home/404', { title: '404 Page' });
})

export default routes;