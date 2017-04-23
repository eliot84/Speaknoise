import { Template } from 'meteor/templating';
import './referenceIntervals.html';
import { howler } from 'howler';


//CONSTRUCT THE SOUND BANK
var piano = new Howl({
  src: ['cinterval.wav'],
  sprite: {1: [0, 600], 2: [600, 1200], 3: [1800, 1100], 4: [2800, 1100], 5: [3800, 1100], 6: [4800, 1100], 7: [5800, 1100], 8: [6800, 1100], 9: [7800, 1100], 10: [8800, 1100], 11: [9800, 1100], 12: [10800, 1100], 13: [11800, 1100], 14: [12800, 1100], 15: [13800, 1100], 16: [14800, 1100], 17: [15800, 1100], 18: [16800, 1100], 19: [17800, 1100], 20: [18800, 1100], 21: [19800, 1100], 22: [20800, 1100], 23: [21800, 1100], 24: [22800, 1100], 25: [23800, 1100], 26: [24800, 1100], 27: [25800, 1100], 28: [26800, 1100], 29: [27800, 1100], 30: [28800, 1100], 31: [29800, 1100], 32: [30800, 1100], 33: [31800, 1100], 34: [32800, 1100], 35: [33800, 1100], 36: [34800, 1100], 37: [35800, 1100], 38: [36800, 1100], 39: [37800, 1100], 40: [38800, 1100], 41: [39800, 1100], 42: [40800, 1100], 43: [41800, 1100], 44: [42800, 1100], 45: [43800, 1100], 46: [44800, 1100], 47: [45800, 1100], 48: [46800, 1100], 49: [47800, 1100], 50: [48800, 1100], 51: [49800, 1100], 52: [50800, 1100], 53: [51800, 1100], 54: [52800, 1100], 55: [53800, 1100], 56: [54800, 1100], 57: [55800, 1100], 58: [56800, 1100], 59: [57800, 1100], 60: [58800, 1100], 61: [59800, 1100]} });





Template.referenceIntervals.onRendered(function(){

	//this.$("button[name='seperately']").css("background-color","#ff6600");
	//this.$("button[name='seperately']").css("color", "#000000");



});



Template.referenceIntervals.events({

 'click [name="selectable"]': function(){
	event.preventDefault();
	event.stopPropagation();
 	
 	var selected = parseInt(event.target.id); //Get the current button ID
 	var playMode = parseInt(event.target.value);
 	var intA = 10;
 	var intB = intA + selected;

 	intA = intA.toString();
 	intB = intB.toString();

 	if(playMode == 0){
		piano.play(intA);
			piano.once('end', function(){
				piano.play(intB);
					piano.on('end', function(){
				});			
			});
 	}
 	else{
 		piano.play(intA);
		piano.play(intB);
 	}	
 },

 'click [name="soundBox"]': function(){
 	event.preventDefault();
	event.stopPropagation();
 		console.log('hello');

 	var selected = parseInt(event.target.id); //Get the current button ID
 	var playSound = parseInt(event.target.title);
 	var intA = 10;
 	var intB = intA + selected;

 	intA = intA.toString();
 	intB = intB.toString();

 	if(playSound == 0){
 		console.log('hello');
 		piano.play(intA);
 	}
 	else{
 		piano.play(intB);
 	}


 }




});