/**
 * Created by skarahoda on 15.08.2016.
 */
angular.module('fitnessApp')
	.factory('dashboardService', ['$resource', function ($resource) {
		return {
			totalActivityInfo: function () {
				return $resource('/dashboard/totalActivity', {},
					{
						save: {method: 'POST', isArray: false}
					});
			},
			stepCalorieInfo: function () {
				return $resource('/devices/stepCalorieInfo', {},
					{
						save: {method: 'POST', isArray: false}
					});
			},
			timeActivityInfo: function () {
				return $resource('/devices/timeActivityInfo', {},
					{
						save: {method: 'POST', isArray: false}
					});
			}
		}
	}]);