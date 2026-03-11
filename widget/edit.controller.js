/* Copyright start
  MIT License
  Copyright (c) 2026 Fortinet Inc
  Copyright end */
'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editCardView200Ctrl', editCardView200Ctrl);

    editCardView200Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'widgetUtilityService', '$timeout', 'appModulesService', 'currentPermissionsService', 'Entity', 'gridColumns', '_', '$state'];

    function editCardView200Ctrl($scope, $uibModalInstance, config, widgetUtilityService, $timeout, appModulesService, currentPermissionsService, Entity, gridColumns, _, $state) {
        $scope.state = $state;
        $scope.page = $state.params.page;
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.config = config;
        $scope.params = {fields:{}};
        $scope.config = angular.extend({
          module: null,
          fields: [],
          expandableCol: [],
          relationshipField: [],
          checkboxStatus: false,
          editableFields: false,
          actionButtons: [],
          view: 'onlyValue',
          query: {
            filters: []
          }
        }, $scope.config);
        $scope.config.query.limit = ($scope.config.query.limit || 30);
        $scope.paginationPageSizes = [5, 10, 30, 50, 100, 250];

        loadAttributes();

        $scope.$watch('config.module', function(oldValue, newValue) {
          if ($scope.config.module && oldValue !== newValue) {
            $scope.config.fields = [];
            loadAttributes();
          }
        });

        function loadAttributes() {
          var entity = new Entity($scope.config.module);
          entity.loadFields().then(function() {
            for (var key in entity.fields) {
              if (entity.fields[key].type === 'datetime') {
                entity.fields[key].type = 'datetime.quick';
              }
              // Remove required fields since conditionals shouldn't enforce this
              entity.fields[key].required = false;
            }
            $scope.params.fields = entity.getFormFields();
            $scope.allFields = angular.extend(entity.getFormFields(), entity.getRelationshipFields());
            $scope.config.fields = $scope.config.fields.length > 0 ? $scope.config.fields : [];
            $scope.params.fieldsArray = entity.getFormFieldsArray();
            $scope.fieldsArray = [];
            $scope.htmltextFieldArray = [];
            $scope.textFieldArray = [];
            angular.forEach($scope.params.fieldsArray, function(data) {
              $scope.fieldsArray.push(_.pick(data,'name','title'));
              if(data.type === 'html') {
                $scope.htmltextFieldArray.push(data);
              }else if(data.type === 'text') {
                $scope.textFieldArray.push(data);
              }
            });
            $scope.expandableFieldsArray = entity.getFormFieldsArray();
            $scope.relationshipFields = entity.getRelationshipFieldsArray();
          });
      }

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
                  HEADER_ADD_CARD_VIEW: widgetUtilityService.translate('cardView.HEADER_ADD_CARD_VIEW'),
                  LABEL_NOT_CONFIGURABLE: widgetUtilityService.translate('cardView.LABEL_NOT_CONFIGURABLE')
                };
              });
            }
            else {
              $timeout(function () {
                cancel();
              }, 100)
            }
          }

        function addField(field) {
          $scope.config.fields.push(field);
        }

        function removeField(index) {
          $scope.config.fields.splice(index, 1);
        }

        function init() {
            // To handle backward compatibility for widget
            _handleTranslations();
            appModulesService.load(true).then(function(modules) {
              $scope.modules = currentPermissionsService.availablePermissions(modules, 'read');
            });
        }

        init();

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            $scope.config.totalFields = [];
            $scope.config.totalFields = angular.copy($scope.config.fields);
            if(_.indexOf($scope.config.totalFields , $scope.config.title) === -1 ) {
              $scope.config.totalFields.unshift($scope.config.title);
            }
            if($scope.config.imageURL && _.indexOf($scope.config.totalFields , $scope.config.imageURL) === -1 ) {
              $scope.config.totalFields.push($scope.config.imageURL);
            }
            $uibModalInstance.close($scope.config);
        }

    }
})();
