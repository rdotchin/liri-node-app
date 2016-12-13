//6. write the code you need to grab the data from keys.js. 
//requires the twitter npm package
var twitter = require('twitter');
//requires the request npm package 
var request = require('request');
//require the spotify npm package
var spotify = require('spotify');
//require the fs npm package
var fs = require('fs');
//link the keys.js file to liri
var twitterKeysFile = require('./keys.js');

//store the keys from keys.js in a variable.
var twitterKeys = twitterKeysFile.twitterKeys;

var client = new twitter(twitterKeys);

//variables set to the action the user request and what they want to search
var action = process.argv[2];
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
}

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
	    console.log('Title: ' + body.Title + '\n' +
	    			'Year: ' + body.Year + '\n' +
	    			'IMDB Rating: ' + body.imdbRating + '\n' +
	    			'Country: ' + body.Country + '\n' +
	    			'Language: ' + body.Language + '\n' +
	    			'Plot: ' + body.Plot + '\n' +
	    			'Actors: ' + body.Actors + '\n'+
	    			'Rotten Tomatoes Rating: ' + body.tomatoUserMeter + '\n' +
	    			'Rotten Tomatoes URL: ' + body.tomatoURL);
	  }
	});
}

function spotifyFunc(){
	//sets song to process.argv[3] or a default song if nothing entered
	var song = process.argv[3] || 'never gonna give you up'; 

	spotify.search({type: 'track', query: song}, function(err, data){
		if(err) {console.log(err)}
			
			/*console.log(data.tracks.items[0]);*/
			//console.log info for the song searched to the terminal
			console.log('Artist: ' + data.tracks.items[0].artists[0].name + '\n' +
						'Song: ' + data.tracks.items[0].name + '\n' +
						'Spotify URL: ' + data.tracks.items[0].external_urls.spotify);
	});

}

var exec = require('child_process').exec;


function fsFunc(){
	fs.readFile('./random.txt', 'utf8', function(err, data) {
		if(err) {console.log(err)}
			
			var cmd = 'node liri.js ' + data;

			exec(cmd, function(error, stdout, stderr) {
				console.log(stdout);
			})
		

	})
}

//switch statement calling the function related to the users action request
switch(action){
	case 'my-tweets':
	twitterFunc();
	break
	case 'movie-this':
	omdbFunc();
	break
	case 'spotify-this-song':
	spotifyFunc();
	break
	case 'do-what-it-says':
	fsFunc();
	break
}