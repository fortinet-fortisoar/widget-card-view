/* Copyright start
  MIT License
  Copyright (c) 2025 Fortinet Inc
  Copyright end */
'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editCardView100Ctrl', editCardView100Ctrl);

    editCardView100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'widgetUtilityService', '$timeout'];

    function editCardView100Ctrl($scope, $uibModalInstance, config, widgetUtilityService, $timeout) {
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.config = config;

        function _handleTranslations() {
            let widgetData = {
              name: $scope.config.name,
              version: $scope.config.version
            };
            let widgetNameVersion = widgetUtilityService.getWidgetNameVersion(widgetData);
            if (widgetNameVersion) {
              widgetUtilityService.checkTranslationMode(widgetNameVersion).then(function () {
                $scope.viewWidgetVars = {
                  // Create your translating static string variables here]
                  BTN_OK: widgetUtilityService.translate('cardView.BTN_OK'),
                  NO_INPUT_REQUIRED: widgetUtilityService.translate('cardView.NO_INPUT_REQUIRED')
                };
              });
            }
            else {
              $timeout(function () {
                cancel();
              }, 100)
            }
          }

        function init() {
            // To handle backward compatibility for widget
            _handleTranslations();
        }

        init();

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            $uibModalInstance.close($scope.config);
        }

    }
})();
