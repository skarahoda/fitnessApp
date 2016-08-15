/**
 * Created by berkcirisci on 15.8.2016.
 */

angular.module('fitnessApp').controller('ProfileController', ['$scope', 'profileService', function ($scope, benchDetailService) {

	var myInfoService = benchDetailService.myInfo();
	myInfoService.save({}, function (info) {
		$scope.user = info;
	}, function (status) {

	});
}]);