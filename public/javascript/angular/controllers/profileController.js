/**
 * Created by berkcirisci on 15.8.2016.
 */

angular.module('fitnessApp').controller('ProfileController', ['$scope', 'profileService', function ($scope, benchDetailService) {

	var myInfoService = benchDetailService.myInfo();
	var updateService = benchDetailService.update();
	myInfoService.save({}, function (info) {
		console.log(info);
		$scope.user = info;
	}, function (status) {
		//on error
	});
	$scope.userChanged = function () {
		updateService.save($scope.user, function (info) {
			$("#spanNavBarUserName").text(info.name);
			console.log();
			$scope.user = info;
		}, function (status) {
			//on error
		})
	}
}]);