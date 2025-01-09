import express, { urlencoded } from 'express';

import routes from '../routes.js';

export default function expressInit(app) {
    app.use('/static', express.static('src/public'));
    app.use(urlencoded({ extended: false }));
    app.use(routes);
}