
/*
Router.configure({
	layoutTemplate: 'main'
}); */



Router.route('/', function () {
  this.render('homepage');
});

Router.route('homepage');
Router.route('earTrainerIntervals');
Router.route('referenceGuide');
Router.route('score');


