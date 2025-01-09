import express from 'express';

import expressInit from './config/expressInit.js';
import handlebarsInit from './config/handlebarsInit.js';
import mongooseInit from './config/mongooseInit.js';

const app = express();


mongooseInit();
expressInit(app);
handlebarsInit(app);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));