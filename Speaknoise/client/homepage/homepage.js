import { Template } from 'meteor/templating';
import './homepage.html';
import { Subscriber } from '/imports/api/subscriber.js';
import '/imports/style.css';



Template.homepage.onRendered( function() {

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

});



Template.homepage.events({

 'submit form': function(event, template){
 	event.preventDefault();

 	var emailSub = $('[name="email"]').val();
 	
 	template.$('[name="thankSubscribe"]').text("Thank you for Subscribing");
    template.$('[name="email"]').hide();
 	template.$('[name="subscribeSubmit"]').hide();

 	Meteor.call('checkVal', emailSub); //send for further validation
 },

   'click #discover': function() {
    event.preventDefault();

    scrollFunction('#two');
  }

});



var scrollFunction = function(idstring) {
  $('html, body').animate({
    scrollTop: $(idstring).offset().top
  }, 2000);
};
	