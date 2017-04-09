import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { howler } from 'howler';
import './earTrainerIntervals.html';


Session.set("btnStatus", {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false});
Session.set("playSounds", []);
Session.set("currentPlay", [0, 0, 0, 0,]); //0: 1 on/ 0 off, button answer
Session.set("intervals", ["Unison", "Minor 2nd", "Major 2nd", "Minor 3rd", "Major 3rd", "Perfect 4th", "Aug 4th / Diminished 5th", "Perfect 5th", "Minor 6th", "Major 6th", "Minor 7th", "Major 7th", "Perfect 8th"]);
Session.set("scoring", [0, 0]);
Session.set("playMode", [true]);

//CONSTRUCT THE SOUND BANK
var piano = new Howl({
  src: ['cinterval.wav'],
  sprite: {1: [0, 600], 2: [600, 1200], 3: [1800, 1100], 4: [2800, 1100], 5: [3800, 1100], 6: [4800, 1100], 7: [5800, 1100], 8: [6800, 1100], 9: [7800, 1100], 10: [8800, 1100], 11: [9800, 1100], 12: [10800, 1100], 13: [11800, 1100], 14: [12800, 1100], 15: [13800, 1100], 16: [14800, 1100], 17: [15800, 1100], 18: [16800, 1100], 19: [17800, 1100], 20: [18800, 1100], 21: [19800, 1100], 22: [20800, 1100], 23: [21800, 1100], 24: [22800, 1100], 25: [23800, 1100], 26: [24800, 1100], 27: [25800, 1100], 28: [26800, 1100], 29: [27800, 1100], 30: [28800, 1100], 31: [29800, 1100], 32: [30800, 1100], 33: [31800, 1100], 34: [32800, 1100], 35: [33800, 1100], 36: [34800, 1100], 37: [35800, 1100], 38: [36800, 1100], 39: [37800, 1100], 40: [38800, 1100], 41: [39800, 1100], 42: [40800, 1100], 43: [41800, 1100], 44: [42800, 1100], 45: [43800, 1100], 46: [44800, 1100], 47: [45800, 1100], 48: [46800, 1100], 49: [47800, 1100], 50: [48800, 1100], 51: [49800, 1100], 52: [50800, 1100], 53: [51800, 1100], 54: [52800, 1100], 55: [53800, 1100], 56: [54800, 1100], 57: [55800, 1100], 58: [56800, 1100], 59: [57800, 1100], 60: [58800, 1100], 61: [59800, 1100]} });




//When Ear Trainer is first Rendered
Template.earTrainerIntervals.onRendered(function(){
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

	if(curr[0] == 2 )
	{
		var playList = Session.get("playSounds");
		var intervals = Session.get("intervals");
		var playMode = Session.get("playMode");

		//choose a question from the interval availability playList.
		var question = Math.floor(Math.random() * playList.length);
		var answer = playList[question];
		playList.splice(question, 1); //remove correct answer/question

		//ASSIGN THE SOUNDS TO PLAY
		var soundA = Math.floor(Math.random() * 48 + 1);
		var soundB = Number(answer); //interval semitone 

		soundB = soundB + soundA; //actual note to play

		soundB = soundB.toString();
		soundA = soundA.toString();

		//console.log("One: " + soundA + "Two: " +  soundB);



	if(playMode[0]){
		console.log("playing back seperately");
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
		console.log("playing back together");
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
			console.log("0: " + choices);
			this.$("#choiceA").text(choices[0]);
			this.$("#choiceB").text(choices[1]);
		}
		else{
			choices[1] = correct;
			choices[0] = incorrect;
			console.log("1: " + choices);
			this.$("#choiceA").text(choices[0]);
			this.$("#choiceB").text(choices[1]);
		}



		Session.set("currentPlay", [0, soundA, soundB, randest]);
	    //Session.set("currentPlay", [0, soundA, soundB, choices[0], choices[1], answer]);

	
	}
});



Template.earTrainerIntervals.events({

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
			template.$("#startBtn").attr("id", "setupBtn");
			template.$("#setupBtn").text("End Session");
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
		}
	},

	//Click the Setup Button
	'click [id="setupBtn"]': function(event, template){
		template.$("#setupBtn").attr("id", "startBtn");
		template.$("#startBtn").text("Start");
	    template.$("#textIntro").text("Select the Intervals you wish to practice and press Start to begin.");
		template.$('[name=selectable]').css("visibility", "visible");
		template.$("#choiceA").hide();
		template.$("#choiceB").hide();
		template.$("#soundA").hide();
		template.$("#soundB").hide();
		template.$("#score").hide();
		template.$(".scoreWindow").hide();
		template.$("#trainerWindow").hide();
		template.$("#seperately").show();
		template.$("#together").show();

		Session.set("scoring", [0, 0]);
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

	//Click Choice A
	'click [id="choiceA"]':function(event, template){
		event.preventDefault();
		resetGameButtons(template);
		var currPlay = Session.get('currentPlay');
		var currScore = Session.get('scoring');

		if(currPlay[3] == 0)
		{
		Session.set('scoring', [currScore[0] + 1, currScore[1] + 1]);
		Session.set('currentPlay', [2]);
		template.$('#trainerWindow').css("background-color","#Ff6600");
		}
		else{
			template.$('#trainerWindow').css("background-color","#FB1511");
			//template.$('#trainerWindow').fadeOut();
			//template.$('#trainerWindow').animate({"backgroundColor","ff3506"}, 2000);
			Session.set('scoring', [currScore[0] + 1, currScore[1]]);
			Session.set('currentPlay', [2]);
		}

	},
		//Click Choice B
	'click [id="choiceB"]':function(event, template){
		event.preventDefault();
		resetGameButtons(template);
		var currPlay = Session.get('currentPlay');
		var currScore = Session.get('scoring');


		if(currPlay[3] == 1){
		Session.set('scoring', [currScore[0] + 1, currScore[1] + 1]);
		Session.set('currentPlay', [2]);
		template.$('#trainerWindow').css("background-color","#Ff6600");

		}
		else{
			template.$('#trainerWindow').css("background-color","#FB1511");
			  //template.$('#trainerWindow').animate({"backgroundColor","ff3506"}, 2000);

			Session.set('scoring', [currScore[0] + 1, currScore[1]]);
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

Template.earTrainerIntervals.helpers({

	scoreTotal(){
		var curr = Session.get("scoring");
		return curr[0];
	},

	scorePoints(){
		var curr = Session.get("scoring");
		return curr[1];
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
