/*VARIABLES & REQUIRE*/
/*-----------------------------------------------------------------------------------*/
var twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var fs = require('fs');
//require child_process from node for fsFunc() to run command in terminal
var exec = require('child_process').exec;
//link the keys.js file to liri
var twitterKeysFile = require('./keys.js');
//store the keys from keys.js in a variable.
var twitterKeys = twitterKeysFile.twitterKeys;
var client = new twitter(twitterKeys);
//variables set to the action the user request and what they want to search
var action = process.argv[2];
/*-----------------------------------------------------------------------------------*/

/*LOG TERMINAL COMMANDS AND RESULTS*/
/*-----------------------------------------------------------------------------------*/
var logQ = process.argv[3] || ' '
var terminalCmd = '\n⚫️TERMINAL COMMAND: node liri.js ' + action + ' ' + logQ + '⚫️\n';
fs.appendFile('./log.txt', terminalCmd, function(err){
	if(err) {console.log(err)}
})

//logs results by appending to a text file named log.txt
function logText(text) {
	fs.appendFile('./log.txt', text, function(err) {
	if(err) {console.log(err)}
});
/*-----------------------------------------------------------------------------------*/

} //end of logText function
/*APP FUNCTIONS*/
/*-----------------------------------------------------------------------------------*/
//function that pulls recent tweets when action is set to my-tweets
function twitterFunc() {	
	//sets twitter user name to process.argv[3] or RichardDotchin if nothing entered
	var userName = process.argv[3] || 'RichardDotchin';
	/*paramaters of screen_name and count maximum of 20*/
	var params = {screen_name: userName,
				  count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (error) {return console.log(error)};
		var twitterName = "---------TWITTER---------\nTwitter user: @" + params.screen_name + '\n'
		//log username to terminal and log.txt
		console.log('\n' + twitterName);
		//log username to log.txt
		logText('\n' + twitterName);
		//for loop to print out each tweet
		for(var i = 0; i < tweets.length; i++){
			//tweets set to variable userTweets
			var userTweets = '\nDate: ' + tweets[i].created_at + '\nTweeted: ' + tweets[i].text + '\n'
			//log tweets to terminal
			console.log(userTweets);
			//log tweets to log.txt
			logText(userTweets);
		}
	});
} //end of twitterFunc()

//function to be called when the user sets the variable action to movie-this
function omdbFunc(){
	//variables for user movie search and url to be used in the request
	var movie = process.argv[3] || 'Mr Nobody';
	var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";
	
	//request version of an ajax call
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  	//taking the response and changing from a string to an object
		    body = JSON.parse(body); 
		    //omdb results set to variable omdbResults
		    var omdbResults = '\n--------OMDB RESULTS--------\n' + 
		    			'\nTitle: ' + body.Title + '\n' +
		    			'Year: ' + body.Year + '\n' +
		    			'IMDB Rating: ' + body.imdbRating + '\n' +
		    			'Country: ' + body.Country + '\n' +
		    			'Language: ' + body.Language + '\n' +
		    			'Plot: ' + body.Plot + '\n' +
		    			'Actors: ' + body.Actors + '\n'+
		    			'Rotten Tomatoes Rating: ' + body.tomatoUserMeter + '\n' +
		    			'Rotten Tomatoes URL: ' + body.tomatoURL + 
		    			'\n\n-----END OF OMDB RESULTS🎬-----\n';
		    //log omdb results to the terminal
		    console.log(omdbResults);
		    //log omdb results to log.txt
		    logText(omdbResults);
	  }
	});
} //end of omdbFunc()

function spotifyFunc(){
	//sets song to process.argv[3] or a default song if nothing entered
	var song = process.argv[3] || 'never gonna give you up'; 
	//use Spotify npm package to search for song requested by user
	spotify.search({type: 'track', query: song}, function(err, data){
		if(err) {console.log('Spotify error: ' + err)}	
		//song information set to variable spotifyResults
		var spotifyResults = '\n--------SPOTIFY RESULTS--------\n\n' + 
					'Artist: ' + data.tracks.items[0].artists[0].name + '\n' +
					'Song: ' + data.tracks.items[0].name + '\n' +
					'Spotify URL: ' + data.tracks.items[0].external_urls.spotify + 
					'\n\n-----END OF SPOTIFY RESULTS🤘----\n';
		//log spotify results to the terminal
		console.log(spotifyResults);
		//log spotify results to log.txt
		logText(spotifyResults);
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
				//log results to the terminal
				console.log(stdout);
				//log results to log.txt
				logText(stdout);
			})
	});
} //end of fsFunc()
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
/*-----------------------------------------------------------------------------------*/