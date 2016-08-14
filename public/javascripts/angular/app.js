/**
 * Created by skarahoda on 14.08.2016.
 */
var app = angular.module('fitnessApp', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl: 'pages/dashboard',
			controller: 'DashboardController'
		})
		.otherwise({redirectTo: '/'});
});