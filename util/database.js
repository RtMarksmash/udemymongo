const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const dotenv = require('dotenv').config();

let _db;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.z9aglvc.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`)
        .then(client => {
            console.log('connected!!');
            _db = client.db()
            callback();
        }).catch(err => {
            console.log(err)
            throw err;
        })

}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'no database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;