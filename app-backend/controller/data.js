const client = require("../utils/db.js");
const Data = require("../model/data").Data;

module.exports._get_data_collection = async () => {
    let db = await client.getDb();
    try{
		return await db.collection("covid");
	}catch(err){
		throw err;
	}    
}

// creates a new data object and saves it to the database
module.exports.create = async (req, res) => {
	const new_data = new Data(req.body.type, req.body.location, req.body.data);
	let db = await client.getDb();
	try{
		let msg = await new_data.save(db);
		res.send(msg);
	}catch(err){
		res.send("There was an error while saving the data. (err:"+err+")");
		throw new Error(err)
	}
}

// finds and returns the data object with the given type and location
module.exports.getdata = async (req, res) => {
	const type_to_get = req.params.type;
	const location_to_get = req.params.location;
	let db = await client.getDb();
	try{
		let obj = await Data.getData(db,type_to_get, location_to_get);
		res.send(obj);
	}catch(err){
		res.send("There was an error while retrieveing the data. (err"+err+")");
		throw new Error(err)
	}
}