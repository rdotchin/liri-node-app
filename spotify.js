var spotify = require('spotify');
var action = process.argv[2];
var song = process.argv[3];
if(song === 'undefined') {song = 'never gonna give you up'};

function spotifyFunc(){
spotify.search({type: 'track', query: 'The Sign'}, function(err, json){
	if(err) {console.log(err)}
		console.log(json.tracks.items[0]);
		console.log(json.tracks.items[0].artists[0].name + '\n' +
					json.tracks.items[0].name + '\n' +
					json.tracks.items[0].external_urls.spotify);
});

}

switch(action){
	case 'spotify-this-song':
	spotifyFunc();
	break
}