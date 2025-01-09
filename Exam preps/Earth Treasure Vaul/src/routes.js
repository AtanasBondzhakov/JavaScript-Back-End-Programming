import { Router } from "express";

import homeController from "./controllers/homeController.js";

const routes = Router();

routes.use(homeController);

routes.all('*', (req, res) => {
    res.render('home/404', {title: '404 Page'});
})

export default routes;