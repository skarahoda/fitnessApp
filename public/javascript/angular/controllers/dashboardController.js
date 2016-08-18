/**
 * Created by skarahoda on 14.08.2016.
 */
angular.module('fitnessApp')
	.controller('DashboardController', ['$scope', 'dashboardService', function ($scope, dashboardService) {

		var serviceTotalActivity = dashboardService.totalActivityInfo();
		var serviceStepCalorie = dashboardService.stepCalorieInfo();
		var serviceTime = dashboardService.timeActivityInfo();

		function initialize() {
			$scope.timeActivityChart = {
				type: "PieChart",
				options: {
					is3D: true,
					title: "Time Activity"
				}
			};

			$scope.stepCalorieChart = {
				type: "AreaChart",
				options: {
					title: "Steps and Calories Burnt"
				}
			};

			$scope.intervalStatus = 0;

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

			fillUI();
		}

		initialize();

		function fillUI() {
			var request = {
				intervalType: $scope.intervalStatus
			};
			if ($scope.intervalStatus == 4) {
				var textStartDate = $('#textStartDate').val();
				var textEndDate = $('#textEndDate').val();
				var start = moment(textStartDate, 'DD MMMM YYYY').second(0).minute(0).hour(0);
				var end = moment(textEndDate, 'DD MMMM YYYY').second(59).minute(59).hour(23);
				request.from = start.unix();
				request.to = end.unix();
			}
			serviceTotalActivity.save(request, function (info) {
				var step = info.step;
				var distance = info.distance;
				var calorie = info.calorie;
				$scope.totalActivity = info;
				$scope.totalActivity.step.text = '%' + (step.completed * 100 / step.goal).toFixed(0) + ' of goal ' + step.goal;
				$scope.totalActivity.distance.text = '%' + (distance.completed * 100 / distance.goal).toFixed(0) + ' of goal ' + distance.goal;
				$scope.totalActivity.calorie.text = '%' + (calorie.completed * 100 / calorie.goal).toFixed(0) + ' of goal ' + calorie.goal;
			});
			serviceTime.save(request, function (info) {
				$scope.timeActivityChart.data = {
					cols: [
						{id: "a", label: "Activity Type", type: "string"},
						{id: "h", label: "Hour", type: "number"}
					],
					rows: info
				};
			});
			serviceStepCalorie.save(request, function (info) {
				angular.forEach(info, function (row) {
					row.c[0].v = moment.unix(row.c[0].v).toDate()
				});
				$scope.stepCalorieChart.data = {
					cols: [
						{id: "t", label: "Time", type: "date"},
						{id: "s", label: "Steps per five minute", type: "number"},
						{id: "c", label: "Calorie Burned", type: "number"}
					],
					rows: info
				}
			});

		}

		$scope.statusChange = function (intervalStatus) {
			$scope.intervalStatus = intervalStatus;
			fillUI();
		}


	}]);