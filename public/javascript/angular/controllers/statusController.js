/**
 * Created by skarahoda on 14.08.2016.
 */
angular.module('fitnessApp').controller('StatusController', ['$scope', 'deviceService', function ($scope, deviceService) {
	var serviceInfo = deviceService.deviceInfo();
	serviceInfo.save({}, function (info) {
		$scope.device = info;
		$scope.device.connectionTime = moment.unix(info.connectionTime).fromNow();
	});
}]);