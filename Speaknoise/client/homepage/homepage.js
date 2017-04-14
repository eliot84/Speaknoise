import { Template } from 'meteor/templating';
import './homepage.html';
import '/imports/style.css';


Template.homepage.events({
	'click [name=subscribeSubmit]': function(){
		event.preventDefault();

	}
});
