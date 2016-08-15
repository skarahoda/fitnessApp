/**
 * Created by skarahoda on 14.08.2016.
 */
angular.module('fitnessApp').controller('DashboardController', function ($scope) {

	$scope.config = {
		tooltips: true,
		labels: true,
		mouseover: function () {
		},
		mouseout: function () {
		},
		legend: {
			display: true,
			//could be 'left, right'
			position: 'right'
		}
	};

	$scope.data = {
		series: ['Steps per 5 Minutes', 'Calories Burnt'],
		data: [{
			x: "00:00",
			y: [100, 200]
		}, {
			x: "06:00",
			y: [200, 300]
		}, {
			x: "12:00",
			y: [200, 100]
		}, {
			x: "18:00",
			y: [300, 220]
		}]
	};

	$scope.data2 = {
		data: [{
			x: "Sleep",
			y: [6],
			tooltip: "%25"
		}, {
			x: "Sedentary",
			y: [2],
			tooltip: "%8.3"
		}, {
			x: "Lightly Active",
			y: [6],
			tooltip: "%25"
		}, {
			x: "Fairly Active",
			y: [4],
			tooltip: "%16.7"
		}, {
			x: "Very Active",
			y: [6],
			tooltip: "%25"
		}]
	};
});