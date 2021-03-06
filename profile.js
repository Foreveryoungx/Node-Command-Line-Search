
//require HTTPS module
const https = require('https');
const http = require("http");

// Print Error Messages
function printError(error){
    console.error(error.message)
}
//prints message to console for APP
function printMessage(username, badgeCount, point){
    const message =`${username} has ${badgeCount} total badge(s) and ${point} points in JavaScript`;

    console.log(message);
}

function get(username) {
    try {
//connect to API URL
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if(response.statusCode === 200) {
                let body = "";
                // Read the data
                response.on('data', data => {
                    body += data.toString();
                });
                // Parse the data
                response.on('end', () => {
                    try {
                        const profile = JSON.parse(body);
                        // Print out data
                        printMessage(username, profile.badges.length, profile.points.JavaScript)
                    } catch (error) {
                        printError(error);
                    }
                })
            }else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
                //create a new error object if code is not 200 ok
                const statusCodeError = new Error(message);
                printError(statusCodeError)
            }

        })
        //add error handle
        request.on('error', printError)
    } catch (error){
        printError(error)
    }
}

module.exports.get = get