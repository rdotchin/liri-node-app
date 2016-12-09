/*Need to install request and all other npm packages in each project folder.  If you 
have 2 diff projects on your computer each folder needs to have request installed
to it*/

//requires the request npm package to this file
var request = require('request');
//url for omdb api
var action = process.argv[2];
var movie = process.argv[3];
/*defaults movie variable to frozen if the user does not submit a movie title and
the value of the variable is undefined*/
if(typeof movie === 'undefined') {movie = 'frozen';}

//omdb url to be used in the request
var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";

//function to be called when the user sets the variable action to movie-this
function omdbFunc(){
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

//switch statement for the action the user requests
switch(action){
	case 'movie-this':
	omdbFunc();
}

/*request(url, function(error, response, body) error response object, 
response response object has a lot of metadata in the request, time 
attempted, what server its hitting, ect.  Not like ajax
body parameter is the actual response from the url.  What we get back from the url.  it returns
back as a string *need to use json.parse to turn the string into an object so we can use it.*/