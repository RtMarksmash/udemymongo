const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

MongoClient.connect('mongodb+srv://<db_username>:<db_password>@cluster0.z9aglvc.mongodb.net/')