import { Template } from 'meteor/templating';
import './homepage.html';
import { Subscriber } from '/imports/api/subscriber.js';
import '/imports/style.css';



//On Template Render
Template.homepage.onRendered( function() {
  //  this.$('[name="thankSubscribe"]').text("");

    Meteor.subscribe('subscribeList');

     $('.subscribe').validate({
     	
 	  rules: {
        name: 'required',
        email: {
            required: true,
            email: true
        }
    },

     	submitHandler: function (event) {
        // Prevent double submission
    	console.log('form submitted');
    	var emailSub = $('[name="email"]').val();
    	console.log(emailSub);

       }//handler
        

    
     }); //add validation
});//render



Template.homepage.events({

 'submit form': function(event, template){
 	event.preventDefault();

 	var emailSub = $('[name="email"]').val();
 	console.log("yess");
 	template.$('[name="thankSubscribe"]').text("hello");
    template.$('[name="email"]').val('');
 	template.$(".subscribe").hide();

 	//Meteor.call('EmailSubAdd', emailSub);
 	//Meteor.call('sendAnEmail', emailSub);
 }


});



	