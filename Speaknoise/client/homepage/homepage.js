import { Template } from 'meteor/templating';
import './homepage.html';
import { Subscriber } from '/imports/api/subscriber.js';
import '/imports/style.css';
import { howler } from 'howler';



//CONSTRUCT THE SOUND BANK
var speaknoise = new Howl({
  src: ['SNaudio.mp3']
});


//Login button press
Template.login.events({
  'submit form': function(e){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    console.log("email: " + email + "password: " + password);
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        console.log(error.reason);
      }
      else{
        var id = Meteor.userId();
        Router.go( '/loggedIn/' + id);
      }

      console.log("you initiated the login process");
      console.log(error.reason);
      document.write(error);
    });
  }
});







Template.homepage.onRendered( function() {
/*
    Meteor.subscribe('subscribeList');

     $('.subscribe').validate({
     	
 	  rules: {
        name: 'required',
        email: {
            required: true,
            email: true
        }
    }   
     });
*/

});



Template.homepage.events({
/*
 'submit form': function(event, template){
 	event.preventDefault();

 	var email = $('[name=email]').val();
  var password = $('[name=password]').val();

  console.log("email: " + email + "password: " + password);
 	
 	//template.$('[name="thankSubscribe"]').text("Thank you for Subscribing");
  //  template.$('[name="email"]').hide();
 	//template.$('[name="subscribeSubmit"]').hide();

 	//Meteor.call('checkVal', emailSub); //send for further validation
 },

*/

    //discover button animation
   'click #discover, touchstart #discover': function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    speaknoise.play();
    scrollFunction('#two');
  }

});



var scrollFunction = function(idstring) {
  $('html, body').animate({
    scrollTop: $(idstring).offset().top
  }, 2000);
};
	