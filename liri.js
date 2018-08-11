//Requiring all dependencies
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

//Initializing twitter and spotify
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter)

//Declaring the command the user inputs
var command = process.argv[2];

//Variables used to take the input from the user and set them to the search terms
//For both Spotify and OMDB
var movieSearchTerm = "";
var movieSearchArray = [];
var spotifySearchTerm = "";
var spotifySearchArray = [];

//This if/else statement takes in user input and assigns it to the search parameters for
//both Spotify and OMDB. If the user doesn't input a search term, it sets the default.
if (!process.argv[3]){
    spotifySearchTerm = "The Sign";
    movieSearchTerm = "Mr. Nobody";
}
else {
    for (var i = 3 ; i < process.argv.length ; i++ ){
        spotifySearchArray.push(process.argv[i]);
        movieSearchArray.push(process.argv[i]);
    }
    spotifySearchTerm = spotifySearchArray.join(" ");
    movieSearchTerm = movieSearchArray.join(" ");
}

//Function taht uses the twitter package to return 20 of my tweets to the console
function getTweets(){
    client.get('search/tweets', {q: 'Tim17902317'}, function(error, tweets, response) {
        //Puts a line of ===== before the first tweet
        console.log("============================================================");
        //Loops through 20 of my tweets
        for (k = 0 ; k < 10 ; k ++){
            //Logs the tweet being iterated upon to the console
            console.log(tweets.statuses[k].text);
            fs.appendFile("log.txt", tweets.statuses[k].text, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("============================================================");
        }
     });
}

//Function that takes the user's input and searches spotify for information about the song they entered.
function getSongInfo(song){
    //Sets the song being searched for to the variable assigned in the if/else statement above
    song = spotifySearchTerm
    spotify.search({
        //Searches specifically for a song
        type: "track",
        query: song,
        //Returns one song
        limit: 1
    },
    function(err, data){
        //If an error occurs, it is logged to the console.
        if (err) {
            console.log(err);
        }
        //Appends to log.txt and console logs the name of the song, the artists, album name, and a preview URL.
        console.log(data.tracks.items[0].name);
        fs.appendFile("log.txt", data.tracks.items[0].name, function(err){
            if (err){
                console.log(err);
            }
        })
        console.log(data.tracks.items[0].album.artists[0].name);
        fs.appendFile("log.txt", data.tracks.items[0].album.artists[0].name, function(err){
            if (err){
                console.log(err);
            }
        })
        console.log(data.tracks.items[0].album.name);
        fs.appendFile("log.txt", data.tracks.items[0].album.name, function(err){
            if (err){
                console.log(err);
            }
        })
        console.log(data.tracks.items[0].preview_url);
        fs.appendFile("log.txt", data.tracks.items[0].preview_url, function(err){
            if (err){
                console.log(err);
            }
        })
    })
}

//Function that takes the user's input and searches for a movie.
function getMovieInfo(movie){
    //Sets the movie being serached for to the variable assigned in the if/else statement above
    movie = movieSearchTerm
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body){
        //If there is no error and we have a good response code, the following code will run
        if (!error && response.statusCode === 200){
            //This series of console.logs displays the title, year, ratings, language, plot, and actors of the movie
            console.log("Title: " + JSON.parse(body).Title);
            fs.appendFile("log.txt", JSON.parse(body).Title, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("Year released: " + JSON.parse(body).Year);
            fs.appendFile("log.txt", JSON.parse(body).Year, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            fs.appendFile("log.txt", JSON.parse(body).Ratings[0].Value, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            fs.appendFile("log.txt", JSON.parse(body).Ratings[1].Value, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("Country where movie was produced: " + JSON.parse(body).Country);
            fs.appendFile("log.txt", JSON.parse(body).Country, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("Language: " + JSON.parse(body).Language);
            fs.appendFile("log.txt", JSON.parse(body).Language, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("Plot: " + JSON.parse(body).Plot);
            fs.appendFile("log.txt", JSON.parse(body).Plot, function(err){
                if (err){
                    console.log(err);
                }
            })
            console.log("Actors: " + JSON.parse(body).Actors);
            fs.appendFile("log.txt", JSON.parse(body).Actors, function(err){
                if (err){
                    console.log(err);
                }
            })
        }
    })
}

//Function that runs whatever command is in the random.txt file.
function doWhatItSays(){
    //uses the fs module to read random.txt
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            //if an error occurs, it is logged to the console.
            console.log(err);
        } else {
            //Takes the items in random.txt and splits them into arrays. This sets the command being
            //entered to the index of [0] and the argument to the index of [1].
            var randomArr = data.split(",");
            //If the command, or index at [0], is 'spotify-this-song', this code will execute.
            if (randomArr[0] === "spotify-this-song"){
                console.log("Running spotify search from doWhatItSays()")
                //Sets the spotify search tearm to the argument passed in random.txt
                spotifySearchTerm = randomArr[1];
                //calls the getSongInfo() function with the value of randomArr[1] as an argument.
                getSongInfo();
                //If the command in random.txt is 'my-tweets', this code will execute.
            } else if (randomArr[0] === "my-tweets"){
                console.log("running getTweets() from doWhatItSays()");
                //Calls the getTweets function.
                getTweets();
                //If the command in random.txt is 'movie-this', this code will execute.
            } else if (randomArr[0] === "movie-this"){
                console.log("Running imdb search from doWhatItSays()");
                //sets the movie search term to the arument passed in random.txt
                movieSearchTerm = randomArr[1];
                //Calls the getMovieInfo function with the value of randomArr[1] as an arument
                getMovieInfo();
            }
        }
    })
}

//This series of if/else statements runs a function based on user input
if (command == "my-tweets"){
    getTweets();
} else if (command == "spotify-this-song"){
    getSongInfo();
} else if (command == "movie-this"){
    getMovieInfo();
} else if (command === "do-what-it-says"){
    doWhatItSays();
}