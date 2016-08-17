/**
 * Created by berkcirisci on 15.8.2016.
 */

angular.module('fitnessApp').controller('ProfileController', ['$scope', 'profileService', function ($scope, profileService) {

	var serviceMyInfo = profileService.myInfo();
	var serviceUpdate = profileService.update();
	serviceMyInfo.save({}, function (info) {
		console.log(info);
		$scope.user = info;
	}, function (status) {
		//on error
	});
	$scope.userChanged = function () {
		serviceUpdate.save($scope.user, function (info) {
			$("#spanNavBarUserName").text(info.name);
			console.log();
			$scope.user = info;
		}, function (status) {
			//on error
		})
	}
}]);