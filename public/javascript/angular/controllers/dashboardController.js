/**
 * Created by skarahoda on 14.08.2016.
 */
angular.module('fitnessApp').controller('DashboardController', function ($scope) {

	function initialize() {
		$scope.timeActivityChart = {};
		$scope.timeActivityChart.type = "PieChart";

		$(function () {
			var startPicker = $('#datePickerStart');
			var endPicker = $('#datePickerEnd');
			startPicker.datetimepicker({
				format: 'DD MMMM YYYY',
				defaultDate: 'now'
			});
			endPicker.datetimepicker({
				format: 'DD MMMM YYYY',
				useCurrent: false, //Important! See issue #1075
				maxDate: 'now',
				defaultDate: 'now'
			});
			startPicker.on("dp.change", function (e) {
				$('#datePickerEnd').data("DateTimePicker").minDate(e.date);
			});
			endPicker.on("dp.change", function (e) {
				$('#datePickerStart').data("DateTimePicker").maxDate(e.date);
			});
		});
	}

	initialize();

	$scope.onions = [
		{v: "Onions"},
		{v: 3}
	];

	$scope.timeActivityChart.data = {
		"cols": [
			{id: "t", label: "Topping", type: "string"},
			{id: "s", label: "Slices", type: "number"}
		], "rows": [
			{
				c: [
					{v: "Mushrooms"},
					{v: 3}
				]
			},
			{c: $scope.onions},
			{
				c: [
					{v: "Olives"},
					{v: 31}
				]
			},
			{
				c: [
					{v: "Zucchini"},
					{v: 1}
				]
			},
			{
				c: [
					{v: "Pepperoni"},
					{v: 2}
				]
			}
		]
	};

	$scope.timeActivityChart.options = {
		is3D: true,
		title: "Time Activity"
	};

	$scope.stepCalorieChart = {};

	$scope.stepCalorieChart.type = "AreaChart";

	$scope.stepCalorieChart.data = {
		"cols": [
			{id: "t", label: "Topping", type: "date"},
			{id: "s", label: "Slices", type: "number"},
			{id: "a", label: "deneme", type: "number"}
		], "rows": [
			{
				c: [
					{v: new Date(2016, 2, 13)},
					{v: 3},
					{v: 4}
				]
			},
			{
				c: [
					{v: new Date(2016, 2, 14)},
					{v: 2},
					{v: 3}
				]
			},
			{
				c: [
					{v: new Date(2016, 2, 15)},
					{v: 31},
					{v: 6}
				]
			},
			{
				c: [
					{v: new Date(2016, 3, 13)},
					{v: 1},
					{v: 5}
				]
			},
			{
				c: [
					{v: new Date(2016, 3, 14)},
					{v: 2},
					{v: 12}
				]
			}
		]
	};

	$scope.stepCalorieChart.options = {
		title: "Steps and Calories Burnt"
	};

	$scope.intervalStatus = 0;

	$scope.statusChange = function (intervalStatus) {
		$scope.intervalStatus = intervalStatus;

	}


});