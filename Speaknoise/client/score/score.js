import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './score.html';

Session.set('showIt', 10);





Template.score.onRendered(function(){

   var curr =  Session.get("scoring");  
//parseInt(curr[1])

var correct = parseInt(curr[2]);
var incorrect = parseInt(curr[1]) - correct;
var total = correct + incorrect;

if(total == 0)
{
    console.log('there is no score');
    this.$("#canvas-holder").hide();
    this.$("#scoreTotal").hide();
    this.$("#scoreCount").hide();
    this.$("#statusScore").text("No questions were answered.");



}
else
{
var percent = Math.trunc((correct / total) * 100);
percent = percent.toString();


 Chart.types.Doughnut.extend({
        name: "DoughnutTextInside",
        showTooltip: function() {
            this.chart.ctx.save();
            Chart.types.Doughnut.prototype.showTooltip.apply(this, arguments);
            this.chart.ctx.restore();
        },
        draw: function() {
            Chart.types.Doughnut.prototype.draw.apply(this, arguments);

            var width = this.chart.width,
                height = this.chart.height;

            var fontSize = (height / 114).toFixed(2);
            this.chart.ctx.font = fontSize + "em Titillium Web";
            this.chart.ctx.textBaseline = "middle";

            var text =  percent + "%",
                textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
                textY = height / 2;

            this.chart.ctx.fillText(text, textX, textY);
        }
    });

    var data = [{
        value: incorrect,
        color: "#FF5A5E",
        label: "Incorrect"
    }, {
        value: correct,
        color: "#ff6600",
        label: "Correct"
    }];

    var DoughnutTextInsideChart = new Chart($('#myChart')[0].getContext('2d')).DoughnutTextInside(data, {
        responsive: true
    });




var results = Session.get('results');

if(results.length > 0)
{

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

    Session.set('results', updated);


    Session.set('showIt', 3);
}




}


 });


Template.score.events({
    'click [id="newSession"]':function(event, template){
        event.preventDefault();
    } 
});


Template.score.helpers({

theResults()
{
    var curr = Session.get('showIt');

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
    return curr[1];
        Session.set("showIt", 10);

},

scoreCorrect(){

    var curr = Session.get("scoring");
    return curr[2];
        Session.set("showIt", 10);

}
    
});




 


