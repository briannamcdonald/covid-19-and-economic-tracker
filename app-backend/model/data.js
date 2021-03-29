const v = require("../utils/validate-fields");

async function _get_data_collection(db) {
    try {
        return await db.collection("covid");
    } catch (err) {
        throw err;
    }
}

class Data {
    constructor(type, location, data) {
        this.type = type;
        this.location = location;
        this.data = data;
    }

    async isValid() {
        return v.validate_fields(this.type, this.location, this.data);
    }

    // saves a data object to the database
    async save(db) {
        var data = this;

        return new Promise(async (resolve, reject) => {
            // If data is valid, attempt to store it in the database.
            let valid = await data.isValid();
            if (valid) {
                let collection = await _get_data_collection(db);
                collection.insertOne(data, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("Data object successfully saved to database.");
                    }
                });
            } else {
                resolve("Invalid data object.");
            }
        });
    }

    // finds and returns the data object with the given type and location
    static async getData(db, type, location) {
        return new Promise(async (resolve, reject) => {
            let collection = await _get_data_collection(db);
            collection.findOne({ type: type, location: location }, (err, obj) => {
                if (err) {
                    reject({'data': {}, 'msg': "Data could not be retrieved due to an error."});
                } else {
                    if (obj) {
                        resolve({ 'data': obj, 'msg': "Data retrieved." });
                    } else {
                        resolve({'data': {}, 'msg': "Data not found."});
                    }
                }
            });
        });
    }
}

module.exports.Data = Data;
