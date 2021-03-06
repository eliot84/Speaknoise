import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { howler } from 'howler';
import './earTrainerChords.html';

/*
//<button class="btn btn-default" name="selectable" id="0">Major</button>
//<button class="btn btn-default" name="selectable" id="1">Minor</button>
<button class="btn btn-default" name="selectable" id="2">Augmented</button>
<button class="btn btn-default" name="selectable" id="3">Diminished</button>
<button class="btn btn-default" name="selectable" id="4">Major 7th</button>
<button class="btn btn-default" name="selectable" id="5">Minor 7th</button>
<button class="btn btn-default" name="selectable" id="6">Half Diminished 7th</button>
<button class="btn btn-default" name="selectable" id="7">Diminished 7th</button>
<button class="btn btn-default" name="selectable" id="8">Dominant 7th</button>
<button class="btn btn-default" name="selectable" id="9">Major 6th</button>

Session.set("btnStatus", {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false});
Session.set("playSounds", []);
Session.set("currentPlay", [0, 0, 0, 0,]); //0: 1 on/ 0 off, button answer
Session.set("EarTrainerChords", [ ["Major", 0, 4, 7], ["Minor", 0, 3, 7], ["Diminished", 0, 3, 6], ["Augmented", 0, 3, 8] ];

	//["Major", "Minor", "Augmented", "Diminished", "Major 7th", "Minor 7th", "Half Diminished 7th", "", "Minor 6th", "Major 6th", "Minor 7th", "Major 7th", "Perfect 8th"]);
Session.set("playMode", [true]); //Changes between mono and poly intervals

Session.set("scoring", ['Chord Ear Trainer', 0, 0]); // 0 trainer 1 the question 2 is it right or wrong
Session.set("results", []);//  0: "question" 1: questionTotalCount 2: questionTotalWrong
Session.set("userChoice", []);



//CONSTRUCT THE SOUND BANK
var piano = new Howl({
  src: ['cinterval.wav'],
  sprite: {1: [0, 600], 2: [600, 1200], 3: [1800, 1100], 4: [2800, 1100], 5: [3800, 1100], 6: [4800, 1100], 7: [5800, 1100], 8: [6800, 1100], 9: [7800, 1100], 10: [8800, 1100], 11: [9800, 1100], 12: [10800, 1100], 13: [11800, 1100], 14: [12800, 1100], 15: [13800, 1100], 16: [14800, 1100], 17: [15800, 1100], 18: [16800, 1100], 19: [17800, 1100], 20: [18800, 1100], 21: [19800, 1100], 22: [20800, 1100], 23: [21800, 1100], 24: [22800, 1100], 25: [23800, 1100], 26: [24800, 1100], 27: [25800, 1100], 28: [26800, 1100], 29: [27800, 1100], 30: [28800, 1100], 31: [29800, 1100], 32: [30800, 1100], 33: [31800, 1100], 34: [32800, 1100], 35: [33800, 1100], 36: [34800, 1100], 37: [35800, 1100], 38: [36800, 1100], 39: [37800, 1100], 40: [38800, 1100], 41: [39800, 1100], 42: [40800, 1100], 43: [41800, 1100], 44: [42800, 1100], 45: [43800, 1100], 46: [44800, 1100], 47: [45800, 1100], 48: [46800, 1100], 49: [47800, 1100], 50: [48800, 1100], 51: [49800, 1100], 52: [50800, 1100], 53: [51800, 1100], 54: [52800, 1100], 55: [53800, 1100], 56: [54800, 1100], 57: [55800, 1100], 58: [56800, 1100], 59: [57800, 1100], 60: [58800, 1100], 61: [59800, 1100]} });




//When Ear Trainer is first Rendered
Template.earTrainerChords.onRendered(function(){
this.$('#seperately').css("background-color","#ff6600");
this.$('#seperately').css("color","#000000");
this.$('#together').css("background-color","#ffffff");
this.$('#together').css("color","#ff6600");
this.$("#choiceA").hide();
this.$("#choiceB").hide();
this.$("#soundA").hide();
this.$("#soundB").hide();
this.$("#score").hide();
this.$("#repeat").hide();
this.$(".scoreWindow").hide();
this.$("#trainerWindow").hide();
});






//If New Interval is set to play
Tracker.autorun(function(){
	var curr = Session.get('currentPlay');
	var results = Session.get('results');

	if(curr[0] == 2 )
	{
		var playList = Session.get("playSounds"); //list of selections that can be played
		var intervals = Session.get("EarTrainerChords"); //list of chords 
		var playMode = Session.get("playMode"); //Mono or poly?

		//choose a question from the interval availability playList.
		var question = Math.floor(Math.random() * playList.length);
		var answer = playList[question]; //The question
		playList.splice(question, 1); //remove correct answer/question

		//ASSIGN THE SOUNDS TO PLAY
		var soundA = Math.floor(Math.random() * 45 + 1);
		var soundB = Number(answer); //interval semitone 
		var soundC;
		var soundD;
		
		results.push([intervals[answer][0], 5]);
		//console.log('the answer is: ' + answer);


		soundB = soundB + soundA; //actual note to play

		soundB = soundB.toString();
		soundA = soundA.toString();

		//console.log("One: " + soundA + "Two: " +  soundB);



	if(playMode[0]){
			piano.play(soundA);
				piano.once('end', function(){
					showNoteOne();
						piano.play(soundB);
							piano.on('end', function(){
							showNoteTwo();
							showChoices();
					});			
				});
	}
	else
	{
			piano.play(soundA);
			piano.play(soundB);

				piano.once('end', function(){
					showNoteOne();
					showNoteTwo();
					showChoicesTogether();
				});
	}


	


       //Which Choice gets the answer
        var choices = [];
        var correct = intervals[answer];
        var pickWrong = Math.floor(Math.random() * playList.length);
		var incorrect = intervals[playList[pickWrong]];;
		var randest = Math.floor(Math.random() * 2);
		 


		if(randest == 0){
			choices[0] = correct;
			choices[1] = incorrect;
			//console.log("0: " + choices);
			this.$("#choiceA").text(choices[0]);
			this.$("#choiceB").text(choices[1]);
		}
		else{
			choices[1] = correct;
			choices[0] = incorrect;
			//console.log("1: " + choices);
			this.$("#choiceA").text(choices[0]);
			this.$("#choiceB").text(choices[1]);
		}



		Session.set("currentPlay", [0, soundA, soundB, randest]);
	    //Session.set("currentPlay", [0, soundA, soundB, choices[0], choices[1], answer]);

	    Session.set("results", results);
	   // Session.set("results", [ ["intervals",0, 0,], ["minor 3rd", 1, 1] ]);
	
	}
});

  //User has decided an answer and is ready to move on to the next problem. (Score, results gui update)
  Tracker.autorun(function(){

		 var choice = Session.get("userChoice");

		if(choice[0] == 1)
		{
			var currScore = Session.get('scoring');
			var currPlay = Session.get('currentPlay');
			var results = Session.get('results');
			
			var curr = results.length - 1;
			results[curr][1] = 1;

			Session.set('scoring', ['Interval Ear Trainer', currScore[1] + 1, currScore[2] + 1]);
			Session.set('results', results);
			this.$('#trainerWindow').css("background-color","#Ff6600");
			Session.set('userChoice', [30]);
		}
		if(choice[0] == 0)
		{
			var currPlay = Session.get('currentPlay');
			var currScore = Session.get('scoring');
			var results = Session.get('results');

			var curr = results.length - 1;
			results[curr][1] = 0;
			
			this.$('#trainerWindow').css("background-color","#FB1511");
			Session.set("scoring", ['Interval Ear Trainer', currScore[1] + 1, currScore[2] ]);
			Session.set('results', results);

			Session.set('userChoice', [30]);
		} 
	});



Template.earTrainerChords.events({

	//Click the Start Button
	'click [id="startBtn"]':function(event, template){
		var playList = Session.get("playSounds");

		//console.log(playList.length);

		if(playList.length <= 1) //IF NO INTERVALS SELECTED
		{
			template.$("#textIntro").fadeOut("slow");
			template.$("#textIntro").fadeIn("slow");
		}
		else
		{
			//INTERFACE CHANGES
			template.$("#startBtn").attr("id", "endBtn");
			template.$("#endBtn").text("End Session");
			template.$("#textIntro").text("");
			template.$('[name=selectable]').css("visibility", "hidden");
			template.$("#score").show();
			template.$(".scoreWindow").show();
			template.$('#trainerWindow').css("background-color","#Ff6600");
			template.$("#seperately").hide();
			template.$("#together").hide();
			template.$("#trainerWindow").show();
			template.$("#repeat").hide();


			//CURRENT PLAY SESSION
			Session.set('currentPlay', [2]);
			Session.set("scoring", ["Interval Ear Trainer", 0, 0]);
			Session.set("results", ["intervals"]);
		}
	},

	//Click the Setup Button
	'click [id="endBtn"]': function(event, template){	
		    Router.go('/score');
	},

	'click [id="seperately"]': function(event, template){
		event.preventDefault();

			template.$('#seperately').css("background-color","#ff6600");
			template.$('#seperately').css("color","#000000");

			template.$('#together').css("background-color","#ffffff");
			template.$('#together').css("color","#ff6600");

		Session.set("playMode", [true]);
	},

		'click [id="together"]': function(event, template){
		event.preventDefault();
			template.$('#together').css("background-color","#ff6600");
			template.$('#together').css("color","#000000");

			template.$('#seperately').css("background-color","#ffffff");
			template.$('#seperately').css("color","#ff6600");

			Session.set("playMode", [false]);
	},


	'click [id="choiceA"]':function(event, template){
		event.preventDefault();
		
		resetGameButtons(template);
		var currPlay = Session.get('currentPlay');


		if(currPlay[3] == 0)
		{
			Session.set("userChoice", [1]);	
			Session.set('currentPlay', [2]);
		}
		else{
			Session.set("userChoice", [0]);
			Session.set('currentPlay', [2]);
		}

	},
	'click [id="choiceB"]':function(event, template){
		event.preventDefault();
		
		resetGameButtons(template);
		var currPlay = Session.get('currentPlay');


		if(currPlay[3] == 1){
			Session.set("userChoice", [1]);	
			Session.set('currentPlay', [2]);
		}
		else{
			Session.set("userChoice", [0]);
			Session.set('currentPlay', [2]);
		}
	},

	'click [name="selectable"]':function(event, template){
		event.preventDefault();
		
		var btnStatus = Session.get("btnStatus"); //Pull in current btnStatus session
		var selected = event.target.id; //Get the current button ID
		var changeThis = "#" + selected.toString(); //variable will be used to store the change being made


		btnStatus[selected] = !btnStatus[selected]; //make the current button status opposite

		if(btnStatus[selected]) //if the current button's new state is true
		{
			template.$(changeThis).css("background-color","#ff6600");
			template.$(changeThis).css("color", "#000000");
		}
		else// if not true
		{
			template.$(changeThis).css("background-color","white");
			template.$(changeThis).css("color", "#ff6600");		
		}

		Session.set("btnStatus", btnStatus); //set the btnStatus session with the new status
	},

	//SOUND BOX 
	'click [id="soundA"]': function(event, template){
		event.preventDefault();
			var curr = Session.get('currentPlay');
			piano.play(curr[1]);
	},

	//SOUND BOX
	'click [id="soundB"]': function(event, template){
		event.preventDefault();
			var curr = Session.get('currentPlay');
			piano.play(curr[2]);
	},

		'click [id="repeat"]':function(event, template){
		event.preventDefault();

		var curr = Session.get("currentPlay"); 
			piano.play(curr[1]);
			piano.play(curr[2]);
	}
});





//TRACKS IF BUTTON STATE HAS CHANGED
Tracker.autorun(function(){

	//If button status changes
	var btnStatus = Session.get("btnStatus"); //If btnStatus changes
	var choices = []; // lists all available options		

		for(var key in btnStatus) //for all elements in btnStatus
		{
			if(btnStatus[key]) //if any of them are true (selected)
			{
				choices.push(key); //add it to the array list of potential choices
			}
		}	

	var addtoPlay = Session.get("playSounds"); // Bring in session playSounds for updating
		addtoPlay = choices; // update with the new list of potential choices
		Session.set("playSounds", addtoPlay); //set addtoPlay as the new Session playSounds
});

Template.earTrainerChords.helpers({

	scoreTotal(){
		var curr = Session.get("scoring");
		return curr[1];
	},

	scorePoints(){
		var curr = Session.get("scoring");
		return curr[2];
	},


});


//FUNCTIONS
function showChoices(){
	this.$("#choiceA").fadeIn();
	this.$("#choiceB").fadeIn();	
}

function showChoicesTogether(){
	this.$("#repeat").fadeIn();
	this.$("#choiceA").fadeIn();
	this.$("#choiceB").fadeIn();	
}

function showNoteOne(){
	this.$("#soundA").fadeIn();
}

function showNoteTwo(){
	this.$("#soundB").fadeIn();
}

function resetGameButtons(template){
	template.$("#choiceA").hide();
	template.$("#choiceB").hide();
    template.$("#soundA").fadeOut();
    template.$("#soundB").fadeOut();
    template.$("#repeat").hide();

}

*/
