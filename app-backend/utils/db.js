const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db;

/**
 * A function to stablish a connection with a MongoDB instance.
 */
async function connectToDB() {
    try {
        // Connect the client to the server
        await client.connect();
        db = client.db("covid");
        console.log("Connected successfully to mongoDB");
        return db;
    } catch (err) {
        throw err;
    }
}

async function getDb() {
    return db;
}

async function closeDBConnection() {
    await client.close();
}

module.exports = { connectToDB, getDb, closeDBConnection };
