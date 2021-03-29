let validator = require("validator");

let _validate_type = (type) => {
    return new Promise((resolve, reject) => {
        // Since there are many industries and they each contain brackets, commas, periods, etc, it makes sense
        // to just ensure that the type is a string
        let is_valid = typeof(type) === "string";
        if (is_valid) {
            resolve("The type is valid.");
        } else {
            reject("The type is invalid.");
        }
    });
};

let _validate_location = (location) => {
    return new Promise((resolve, reject) => {
        location = location.replace("&", "and"); // Removing & symbol if it's there
        location = location.split(" ").join(""); // Removing blanks
        let is_valid = validator.isAlpha(location);
        if (is_valid) {
            resolve("The location is valid.");
        } else {
            reject("The location is invalid.");
        }
    });
};

let _validate_data = (data) => {
    return new Promise((resolve, reject) => {
        // Ensure data is an object
        let is_valid = typeof data === "object";
        // Check if every key, value pair in the object contains a string key and numerical value
        if (is_valid) {
            for (const [key, value] of Object.entries(data)) {
                if (!(typeof(value) === 'number' && (key instanceof String || typeof(key) === 'string'))) {
                    is_valid = false;
                    break;
                }
            }
        }
        if (is_valid) {
            resolve("The data is valid.");
        } else {
            reject("The data is invalid.");
        }
    });
};

module.exports.validate_fields = (type, location, data) => {
    return Promise.all([
        _validate_type(type),
        _validate_location(location),
        _validate_data(data)
    ])
        .then((values) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};
