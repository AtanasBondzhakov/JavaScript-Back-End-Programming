import express from 'express';

import expressInit from './config/expressInit.js';

const app = express();

expressInit(app);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));