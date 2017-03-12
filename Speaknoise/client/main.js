

//sound.play();



/*
play the interval together or seperately. If seperately, 
play the interval ascending or descending. Assign buttons for 
each choice and assign buttons for playing them together or seperately.





1. if(intervalTogether)
{
	play intervals
}
else
{
	if(intervalAscending)
	{
	
	}
	else //intervalDescending
	{
	
	}
}







//Play Interval Together
piano.once('load', function(){
piano.play('15');
piano.play('20');
});

piano.on('end', function(){
  console.log('Finished!');
});

//Play Interval One after the other

piano.once('load', function(){
piano.play('15');
});

piano.on('end', function(){
  console.log('Finished!');
  piano.
});


if(Meteor.isClient)
{


	//CLICK A BOX MAKE A SOUND
	Template.boxes.events({
		'click [name=goal]': function(event){
			event.preventDefault();
			piano.stop(); //Stop previous sound from playing
			console.log('you clicked me');
			piano.play('19'); //play new sound
		}
	});
}
*/