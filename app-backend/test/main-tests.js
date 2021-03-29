var assert = require("assert");
const { Data } = require("../model/data");
const request = require("request");
const mongo = require("../utils/db");
const DataTransformer = require("../scripts/data-transformer");

var db;
let test_data1;
let test_data2;
let invalid_data;

// This method runs once and connects to the mongoDB
before(async function () {
    try {
        db = await mongo.connectToDB();
    } catch (err) {
        throw err;
    }
    // creating test data to use in the tests below
    test_data2 = new Data("covidCases", "Alberta", {
        "01-2020": 11,
        "02-2020": 22,
        "03-2020": 33,
    });
    invalid_data = new Data("covidCases", "Alberta2", {
        "01-2020": 11,
        "02-2020": 22,
        "03-2020": 33,
    });
    test_data1 = new Data("covidCases", "Newfoundland and Labrador", {
        "01-2020": 10,
        "02-2020": 20,
        "03-2020": 30,
    });
    test_data1.save(db);
    test_data3 = new Data("covidCases", "New Brunswick", {
        "01-2020": 15,
        "02-2020": 25,
        "03-2020": 35,
    });
    test_data3.save(db);
    test_data4 = new Data("unemploymentAgriculture", "Newfoundland and Labrador", {
        "01-2020": 1,
        "02-2020": 2,
        "03-2020": 3,
    });
    test_data4.save(db);
});

// closes the connection to MongoDB after the tests
after(async function() {
    try{
        mongo.closeDBConnection();
    }catch(err){
        throw err;
    }
});

describe("Tests with Mocha", function () {
    describe("Test Models", function () {
        describe("Data", function () {
            let new_type = "unemployment";
            let new_location = "Newfoundland and Labrador";
            let new_data = { "01-2020": 1, "02-2020": 2, "03-2020": 3 };
            var data1 = new Data(new_type, new_location, new_data);
            it("Test creation of a valid data with parameters matching", function () {
                assert.strictEqual(data1.type, "unemployment");
                assert.strictEqual(data1.location, "Newfoundland and Labrador");
                assert.deepStrictEqual(data1.data, {
                    "01-2020": 1,
                    "02-2020": 2,
                    "03-2020": 3,
                });
            });
            it("Test if data is invalid (Invalid Type)", async function () {
                let data3 = new Data(123, new_location, new_data);
                assert.strictEqual(await data3.isValid(), false);
            });
            it("Test if data is invalid (Invalid location)", async function () {
                let data4 = new Data(new_type, "Alberta2", new_data);
                assert.strictEqual(await data4.isValid(), false);
            });
            it("Test if data is invalid (Invalid Data)", async function () {
                let data6 = new Data(new_type, new_location, ["a", "b", "c"]);
                assert.strictEqual(await data6.isValid(), false);
            });
            it("Success 1 - Successfully save data (Data.save)", function (done) {
                let result = test_data2.save(db);
                result
                    .then((rslt) => {
                        assert.strictEqual(rslt, "Data object successfully saved to database.");
                        done();
                    })
                    .catch(err => done(err));
            });
            it("Fail 1 - Attempt to save invalid data (Data.save)", function () {
                let result = invalid_data.save(db);
                result
                    .then((rslt) => {
                        assert.strictEqual(rslt, "Invalid data object.");
                        done();
                    })
                    .catch(err => done(err));
            });
            it("Success 2 - Successfully get data corresponding to a given type and location (Data.getData)", function (done) {
                let result = Data.getData(db, "covidCases", "Newfoundland and Labrador");
                result
                    .then((rslt) => {
                        assert.strictEqual(rslt.msg, "Data retrieved.");
                        assert.strictEqual(rslt.data.type, "covidCases");
                        assert.strictEqual(rslt.data.location, "Newfoundland and Labrador");
                        assert.deepStrictEqual(rslt.data.data, { "01-2020": 10, "02-2020": 20, "03-2020": 30});
                        done();
                    })
                    .catch(err => done(err));
            });
            it("Fail 2 - Attempt to get a data object that's not in the database (invalid type) (Data.getData)", function (done) {
                let result = Data.getData(db, "invalidType", "Newfoundland and Labrador");
                result
                    .then((rslt) => {
                        assert.strictEqual(rslt.msg, "Data not found.");
                        done();
                    })
                    .catch(err => done(err));
            });
            it("Fail 3 - Attempt to get a data object that's not in the database (invalid location) (Data.getData)", function (done) {
                let result = Data.getData(db, "covidCases", "invalidlocation");
                result
                    .then((rslt) => {
                        assert.strictEqual(rslt.msg, "Data not found.");
                        done();
                    })
                    .catch(err => done(err));
            });
        });
    });
    describe("Test API calls", function () {
        describe("Testing the Data API - Simple Cases", function() {
            var myurl = "http://localhost:3000";
            
            it("Success 1 - Successfully post data (Post /data)", function (done) {
                let new_type = "test_type";
                let new_location = "Nova Scotia";
                let new_data = { "01-2020": 11, "02-2020": 21, "03-2020": 35 };
                var data1 = new Data(new_type, new_location, new_data);

                request.post({
                    headers: {'content-type': 'application/json', "Access-Control-Allow-Origin": "*"},
                    url:     myurl+'/data',
                    body:    JSON.stringify(data1)   
                }, function(error, response, body){
                    if (error) console.dir(error);
                    assert.strictEqual(body, "Data object successfully saved to database.");
                    done();
                });
            });
            it("Success 2 - Successfully get data corresponding to a given type and location (Get /data)", function(done) {
                let get_type = "test_type";
                let get_location = "Nova Scotia";

                request.get({
                    headers: {'content-type': 'application/json'},
                    url:     myurl+'/data/'+get_type+"/"+get_location,
                }, function(error, response, body){
                    if (error) console.dir(error);
                    obj = JSON.parse(body);
                    assert.strictEqual(obj.data.type, get_type);
                    assert.strictEqual(obj.data.location, get_location)
                    assert.strictEqual(obj.msg, "Data retrieved.");
                    done();
                });
            });
            it("Fail 1 - Attempt to save invalid data (Post /data)", function(done) {
                let new_type = 123;
                let new_location = "Nova Scotia";
                let new_data = { "01-2020": 11, "02-2020": 21, "03-2020": 35 };
                var data1 = new Data(new_type, new_location, new_data);

                request.post({
                    headers: {'content-type': 'application/json'},
                    url:     myurl+'/data',
                    body:    JSON.stringify(data1)   
                }, function(error, response, body){
                    if (error) console.dir(error);
                    assert.strictEqual(body, "Invalid data object.");
                    done();
                });
            });
            it("Fail 2 - Attempt to retrieve data that does not exist (Get /data)", function(done) {
                let get_type = "test";
                let get_location = "Nova Scotia";
                request.get({
                    headers: {'content-type': 'application/json'},
                    url:     myurl+'/data/'+get_type+"/"+get_location,
                }, function(error, response, body){
                    if (error) console.dir(error);
                    obj = JSON.parse(body);
                    assert.strictEqual(obj.msg, "Data not found.");
                    done();
                });
            });
        });
        describe("Testing the Data API - Complex Cases", function() {
            var myurl = "http://localhost:3000";

            it("Success 1 - Get the same type of data for two different provinces", function(done) {
                request.get({
                    headers: {'content-type': 'application/json'},
                    url:     myurl+'/data/covidCases/Newfoundland and Labrador',
                }, function(error, response, body){
                    if (error) console.dir(error);
                    obj = JSON.parse(body);
                    assert.strictEqual(obj.data.type, "covidCases");
                    assert.strictEqual(obj.data.location, "Newfoundland and Labrador");
                    assert.strictEqual(obj.msg, "Data retrieved.");
                    request.get({
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/data/covidCases/Alberta',
                    }, function(error, response, body) {
                        if (error) console.dir(error);
                        obj = JSON.parse(body);
                        assert.strictEqual(obj.data.type, "covidCases");
                        assert.strictEqual(obj.data.location, "Alberta");
                        assert.strictEqual(obj.msg, "Data retrieved.");
                        done();
                    });
                });
            });
            it("Success 2 - Get two different types of data for the same province", function(done) {
                request.get({
                    headers: {'content-type': 'application/json'},
                    url:     myurl+'/data/covidCases/Newfoundland and Labrador',
                }, function(error, response, body){
                    if (error) console.dir(error);
                    obj = JSON.parse(body);
                    assert.strictEqual(obj.data.type, "covidCases");
                    assert.strictEqual(obj.data.location, "Newfoundland and Labrador");
                    assert.strictEqual(obj.msg, "Data retrieved.");
                    request.get({
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/data/unemploymentAgriculture/Newfoundland and Labrador',
                    }, function(error, response, body) {
                        if (error) console.dir(error);
                        obj = JSON.parse(body);
                        assert.strictEqual(obj.data.type, "unemploymentAgriculture");
                        assert.strictEqual(obj.data.location, "Newfoundland and Labrador");
                        assert.strictEqual(obj.msg, "Data retrieved.");
                        done();
                    });
                });
            });
            it("Success 3 - Post and then get some data", function(done) {
                let new_type = "covidCases";
                let new_location = "Manitoba";
                let new_data = { "01-2020": 12, "02-2020": 21, "03-2020": 35 };
                var data1 = new Data(new_type, new_location, new_data);

                request.post({
                    headers: {'content-type': 'application/json'},
                    url:     myurl+'/data',
                    body:    JSON.stringify(data1)   
                }, function(error, response, body){
                    if (error) console.dir(error);
                    assert.strictEqual(body, "Data object successfully saved to database.");
                    request.get({
                        headers: {'content-type': 'application/json'},
                        url:     myurl+'/data/covidCases/Manitoba',
                    }, function(error, response, body){
                        if (error) console.dir(error);
                        obj = JSON.parse(body);
                        assert.strictEqual(obj.data.type, "covidCases");
                        assert.strictEqual(obj.data.location, "Manitoba");
                        assert.strictEqual(obj.msg, "Data retrieved.");
                        done();
                    });
                });
            });
        });
    });
    describe("Test Data Transformation Script", async function () {
        describe("Data", async function () {
            const expectedLocations = ["Newfoundland and Labrador", "Nova Scotia", "New Brunswick", "Prince Edward Island", "Quebec", 
                "Ontario", "Manitoba", "Saskatchewan", "Alberta", "British Columbia", "Nunavut", "Northwest Territories", 
                "Yukon", "Canada"];

            it("Success 1 - Test that transforming COVID-19 data works and returns data with the expected location and type", async function () {
                const dataObjects = await DataTransformer.transformCovidData("./data/covid19.csv");
                const expectedType = "covid_cases";

                dataObjects.forEach(object => {
                    assert.strictEqual(object.type === expectedType 
                        && expectedLocations.includes(object.location)
                        && typeof object.data === "object"
                        , true);
                });
            });

            it("Success 2 - Test that transforming CERB payment data works and returns data with the expected location and type", async function () {
                const dataObjects = await DataTransformer.transformCerbData("./data/cerb_payments.csv");
                const expectedType = "cerb";
                const expectedLocation = "Canada"

                dataObjects.forEach(object => {
                    assert.strictEqual(object.type === expectedType 
                        && object.location == expectedLocation
                        && typeof object.data === "object"
                        , true);
                });
            });

            it("Success 3 - Test that transforming employment data works and returns data with the expected location and type", async function () {
                const dataObjects = await DataTransformer.transformEmploymentData("./data/employment_and_earnings.csv");
                const employmentType = "employment";
                const earningsType = "weekly_earnings";

                dataObjects.forEach(object => {
                    assert.strictEqual((object.type.startsWith(employmentType) || object.type.startsWith(earningsType))
                        && expectedLocations.includes(object.location)
                        && typeof object.data === "object"
                        , true);
                });
            });

            it("Fail 1 - Test that transforming COVID-19 data returns an error if there is an incorrect filepath", async function () {
                const dataObjects = await DataTransformer.transformCovidData("./data/test/covid19.csv").catch(err => {
                    assert.strictEqual("No such file or directory for provided filepath: ./data/test/covid19.csv", err)
                });
            });

            it("Fail 2 - Test that transforming CERB payment data returns an error if there is an incorrect filepath", async function () {
                const dataObjects = await DataTransformer.transformCerbData("./data/test/cerb_payments.csv").catch(err => {
                    assert.strictEqual("No such file or directory for provided filepath: ./data/test/cerb_payments.csv", err)
                });
            });

            it("Fail 3 - Test that transforming employment data returns an error if there is an incorrect filepath", async function () {
                const dataObjects = await DataTransformer.transformEmploymentData("./data/test/employment_and_earnings.csv").catch(err => {
                    assert.strictEqual("No such file or directory for provided filepath: ./data/test/employment_and_earnings.csv", err)
                });
            });
        });
    });
});
