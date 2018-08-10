require("dotenv").config();
require("node-spotify-api");
var spotify = new spotify(MediaKeySession.spotify);

var command = process.argv[2];

console.log(command)