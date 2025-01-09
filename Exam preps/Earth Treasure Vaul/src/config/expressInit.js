import express, { urlencoded } from 'express';

export default function expressInit(app) {
    app.use('/styles', express.static('src/public'));
    app.use(urlencoded({extended: false}));
}