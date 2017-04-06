import './home.html';
import '/imports/style.css';


Template.home.events({
	'click [name=subscribeSubmit]': function(){
		event.preventDefault();

		console.log("HELLO!!");
	}
});
