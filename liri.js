//6. write the code you need to grab the data from keys.js. 
var twitter = require('twitter');
var action = process.argv[2];
var userName = process.argv[3];
if(userName === 'undefined') {userName = 'RichardDotchin'};
var params = {screen_name: userName};
console.log(params);
var twitterKeysFile = require('./keys.js');
//6. Then store the keys in a variable.
var twitterKeys = twitterKeysFile.twitterKeys;

var client = new twitter(twitterKeys);


function twitterFunc() {	
client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (error) return console.log(error);
	console.log("Twitter user: " + params.screen_name + '\n')
	for(var i = 0; i < tweets.length; i++){
		console.log('Date: ' + tweets[i].created_at + '\nTweeted: ' + tweets[i].text + '\n');
	}
	})
}

switch(action){
	case 'my-tweets':
	twitterFunc();
	break
}