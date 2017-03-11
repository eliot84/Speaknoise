
import { Meteor } from 'meteor/meteor';
import howler from 'howler';

import { Template } from 'meteor/templating';
import './main.html';


//CONSTRUCT THE SOUND BANK
var sound = new Howl({
  src: ['sound1.mp3', 'sound1.webm', 'sound1.wav']
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
			sound.play(); //play new sound
		}
	});
}