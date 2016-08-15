/**
 * Created by berkcirisci on 15.8.2016.
 */

angular.module('fitnessApp').controller('ProfileController', ['$scope', 'profileService', function ($scope, benchDetailService) {

	var myInfoService = benchDetailService.myInfo();
	myInfoService.save({}, function (info) {
		console.log(info);
	}, function (status) {

	});
	$scope.user = {
		name: "Berk Çirişci",
		gender: "Male",
		height: "1.80 m",
		weight: "72 kg"
	};

}]);