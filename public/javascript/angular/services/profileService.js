/**
 * Created by skarahoda on 15.08.2016.
 */
angular.module('fitnessApp')
	.factory('profileService', ['$resource', function ($resource) {
		return {
			myInfo: function () {
				return $resource('/users/myInfo', {},
					{
						save: {method: 'POST', isArray: false}
					});
			}
		}
	}]);