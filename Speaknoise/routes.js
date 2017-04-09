
/*
Router.configure({
	layoutTemplate: 'main'
}); */



Router.route('/', function () {
  this.render('Home');
});

Router.route('earTrainerIntervals');
Router.route('referenceGuide');
Router.route('charts');


