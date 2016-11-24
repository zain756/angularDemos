var app = angular.module('myApp', ['ui.router']);
app.constant('apikey','7111b06a719a7143768c344884da9962');
app.constant ('baseURL1', 'http://www.apilayer.net/api/live');
app.constant ('baseURL2', 'http://www.apilayer.net/api/list');

app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        //controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
		      
            // route for the live rates page
            .state('app.liveRates', {
                url:'liverates',
                views: {
                    'content@': {
                        templateUrl : 'views/ratesView.html',
                        controller  : 'ratesViewCtrl'                  
                    }
                }
            })
				
				// route for the live rates page
            .state('app.conversion', {
                url:'conversion',
                views: {
                    'content@': {
                        templateUrl : 'views/conversionView.html',
                        controller  : 'conversionViewCtrl' 
								 
								
                    }
                }
            })
        /*
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

				*/
          
    
        $urlRouterProvider.otherwise('/');
    })
;
