//require('dotenv').config();
import 'dotenv/config'
const { resolve } = require('path');

module.exports = {
    "type": process.env.DB_TYPE, //"mysql",
    "host": process.env.DB_HOST, //"localhost",
    "port": process.env.DB_PORT, //3306,
    "username": process.env.DB_USER, //"simplify_eldorado",
    "password": process.env.DB_PASS, //"root",
    "database": process.env.DB_DATABASE, //"simplify_eldorado_news",
    "logging": false,
    "entities": [
    //  __dirname + "/dist/app/Entities/*.js",
      "./src/app/Entities/*.ts"
    ],
    "migrations": [
    //  __dirname + "/dist/app/Database/Migrations/*.js",
      "./src/app/Database/Migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/app/Database/Migrations",
        "entitiesDir": "./src/app/Entities"
    }
 }