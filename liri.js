require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter)
var command = process.argv[2];

function getTweets(){
    client.get('search/tweets', {q: 'Tim17902317'}, function(error, tweets, response) {
        console.log("============================================================");
        //NEED TO INCREASE THIS TO 20 ONCE I HAVE 20 TWEETS
        for (k = 0 ; k < 10 ; k ++){
            console.log(tweets.statuses[k].text);
            console.log("============================================================");
        }
     });
}

function getSongInfo(){
    var spotifySearchTerm = "";
    var spotifySearchArray = [];
    if (!process.argv[3]){
        console.log("no argument at index 3")
        spotifySearchTerm = "The Sign";
    }
    else {
        for (var i = 3 ; i < process.argv.length ; i++ ){
            spotifySearchArray.push(process.argv[i]);
        }
        spotifySearchTerm = spotifySearchArray.join(" ");
    }
    spotify.search({
        type: "track",
        query: spotifySearchTerm,
        limit: 1
    },
    function(err, data){
        if (err) {
            console.log(err);
        }
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
    })
}

function getMovieInfo(){
    var movieSearchTerm = "";
    var movieSearchArray = [];
    if (!process.argv[3]){
        console.log("No argument at index 3");
        movieSearchTerm = "Mr. Nobody";
    } else {
        for (var j = 3 ; j < process.argv.length; j++){
            movieSearchArray.push(process.argv[j]);
        }
        movieSearchTerm = movieSearchArray.join(" ");
    }
    request("http://www.omdbapi.com/?t=" + movieSearchTerm + "&y=&plot=short&apikey=trilogy", function(error, response, body){
        if (!error && response.statusCode === 200){
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){

    })
}

if (command == "my-tweets"){
    getTweets();
} else if (command == "spotify-this-song"){
    getSongInfo();
} else if (command == "movie-this"){
    getMovieInfo();
} else if (command === "do-what-it-says"){
    doWhatItSays();
}