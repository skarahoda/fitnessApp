/**
 * Created by skarahoda on 14.08.2016.
 */
var app = angular.module('fitnessApp', ['ngRoute', 'angularCharts']);

app.config(function ($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl: 'dashboard/page',
			controller: 'DashboardController'
		})
		.when('/status', {
			templateUrl: 'devices/page',
			controller: 'StatusController'
		})
		.otherwise({redirectTo: '/'});
});