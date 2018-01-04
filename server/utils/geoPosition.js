const request = require("request");

var geoPosition = (position, callback) => {

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDxs_1aEbZtIVzrFWi2g3Fe7aKra_Llx5E&latlng=${position.latitude},${position.longitude}&sensor=true`,
    json: true
}, 
(error, response, body) => {
    if(error) {
        callback("Unable to connect to google servers.");
    } else if(body.status ===  "ZERO_RESULTS") {
        callback("Unable to find that address.");
    } else if(body.status === "OK"){
        callback(undefined, body.results[0].formatted_address);
    } else {
        callback("Something went wrong.");
    }
});
};

module.exports = {
    geoPosition
}