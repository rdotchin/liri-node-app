//6. write the code you need to grab the data from keys.js. 
var twitter = require('twitter');
var client = new twitter({
	consumer_key: 'yuqo08qDKjc4zQ4BXmYWciRbb',
  consumer_secret: 'RtFF2jyAD08WoGU5aYgXZ4jCyLLzOTFemdBXqnFFU5V02pTcX0',
  access_token_key: '	807060025906696193-RBQEUO3A8L7l0iKLT3kdwEUVoTIQxFr',
  access_token_secret: 'HbmAE9wLkw2Ph3NDCHbztKFbUlpi5txEf6otxn8EQOJzm'
})
var params = {RichardDotchin: 'nodejs'};
var twitterKeysFile = require('./keys.js');
console.log(twitterKeysFile);
//6. Then store the keys in a variable.
var twitterKeys = twitterKeysFile.twitterKeys;
console.log(twitterKeys);
var consumerKey = twitterKeysFile.twitterKeys.consumer_key;
console.log("This is the Consumer Key: " + consumerKey);

/*7. Make it so liri.js can take in one of the following commands:

	* `my-tweets` - show your last 20 tweets and when they were created 
	  at in your terminal window

	* `spotify-this-song`

	* `movie-this`

	* `do-what-it-says`*/
	
client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (error) return console.log(error);
	console.log(tweets);
})