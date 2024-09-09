const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const dotenv = require('dotenv').config();


const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.z9aglvc.mongodb.net/`)
        .then(result => {
            console.log('connect');
            callback(result)
        }).catch(err => {
            console.log(err)
        })

}


module.exports = mongoConnect;