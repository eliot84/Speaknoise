
import { Meteor } from 'meteor/meteor';
import howler from 'howler';

import { Template } from 'meteor/templating';
import './main.html';


//CONSTRUCT THE SOUND BANK
var sound = new Howl({
  src: ['cinterval.wav'],
  sprite: {
  	c1: [0, 690],
  	cs1: [710, 680],
  	d1: [1410, 680]
  }
});

//sound.play();




if(Meteor.isClient)
{


	//CLICK A BOX MAKE A SOUND
	Template.boxes.events({
		'click [name=goal]': function(event){
			event.preventDefault();
			sound.stop(); //Stop previous sound from playing
			console.log('you clicked me');
			sound.play('d1'); //play new sound
		}
	});
}