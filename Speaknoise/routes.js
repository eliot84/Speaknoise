
/*
Router.configure({
	layoutTemplate: 'main'
}); */



Router.route('/', function () {
  this.render('homepage');
});
Router.configure({notFoundTemplate: 'layout'});


Router.route('homepage');
Router.route('earTrainerIntervals');
Router.route('earTrainerChords');
Router.route('referenceGuide');
Router.route('score');
//Router.route('sandbox');
Router.route('comingSoon');
Router.route('referenceIntervals');
Router.route('intervals');
Router.route('practiceEarTrainingIntervals');
Router.route('register');

// given a url like "/post/5"
Router.route('/loggedIn/:_id', {
	name: 'loggedIn',
	template: 'loggedIn'
});
