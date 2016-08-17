/**
 * Created by skarahoda on 15.08.2016.
 */
angular.module('fitnessApp')
	.factory('deviceService', ['$resource', function ($resource) {
		return {
			findDevice: function () {
				return $resource('/devices/find', {},
					{
						save: {method: 'POST', isArray: false}
					});
			},
			deviceInfo: function () {
				return $resource('/devices/info', {},
					{
						save: {method: 'POST', isArray: false}
					});
			}
		}
	}]);