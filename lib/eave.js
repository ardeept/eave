/*
	

	Name 		: Eave
	Author 		: Ferdinand Yanto III
	Date 		: April 20, 2014
	Description : This is an application that will just listen to all twitter streams and process the tweets.

*/


var Eave = function(c)
{
	var self 		= this;

	var ntwitter 	= require('ntwitter');
	var auth 		= require('../config/auth');
	var nt 			= new ntwitter(auth);

	self.id 		= c.id;
	self.ave  		= 0;
	self.lengths 	= [];

	self.trackMessage 		= c.trackMessage;

	self.run = function () {

		console.log(self.id, "Eave is running.");
	
		self.track();	  	
	}

	self.track = function()
	{
		nt.stream('statuses/filter', { track: self.trackMessage}, function(stream) {
	  		
	  		console.log('Listening for Tweets with: ', self.trackMessage);

	    	stream.on('data', self.gotTweet);
	    	stream.on('error', self.gotError);
	  	});
	}

	self.gotTweet = function(tweet)
	{
		// console.log(tweet);
		// process.exit();
		// console.log("[" + tweet.user.screen_name + "]", tweet.text.length, " ave: " , self.getAverageStats(tweet.text));
		console.log(
				
				self.id, self.lengths.length ,
				" \t len: ", tweet.text.length, 
				" \t ave: ", self.getAverageStats(tweet.text).toFixed(2),
				" \t msg: ", tweet.text.substr(0,100), " user:", tweet.user.screen_name

			);

	}

	self.getAverageStats = function(message)
	{
		var length = message.length;

		self.lengths.push(length);

		var sum = 0;
		for(var i = 0 ; i < self.lengths.length; i++)
		{
			sum += self.lengths[i];
		}

		var ave = sum / self.lengths.length;

		self.ave = ave;

		return ave;
	}

	self.gotError = function(type, code, message)
	{
		console.log(type,code,message);
	}
}


module.exports = Eave;

// var e = new Eave({
// 	id: 'e1',
// 	trackMessage: 'talaga'
// });

// e.run();

// var e2 = new Eave({
// 	id: 'e2',
// 	trackMessage: 'boracay'
// });

// e2.run();