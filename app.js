const profile = require('./profile')


//using command line arguments to pass in user's
const users = process.argv.slice(2)

//store user's in array
//const users = ["chalkers","foreveryoungx","alenaholligan", "davemcfarland"]

//iterate over user's array and use each user object literal as an argument into getProfile function above
users.forEach(profile.get)