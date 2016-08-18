/**
 * Created by skarahoda on 14.08.2016.
 */
var app = angular.module('fitnessApp', ['ngRoute', 'ngResource', 'googlechart', 'ngAnimate', 'ui.bootstrap']);

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
		.when('/profile', {
			templateUrl: 'users/profile',
			controller: 'ProfileController'
		})
		.otherwise({redirectTo: '/'});
});

app.controller('mainController', ['$scope', 'deviceService', function ($scope, deviceService) {
	var serviceFind = deviceService.findDevice();
	$scope.onClickFind = function () {
		serviceFind.save({})
	}
}]);