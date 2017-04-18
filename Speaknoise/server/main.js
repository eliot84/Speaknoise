import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Subscriber } from '../imports/api/subscriber.js';


Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = 'smtp://postmaster@mail.speaknoise.com:8053d15b63b0d6c5618be27e2957a003@smtp.mailgun.org:587';

//%40
});


if(Meteor.isServer)
{

	Meteor.publish('subscribeList', function(){
		return Subscriber.find();
	});






	Meteor.methods({
	  'sendAnEmail': function(emailSubmitted){
			console.log("your call work i am from sendAnEmail");

		Email.send({
 		 to: emailSubmitted,
 		 from: "Speaknoise <subscription@mail.speaknoise.com>",
 		 subject: "Your Subscription to Speaknoise",
  		 text: "Thank you for subscribing with Speaknoise. We will keep you updated on services currently in development."
		});
	  },

	  'EmailSubAdd': function(emailSubmitted){
	  	var currUser = Meteor.userId();
	  	var curr = emailSubmitted;

		console.log("EmailSubAdd was called");

	  	var data = {
	  		currUser: currUser,
	  		email: emailSubmitted
	  	}

	  	Subscriber.insert(data);
	  }


	});

}
