import { Meteor } from 'meteor/meteor';
import { howler } from 'howler';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import './intervalTrainer.html';


//CONSTRUCT THE SOUND BANK
var piano = new Howl({
  src: ['cinterval.wav'],
  sprite: {
  	1: [0, 600], 2: [600, 1200], 3: [1800, 1100], 4: [2800, 1100], 5: [3800, 1100], 6: [4800, 1100], 7: [5800, 1100], 8: [6800, 1100], 9: [7800, 1100], 10: [8800, 1100], 11: [9800, 1100], 12: [10800, 1100], 13: [11800, 1100], 14: [12800, 1100], 15: [13800, 1100], 16: [14800, 1100], 17: [15800, 1100], 18: [16800, 1100], 19: [17800, 1100], 20: [18800, 1100], 21: [19800, 1100], 22: [20800, 1100], 23: [21800, 1100], 24: [22800, 1100], 25: [23800, 1100], 26: [24800, 1100], 27: [25800, 1100], 28: [26800, 1100], 29: [27800, 1100], 30: [28800, 1100], 31: [29800, 1100], 32: [30800, 1100], 33: [31800, 1100], 34: [32800, 1100], 35: [33800, 1100], 36: [34800, 1100], 37: [35800, 1100], 38: [36800, 1100], 39: [37800, 1100], 40: [38800, 1100], 41: [39800, 1100], 42: [40800, 1100], 43: [41800, 1100], 44: [42800, 1100], 45: [43800, 1100], 46: [44800, 1100], 47: [45800, 1100], 48: [46800, 1100], 49: [47800, 1100], 50: [48800, 1100], 51: [49800, 1100], 52: [50800, 1100], 53: [51800, 1100], 54: [52800, 1100], 55: [53800, 1100], 56: [54800, 1100], 57: [55800, 1100], 58: [56800, 1100], 59: [57800, 1100], 60: [58800, 1100], 61: [59800, 1100]
  }
});

/*

//Setup a new reactiveVar
Template.intervalGUI.onCreated(function(){
	this.avarian = new ReactiveVar(1);
	Session.set("myExam", "hello");
});
*/

Template.selections.onCreated(function(){
	Session.set('categories', false);
//	Session.set('selectables', { 'categories': false});
	Session.set('selectables', {'intervals': false, 'cQuality': false, 'cInversions': false});
	Session.set('alphabet', {'a': 1, 'b': 2, 'c': 3});
});

//1 intervals
//2 

// if a button with the name selectable is clicked
// determine which button was clicked
// change status of button 
//change visual look of button
//show hide other buttons






Template.selections.events({
	'click [name="selectable"]': function(event, template){
		event.preventDefault();
	
		//GET BUTTON NAME
		var x = $(event.target).val();
		console.log('name' + x);

		//GET SELECTABLES LIST
		var status = Session.get('selectables');

		//CHANGE THE BUTTON STATUS
		status[x] = !status[x];
	
		//SAVE THE NEW SELECTABLES LIST
		Session.set('selectables', status);



		/* //TEST
		var y = Session.get('selectables');
		console.log('final' + y['intervals'] + y['cQuality'] + y['cInversions']);
		*/

	/*	
// Change the array and then send the entire array back to session set.
		var alpha = Session.get('alphabet');
		console.log('alpha: ' + 'a:' + alpha['a'] + 'b: ' + alpha['b'] + 'c: ' + alpha['c']);

		 alpha['a'] = 500;
		console.log('alpha2: ' + 'a:' + alpha['a'] + 'b: ' + alpha['b'] + 'c: ' + alpha['c']);


		Session.set(alphabet, alpha['a']);
		var beta = Session.get('alphabet');
		//console.log('beta: ' + 'a:' + beta['a'] + 'b: ' + beta['b'] + 'c: ' + beta['c']);
*/
	}
});

Template.selections.helpers({

	intervalStatus(){
		var status = Session.get('selectables');
		if(status['intervals'])
		{
			console.log(status['intervals']);
			return "orange";
		}
		else
		{
			console.log(status['intervals']);
			return "white";
		}
	},
	showIntervals(){
		var status = Session.get('selectables');
		return status['intervals'];
	},

		chordStatus(){
		var status = Session.get('selectables');
		if(status['cQuality'])
		{
			return "orange";
		}
		else
		{
			return "white";
		}
	},
	showChords(){
		var status = Session.get('selectables');
		return status['cQuality'];
	}




});






/*

Template.intervalGUI.events({

	'click [name="repeatPlay"]':function(event, template){
		event.preventDefault();
		console.log('you clicked me');
		piano.play('40');

		runningsum = Template.instance().avarian.get();

		template.avarian.set(runningsum + 1);
	},
});


Template.intervalGUI.helpers({
	//access reactive var
	clickCount(){
		return Template.instance().avarian.get();
	},

	displayThis(){
    	return Session.get("myExam");
	}


});
*/

// intervals
/*
intervalArray = { 
				 'unison': 0,
				 'minor 2nd': 1,
				 'Major 2nd': 2,
				 'Minor 3rd': 3,
				 'Major 3rd': 4,
				 'Perfect 4th': 5,
				 'A4d5': 6,
				 'Minor 6th': 7,
				 'Major 6th': 8,
				 'Minor 7th': 9,
				 'Major 7th': 10,
				 'Perfect 8th: 11
				 }




*/


/*
  	1: [0, 600],         //C
  	2: [600, 1200],	
  	3: [1800, 1100],
  	4: [2800, 1100],
  	5: [3800, 1100],	 //C#
	6: [4800, 1100],
	7: [5800, 1100],
	8: [6800, 1100],
	9: [7800, 1100],
	10: [8800, 1100],
	11: [9800, 1100],
	12: [10800, 1100],
	13: [11800, 1100],
	14: [12800, 1100],
	15: [13800, 1100],
	16: [14800, 1100],
	17: [15800, 1100],
	18: [16800, 1100],
	19: [17800, 1100],
	20: [18800, 1100],
    21: [19800, 1100],
	22: [20800, 1100],
	23: [21800, 1100],
	24: [22800, 1100],
	25: [23800, 1100],
	26: [24800, 1100],
	27: [25800, 1100],
	28: [26800, 1100],
	29: [27800, 1100],
	30: [28800, 1100],
	31: [29800, 1100],
    32: [30800, 1100],
	33: [31800, 1100],
	34: [32800, 1100],
	35: [33800, 1100],
	36: [34800, 1100],
	37: [35800, 1100],
	38: [36800, 1100],
	39: [37800, 1100],
	40: [38800, 1100],
	41: [39800, 1100],
	42: [40800, 1100],
	43: [41800, 1100],
	44: [42800, 1100],
	45: [43800, 1100],
	46: [44800, 1100],
	47: [45800, 1100],
	48: [46800, 1100],
	49: [47800, 1100],
	50: [48800, 1100],
	51: [49800, 1100],
	52: [50800, 1100],
    53: [51800, 1100],
	54: [52800, 1100],
	55: [53800, 1100],
	56: [54800, 1100],
	57: [55800, 1100],
	58: [56800, 1100],
	59: [57800, 1100],
	60: [58800, 1100], 
	61: [59800, 1100]
*/
