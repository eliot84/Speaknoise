import { Meteor} from 'meteor/meteor';
import { Profile } from '../imports/api/profile.js';
import './loggedIn.html';
import '/imports/style.css';



Template.loggedIn.onRendered(function(){

	var curr = Meteor.userId();
	Meteor.subscribe('profiler', curr);
   console.log('it is now in client: ' + profile.find());
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

	firstName(){
		//return 'Eliot';
	}

	
});