const csv = require("csv-parser")
const fs = require("fs")
const Data = require("../model/data").Data;
const mongo = require("../utils/db");

const locations = ["Newfoundland and Labrador", "Nova Scotia", "New Brunswick", "Prince Edward Island", "Quebec", 
            "Ontario", "Manitoba", "Saskatchewan", "Alberta", "British Columbia", "Nunavut", "Northwest Territories", 
            "Yukon", "Canada"];

const baseData = {"01-2019" : 0, "02-2019" : 0, "03-2019" : 0, "04-2019" : 0, "05-2019" : 0, "06-2019" : 0, "07-2019" : 0, 
"08-2019" : 0, "09-2019" : 0, "10-2019" : 0, "11-2019" : 0, "12-2019" : 0, "01-2020" : 0, "02-2020" : 0, "03-2020" : 0, "04-2020" : 0, "05-2020" : 0, "06-2020" : 0, "07-2020" : 0, 
"08-2020" : 0, "09-2020" : 0, "10-2020" : 0, "11-2020" : 0, "12-2020" : 0, "01-2021" : 0, "02-2021" : 0, 
"03-2021" : 0, "04-2021" : 0};

// Responsible for taking CSV data from covid19.csv and transforming that data into easily consumable 
// Data objects to be stored in the database
const transformCovidData = async (filePath) => {
    return new Promise(async function (resolve, reject) {
        // Create base Data objects with all case counts set to 0
        let covidDataObjects = locations.map(location => (
            new Data(
                "covid_cases",
                location,
                { ...baseData }
            )
        ));

        // Read CSV rows then create return data objects
        const results = [];

        const stream = fs.createReadStream(filePath);

        stream.on("error", error => {
            reject("No such file or directory for provided filepath: " + filePath);
        });
        
        stream.pipe(csv())
        .on("data", (data) => {
            results.push(data);
        })
        .on("end", () => {
            // For each row in the database, add the number of new cases for the day to the monthly total for each location
            results.forEach(result => {
                const date = result.date.slice(3);
                const locIndex = locations.indexOf(result.prname);

                if (locIndex > -1) {
                    covidDataObjects[locIndex].data[date] += parseInt(result.numtoday);
                }
            });

            resolve(covidDataObjects);
        }).on("error", (err) => {
            reject("Error reading file: " + filePath);
        });
    });
}

// Responsible for taking CSV data from employment_and_earnings.csv and transforming that data into easily consumable 
// Data objects to be stored in the database
const transformEmploymentData = async (filePath) => {
    return new Promise(async function (resolve, reject) {
        const industries = ["Industrial aggregate including unclassified businesses", 
        "Industrial aggregate excluding unclassified businesses",
        "Goods producing industries", 
        "Forestry, logging and support", 
        "Mining, quarrying, and oil and gas extraction", 
        "Utilities", 
        "Construction", 
        "Manufacturing", 
        "Non-durable goods", 
        "Durable goods", 
        "Service producing industries", 
        "Trade", 
        "Wholesale trade", 
        "Retail trade", 
        "Transportation and warehousing", 
        "Information and cultural industries", 
        "Finance and insurance", 
        "Real estate and rental and leasing", 
        "Professional, scientific and technical services", 
        "Management of companies and enterprises", 
        "Administrative and support, waste management and remediation services", 
        "Educational services", 
        "Health care and social assistance", 
        "Arts, entertainment and recreation", 
        "Accommodation and food services", 
        "Other services (except public administration)", 
        "Public administration"];

        const dateMap = {
            "19-Jan" : "01-2019",
            "19-Feb" : "02-2019",
            "19-Mar" : "03-2019",
            "19-Apr" : "04-2019",
            "19-May" : "05-2019",
            "19-Jun" : "06-2019",
            "19-Jul" : "07-2019",
            "19-Aug" : "08-2019",
            "19-Sep" : "09-2019",
            "19-Oct" : "10-2019",
            "19-Nov" : "11-2019",
            "19-Dec" : "12-2019",
            "20-Jan" : "01-2020",
            "20-Feb" : "02-2020",
            "20-Mar" : "03-2020",
            "20-Apr" : "04-2020",
            "20-May" : "05-2020",
            "20-Jun" : "06-2020",
            "20-Jul" : "07-2020",
            "20-Aug" : "08-2020",
            "20-Sep" : "09-2020",
            "20-Oct" : "10-2020",
            "20-Nov" : "11-2020",
            "20-Dec" : "12-2020"
        };

        // Create base Data objects with all employment counts to 0
        let employmentTotalPerProvinceDataObjects = locations.map(location => (
            new Data(
                "employment",
                location,
                { ...baseData }
            )
        ));

        // Create base Data objects with all average pay values set to 0
        let payTotalPerProvinceDataObjects = locations.map(location => (
            new Data(
                "weekly_earnings",
                location,
                { ...baseData }
            )
        ));

        var industryObjectMap = new Map();

        // Create base data objects for each type of industry and location
        locations.forEach(location => {
            industries.forEach(industry => {
                const compositeKey = location + "_" + industry;

                industryObjectMap.set(compositeKey + "_employment", 
                new Data(
                    "employment_" + industry,
                    location,
                    { ...baseData }
                ))

                industryObjectMap.set(compositeKey + "_weekly_earnings", 
                new Data(
                    "weekly_earnings_" + industry,
                    location,
                    { ...baseData }
                ))
            })
        });

        const results = [];
        let employmentDataObjects = [];

        // Read CSV rows then create return data objects
        const stream = fs.createReadStream(filePath);

        stream.on("error", error => {
            reject("No such file or directory for provided filepath: " + filePath);
        });

        stream.pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            results.forEach(result => {

                // A hacky way to extract the date, since the header is broken
                var date;
                for (const [key, value] of Object.entries(result)) {
                    date = result[key];
                    break;
                }

                // Get the correct date format using the given date format
                formattedDate = dateMap[date];

                // Build composite key using properties of the CSV row, then increment the correct value
                // in the data object
                const location = result.location;
                const type = result.Estimate == "Average weekly earnings including overtime for all employees"
                    ? "weekly_earnings" : "employment";
                const industry = result.industry;
                // Remove bracket and code from end of industry name
                const bracketIndex = industry.indexOf("[")
                const formattedIndustry = industry.slice(0, bracketIndex - 1)
                // If the row is for 2020 data, add the 2020 data values to the object retrieved using
                // the correct composite key
                if (formattedDate) {
                    var compositeKey = location + "_" + formattedIndustry + "_" + type;
                    const value = result.VALUE.length > 0 ? parseInt(result.VALUE) : 0;
                    industryObjectMap.get(compositeKey).data[formattedDate] += value;

                    const locIndex = locations.indexOf(result.location);

                    // Store values for total employment and earnings across industries
                    if (locIndex > -1) {
                        if (type == "employment" & formattedIndustry == "Industrial aggregate including unclassified businesses") {
                            employmentTotalPerProvinceDataObjects[locIndex].data[formattedDate] += parseInt(value);
                        } else if (type == "weekly_earnings" & formattedIndustry == "Industrial aggregate excluding unclassified businesses") {
                            payTotalPerProvinceDataObjects[locIndex].data[formattedDate] += parseInt(value);
                        }
                    }
                }
            });
            employmentDataObjects = [...payTotalPerProvinceDataObjects, ...employmentTotalPerProvinceDataObjects];

            // Load employmentDataObjects array with all our new data objects to be saved
            for (let value of industryObjectMap.values()) {
                employmentDataObjects.push(value);
            }
            
            resolve(employmentDataObjects);
        }).on('error', (err) => {
            reject("Error reading file: " + filePath);
        });
    });
}

// This function transforms CSV data for cerb payments and stores a single object in our database with the payout totals by each month
const transformCerbData = async (filePath) => {
    return new Promise(async function (resolve, reject) {
        // Create base Data object with payments set to 0
        const cerbDataObject = new Data(
            "cerb",
            // The location is hard coded to Canada because the data represents CERB payouts to Canada as a whole
            "Canada",
            { ...baseData }
        );

        /**
         * We decided to hard-code this data. This is because the dataset for the CERB payments
         * only contained 7 pieces of useful data, and was spread over an odd number of weeks.
         * Because of this, it made sense to calculate the 7 data points ourselves and hard-code them.
         */
        cerbDataObject.data['04-2020'] = 12125000000;
        cerbDataObject.data['05-2020'] = 4020000000;
        cerbDataObject.data['06-2020'] = 3299500000;
        cerbDataObject.data['07-2020'] = 2305500000;
        cerbDataObject.data['08-2020'] = 2450000000;
        cerbDataObject.data['09-2020'] = 2017500000;
        cerbDataObject.data['20-2020'] = 1020000000;

        resolve([cerbDataObject]);
    });
}

// The main data transformer function, it calls the individual data transformers and saves all of the objects
// they create
const transformData = async () => {
        // Connect to database
        var db;
        try {
            db = await mongo.connectToDB();
        } catch(err) {
            reject("Could not connect to the database");
            process.exit(1);
        }

        // Call all 3 data transformers and store their data in dataObjects array
        const dataObjects = [...await transformCovidData("./data/covid19.csv"), ...await transformCerbData("./data/cerb_payments.csv"), ...await transformEmploymentData("./data/employment_and_earnings.csv")];

        Promise.all(dataObjects).then((values) => {
            // Save all data objects to database
            values.forEach((data) => {
                const newDataObject = new Data(data.type, data.location, data.data);
                newDataObject.save(db);
            });
          }).catch(error => {
            console.error(error.message);
          });

        console.log("Successfully transformed necessary CSV data and saved it in the database");
}

module.exports = { transformData, transformCovidData, transformEmploymentData, transformCerbData };