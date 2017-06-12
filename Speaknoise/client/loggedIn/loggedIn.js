import { Meteor} from 'meteor/meteor';
import { Profiler } from '/imports/api/profiler.js';
import './loggedIn.html';
import '/imports/style.css';



Template.loggedIn.onRendered(function(){
 console.log("hello 1");
	var curr = Meteor.userId();
	Meteor.subscribe('profiler', curr);
   console.log('it is now in client: ' + Profiler.find());
});


Template.loggedIn.events({
	'click .logout': function(e){
		event.preventDefault();
		Meteor.logout();
		console.log('you have logged out');
		Router.go('homepage');
		//
	}
});


Template.loggedIn.helpers({
	userID(){
		return Meteor.userId();
	},

	userName(){
		return Profiler.find().count();
		
	}

	
});