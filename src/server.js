import express from "express";
import bodyParser from "body-parser";

import connectDB from "./config/connectDB";
import viewEngine from "./config/viewEngine"
import initWebRouter from './route/web'
require('dotenv').config()

let app = express()
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

viewEngine(app)
initWebRouter(app)

connectDB()
let port = process.env.PORT || 6969
app.listen(port, () => {
    console.log('backend node js is runing on the port : ' + port)
}) 