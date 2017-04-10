import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './score.html';


Template.score.onRendered(function(){

});


Template.score.events({
	'click [id="newSession"]':function(event, template){
		event.preventDefault();
	}
});


Template.score.helpers({
	scoreTotal(){
		var curr = Session.get("scoring");
		return curr[1];
	},
		scoreCorrect(){
		var curr = Session.get("scoring");
		return curr[2];
	}
});
