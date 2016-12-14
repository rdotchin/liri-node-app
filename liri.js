/*VARIABLES & REQUIRE*/
/*-----------------------------------------------------------------------------------*/
//requires the twitter npm package
var twitter = require('twitter');
//requires the request npm package 
var request = require('request');
//require the spotify npm package
var spotify = require('spotify');
//require fs from node
var fs = require('fs');
//require child_process from node 
var exec = require('child_process').exec;
//link the keys.js file to liri
var twitterKeysFile = require('./keys.js');
//store the keys from keys.js in a variable.
var twitterKeys = twitterKeysFile.twitterKeys;

var client = new twitter(twitterKeys);
//variables set to the action the user request and what they want to search
var action = process.argv[2];

/*END OF VARIABLES & REQUIRE*/
/*-----------------------------------------------------------------------------------*/

/*FUNCTIONS*/
/*-----------------------------------------------------------------------------------*/
//function that pulls recent tweets when action is set to my-tweets
function twitterFunc() {	
	//sets twitter user name to process.argv[3] or RichardDotchin if nothing entered
	var userName = process.argv[3] || 'RichardDotchin';
	/*sets varaible params to an object with a key of screen_name set to the userName
	variable*/
	var params = {screen_name: userName};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (error) return console.log(error);
		console.log("Twitter user: @" + params.screen_name + '\n')
		for(var i = 0; i < tweets.length; i++){
			console.log('Date: ' + tweets[i].created_at + '\nTweeted: ' + tweets[i].text + '\n');
			//setting so only a maximum of 20 tweets are shown
			if(i == 20) {break}
		}
	});
} //end of twitterFunc()

//function to be called when the user sets the variable action to movie-this
function omdbFunc(){
	//sets song to process.argv[3] or default to Mr Nobody if nothing is entered
	var movie = process.argv[3] || 'Mr Nobody';

	//omdb url to be used in the request
	var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";
	
	//request version of an ajax call
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	//taking the response and changing from a string to an object
	    body = JSON.parse(body); 

	    //print the following information to the terminal
	    console.log( '--------OMDB RESULTS--------\n' + 
	    			'Title: ' + body.Title + '\n' +
	    			'Year: ' + body.Year + '\n' +
	    			'IMDB Rating: ' + body.imdbRating + '\n' +
	    			'Country: ' + body.Country + '\n' +
	    			'Language: ' + body.Language + '\n' +
	    			'Plot: ' + body.Plot + '\n' +
	    			'Actors: ' + body.Actors + '\n'+
	    			'Rotten Tomatoes Rating: ' + body.tomatoUserMeter + '\n' +
	    			'Rotten Tomatoes URL: ' + body.tomatoURL + 
	    			'\n------END OF OMDB RESULTS------');
	  }
	});
} //end of omdbFunc()

function spotifyFunc(){
	//sets song to process.argv[3] or a default song if nothing entered
	var song = process.argv[3] || 'never gonna give you up'; 

	spotify.search({type: 'track', query: song}, function(err, data){
		if(err) {console.log(err)}
			
			/*console.log(data.tracks.items[0]);*/
			//console.log info for the song searched to the terminal
			console.log('--------SPOTIFY RESULTS--------\n' + 
						'Artist: ' + data.tracks.items[0].artists[0].name + '\n' +
						'Song: ' + data.tracks.items[0].name + '\n' +
						'Spotify URL: ' + data.tracks.items[0].external_urls.spotify + 
						'\n-------------------------------');
	});
} //end of spotifyFunc()

//read random.txt file using fs and execute the command using child_process
function fsFunc(){
	fs.readFile('./random.txt', 'utf8', function(err, data) {
		if(err) {console.log(err)}
			//command to run using the data read from random.txt
			var cmd = 'node liri.js ' + data;
			//execute the command in the variable cmd
			exec(cmd, function(error, stdout, stderr) {
				//console.log the results from the command
				console.log(stdout);
			})
	});
} //end of fsFunc()

/*END OF FUNCTIONS*/
/*-----------------------------------------------------------------------------------*/

/*SWITCH STATEMENT*/
/*-----------------------------------------------------------------------------------*/
//switch statement calling the function related to the users action request
switch(action){
	//twitter
	case 'my-tweets':
	twitterFunc();
	break
	//omdb
	case 'movie-this':
	omdbFunc();
	break
	//spotify
	case 'spotify-this-song':
	spotifyFunc();
	break
	//read file and execute command
	case 'do-what-it-says':
	fsFunc();
	break
} //end of switch(action) statement

/*END OF SWITCH STATEMENT*/
/*-----------------------------------------------------------------------------------*/