require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter)
var command = process.argv[2];

if (command == "my-tweets"){
    client.get('search/tweets', {q: 'Tim17902317'}, function(error, tweets, response) {
        // console.log(tweets);
     });
}

if (command == "spotify-this-song"){
    var spotifySearchTerm = "";
    var spotifySearchArray = [];
    for (var i = 3 ; i < process.argv.length ; i++ ){
        spotifySearchArray.push(process.argv[i]);
    }
    spotifySearchTerm = spotifySearchArray.join(" ");
    spotify.search({
            type: "track",
            query: spotifySearchTerm,
            limit: 1
        },
        function(err, data){
            if (err) {
                console.log(err);
            }
            console.log(data.tracks.items);
            // console.log(data.tracks.items[0].album.name);
            // console.log(data.tracks.items[0].album.artists[0].name);
    })
}