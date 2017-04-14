import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './sandbox.html';
import { howler } from 'howler';


//CONSTRUCT THE SOUND BANK
var piano = new Howl({
  src: ['cinterval.wav'],
  sprite: {1: [0, 600], 2: [600, 1200], 3: [1800, 1100], 4: [2800, 1100], 5: [3800, 1100], 6: [4800, 1100], 7: [5800, 1100], 8: [6800, 1100], 9: [7800, 1100], 10: [8800, 1100], 11: [9800, 1100], 12: [10800, 1100], 13: [11800, 1100], 14: [12800, 1100], 15: [13800, 1100], 16: [14800, 1100], 17: [15800, 1100], 18: [16800, 1100], 19: [17800, 1100], 20: [18800, 1100], 21: [19800, 1100], 22: [20800, 1100], 23: [21800, 1100], 24: [22800, 1100], 25: [23800, 1100], 26: [24800, 1100], 27: [25800, 1100], 28: [26800, 1100], 29: [27800, 1100], 30: [28800, 1100], 31: [29800, 1100], 32: [30800, 1100], 33: [31800, 1100], 34: [32800, 1100], 35: [33800, 1100], 36: [34800, 1100], 37: [35800, 1100], 38: [36800, 1100], 39: [37800, 1100], 40: [38800, 1100], 41: [39800, 1100], 42: [40800, 1100], 43: [41800, 1100], 44: [42800, 1100], 45: [43800, 1100], 46: [44800, 1100], 47: [45800, 1100], 48: [46800, 1100], 49: [47800, 1100], 50: [48800, 1100], 51: [49800, 1100], 52: [50800, 1100], 53: [51800, 1100], 54: [52800, 1100], 55: [53800, 1100], 56: [54800, 1100], 57: [55800, 1100], 58: [56800, 1100], 59: [57800, 1100], 60: [58800, 1100], 61: [59800, 1100]} });

/*
piano.play('10');
piano.play('14');
piano.play('17');
*/

//	[ ["Major", 0, 4, 7], ["Minor", 0, 3, 7], ["Diminished", 0, 3, 6], ["Augmented", 0, 3, 8] ];


Template.sandbox.helpers({
	shower(){

		var items = {};



		items = [{name: "sally", age: 30},
            		 {name: "jane", age: 12}];

            		 items[2] = {name: "joey", age: 22};
            		 items[3] = {name: "thomas", age: 43};




console.log(items[2].name);
		return items;
	}
});

//stuff[name: "kelly"];



//var items: [{}];


/*var items = [
    { name: "foo", pet: "dog" },
    { name: "bar", pet: "cat" }
  ];

console.log(items); */


//console.log(Math.trunc((27 / 27) * 100));

/*

console.log('its me!');

var results = [ ["Minor 2nd", 1], ["Minor 6th", 0], ["Minor 2nd", 1], ["Minor 3rd", 1], ["Minor 6th", 0], ["Major 7th", 10], ["Minor 2nd", 1], ["Minor 6th", 0], ["Minor 2nd", 1], ["Minor 3rd", 1], ["Minor 6th", 0] ];

console.log("Before sorted: " + results);

results.sort();
console.log("sorted: " + results);


    var theProblem = [], problemTotal = [], problemCorrect = [], prev;

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

    var updated = [];

    for (var i = 0; i < theProblem.length; i++)
    {
    	updated.push(theProblem[i], problemTotal[i], problemCorrect[i])
    }


    console.log("actual problem types: " + theProblem);
    console.log("Total of a problem type: " + problemTotal);
    console.log("total correct: " + problemCorrect);
    console.log("Updated Array: " + updated);


  */  