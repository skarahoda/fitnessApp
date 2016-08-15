/**
 * Created by berkcirisci on 15.8.2016.
 */

angular.module('fitnessApp').controller('ProfileController', function ($scope) {
	$scope.user = {
		name: "Berk Çirişci",
		gender: "Male",
		height: "1.80 m",
		weight: "72 kg"
	};

});