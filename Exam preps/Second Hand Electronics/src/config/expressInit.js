import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import routes from '../routes.js';
import { authMiddleware } from '../middlewares/authMIddleware.js';

export default function expressInit(app) {
    app.use(express.static('src/public'));
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(authMiddleware);
    app.use(routes);
}