const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json()); // support json encoded bodies
const DataTransformer = require("./scripts/data-transformer");
var cors = require('cors');

const data_router = require("./routes/data-route");
const mongo = require("./utils/db.js");
var server;

// This method runs once and connects to the mongoDB
var db;
async function loadDBClient() {
	try {
        db = await mongo.connectToDB();
	}catch(err){
		throw new Error('Could not connect to the Mongo DB');
	}
};  
loadDBClient();

// This method is executed every time a new request arrives.
// We add the variable db to the request object, to be retrieved in the route req object
app.use((req, res, next) => {
	req.db = db;	
	next();
});
app.use(express.json())

app.use(cors({origin: '*'}));

app.use("/data", data_router)

async function transformData() {
    try {
        DataTransformer.transformData();
	}catch(err){
		throw new Error('Could not transform data');
	}
}
transformData();

server = app.listen(port, () => {
    console.log("Example app listening at http://localhost:%d", port);
});

process.on("SIGINT", () => {
    console.info("SIGINT signal received.");
    console.log("Closing Mongo Client.");
    mongo.closeDBConnection();
    server.close(() => {
        console.log("Http server closed.");
    });
});
