//6. write the code you need to grab the data from keys.js. 
//requires the twitter npm package
var twitter = require('twitter');
//requires the request npm package 
var request = require('request');
//link the keys.js file to liri
var twitterKeysFile = require('./keys.js');

//store the keys from keys.js in a variable.
var twitterKeys = twitterKeysFile.twitterKeys;

var client = new twitter(twitterKeys);

//variables set to the action the user request and what they want to search
var action = process.argv[2];
//function that pulls recent tweets when action is set to my-tweets
function twitterFunc() {	
var userName = process.argv[3] || 'RichardDotchin';

var params = {screen_name: userName};
client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (error) return console.log(error);
	console.log("Twitter user: @" + params.screen_name + '\n')
	for(var i = 0; i < tweets.length; i++){
		console.log('Date: ' + tweets[i].created_at + '\nTweeted: ' + tweets[i].text + '\n');
	}
	})
}

//function to be called when the user sets the variable action to movie-this
function omdbFunc(){
	//movie the user searches after 'movie-this' in process.argv[2]
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
}