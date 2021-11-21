import express from 'express';
import { createConnection } from 'typeorm';
import "express-async-errors";
import { pagination } from "typeorm-pagination";
import { resolve } from 'path';
import 'dotenv/config'
import router from './config/router';
import cors from 'cors';


const port = process.env.API_PORT || 3001;
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/static/movies', 
    express.static(resolve(__dirname, '..', 'public', 'static', 'uploads'))
);

console.log(`[EldoPrime Max] Server running on port ${port}`)
createConnection().then(() => console.log("[MySQL] Database was connected successful!"));
app.use(pagination);
app.use(router);

app.listen(port);