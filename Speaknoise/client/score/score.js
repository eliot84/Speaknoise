import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './score.html';

Session.set('showIt', 10);


Template.score.events({
	'click [id="newSession"]':function(event, template){
		event.preventDefault();
	} 
});


Template.score.helpers({

theResults()
{
    var curr = Session.get('showIt');
/*
dummy content
var items = [];

items[0] = {problem: "Major 2nd", totalProblem: 34, correctProblem: 12, correctPercent: 60};
items[1] = {problem: "Major 2nd", totalProblem: 34, correctProblem: 12, correctPercent: 40};
items[2] = {problem: "Major 2nd", totalProblem: 34, correctProblem: 12, correctPercent: 40};

return items;
*/

    if(curr == 3)
    {
        items = Session.get('results');
        showIt = Session.get('showIt');

        return items;
        Session.set('showIt', 4);
    }
},

scoreTotal(){

    var curr = Session.get("scoring");
    console.log('oiwufiwoeufiow');
    return curr[1];
    Session.set("showIt", 10);  
},

scoreCorrect(){

    var curr = Session.get("scoring");
        console.log('its time');

    return curr[2];
    Session.set("showIt", 10);
}
	
});







Template.score.onRendered(function(){

var results = Session.get('results');

if(results.length > 0)
{
 console.log(results.length);

    results.pop();
    results.shift();
    results.sort();

 var updated = [], theProblem = [], problemTotal = [], problemCorrect = [], percentCorrect = [], prev;

    for ( var i = 0; i < results.length; i++ ) {
        if ( results[i][0] !== prev ) {
            theProblem.push(results[i][0]);
            problemTotal.push(1);
            problemCorrect.push(results[i][1]);
        } else {
            problemTotal[problemTotal.length-1]++;

            problemTotal[problemTotal.length-1]
            problemCorrect[problemCorrect.length-1] = problemCorrect[problemCorrect.length-1] + results[i][1];
        }
        prev = results[i][0];
    }
  
    //find percentage correct and merge all results into update
    for (var i = 0; i < theProblem.length; i++)
    {
        percentCorrect[i] = Math.trunc((problemCorrect[i] / problemTotal[i]) * 100);
        updated[i] =  {problem: theProblem[i], totalProblem: problemTotal[i], correctProblem: problemCorrect[i], correctPercent: percentCorrect[i]};
    }
    console.log(updated);

    Session.set('results', updated);


    Session.set('showIt', 3);
}
 });


