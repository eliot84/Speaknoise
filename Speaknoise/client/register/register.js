import { Template } from 'meteor/templating';
import './register.html';
import '/imports/style.css';




//register
Template.register.events({
  'submit form': function(e){
    event.preventDefault();

    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var firstName = $('[name=firstName]').val();
    var lastName = $('[name=lastName]').val(); 

    console.log('email: ' + email + 'password: ' + password);
  
   Accounts.createUser({
    email: email,
    password: password
  }, function(error){
	  if(error){
        console.log(error.reason);
      }
      else{
       //Add user info and tie it to the main login id

       var currentUser = Meteor.userId();
       Meteor.call('newProfile', currentUser, firstName, lastName);
       
       //Go to profile page
       Router.go( '/loggedIn/' + Meteor.userId() );
      }
  });

  }

}); //Close template