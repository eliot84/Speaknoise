import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './score.html';
import '/imports/chartbundle.js';





Template.score.events({
	'click [id="newSession"]':function(event, template){
		event.preventDefault();
	} 
});


Template.score.helpers({

	scoreTrainerType(){
	var curr = Session.get("scoring");
	return curr[0];
	},

	scoreTotal(){
		var curr = Session.get("scoring");
		return curr[1];
	},
		scoreCorrect(){
		var curr = Session.get("scoring");
		return curr[2];
	},

        scoreQuestionType(){
            var curr = Session.get("results");
            return curr;
        }
});





Template.score.onRendered(function(){

    var curr = Session.get('results');
    var newResult = [];
    var prev;

    curr.pop();
    curr.shift();
    curr.sort();



    for(var i=0; i<curr.length;i++){
        if(curr[i][0] !== prev){
            newResult.push(curr[i][0]);
        }
        prev = curr[i][0];
    }


    Session.set('results', newResult);
    console.log("YOYOYOYOYOY" + Session.get('results'));
    
});