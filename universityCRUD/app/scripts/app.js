'use strict';

var app = angular.module('myApp', ['ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	    .state('app',{
			url: '/',
			views: {
				'header':{
					templateUrl: 'views/header.html'
				},
			    'content':{
			    	templateUrl: 'views/home.html'
				},	
				'footer':{
					templateUrl: 'views/footer.html'
				}	

		//.state()			
			}
		
	

	});

	$urlRouterProvider.otherwise('/');	
});