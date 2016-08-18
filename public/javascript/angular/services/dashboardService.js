/**
 * Created by skarahoda on 15.08.2016.
 */
angular.module('fitnessApp')
	.factory('dashboardService', ['$resource', function ($resource) {
		return {
			totalActivityInfo: function () {
				return $resource('/dashboard/totalActivityInfo', {},
					{
						save: {method: 'POST', isArray: false}
					});
			},
			stepCalorieInfo: function () {
				return $resource('/dashboard/stepCalorieInfo', {},
					{
						save: {method: 'POST', isArray: true}
					});
			},
			timeActivityInfo: function () {
				return $resource('/dashboard/timeActivityInfo', {},
					{
						save: {method: 'POST', isArray: true}
					});
			}
		}
	}]);