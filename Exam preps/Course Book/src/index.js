import express from 'express';
import 'dotenv/config';

import mongooseInit from './config/mongooseInit.js';
import expressInit from './config/expressInit.js';
import handlebarsInit from './config/handlebarsInit.js';

const app = express();

mongooseInit();
expressInit(app);
handlebarsInit(app);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));