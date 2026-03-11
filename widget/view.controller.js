/* Copyright start
  MIT License
  Copyright (c) 2026 Fortinet Inc
  Copyright end */
'use strict';
(function () {
    angular
      .module('cybersponse')
      .controller('cardView200Ctrl', cardView200Ctrl);

    cardView200Ctrl.$inject = ['$scope', 'widgetUtilityService', 'PagedCollection', 'Query', 'widgetBasePath', '_', 'config', 'Entity', '$rootScope', 'gridColumns'];

    function cardView200Ctrl($scope, widgetUtilityService, PagedCollection, Query, widgetBasePath, _, config, Entity, $rootScope, gridColumns) {
      $scope.params = {
        searchText: '',
        query: {
          page: 1,
          limit: 30,
          logic: 'AND',
        }
      };
      $scope.config = config;
      $scope.config.filters = [];
      $scope.searchContent = searchContent;
      $scope.clearSearch = clearSearch;
      $scope.reloadContent = reloadContent;
      $scope.getList = getList;
      $scope.loadNextContent = loadNextContent;
      $scope.toggleFilterPanel = toggleFilterPanel;
      $scope.pageCount = 1;
      $scope.marketPlaceFilterExpand = true;
      $scope.widgetCSS = widgetBasePath + 'widgetAssets/css/cardView.css';
      $scope.widgetBasePath = widgetBasePath;
      $scope.onViewUpdated = onViewUpdated;
      $scope.theme = $rootScope.theme.id;

      function getList(forceReload, searchText) {
        let query;
        if (forceReload) {
          $scope.pageCount = 1;
          $scope.allContentItems = [];
          $scope.allContentItemsCount = 0;
          $scope.totalContentItems = 0;
          $scope.params.searchText = '';
          $scope.params.query.filters = [];
        }
        $scope.params.query.page = $scope.pageCount || 1;
        if ($scope.config.query) {
          var queryConfig = angular.copy($scope.config);
          query = new Query({
            widgetQuery: queryConfig.query,
            limit: $scope.config.query.limit
          });
        }
        $scope.pagedCollection.columns = angular.copy($scope.config.totalFields);
        $scope.pagedCollection.query = query;
        $scope.pagedCollection.query.__selectFields = angular.copy($scope.config.totalFields);
        $scope.pagedCollection.currPageNum = $scope.pageCount || 1;
        if(searchText) {
          $scope.pagedCollection.query.search = $scope.params.searchText;
        }
        $scope.pagedCollection.loadGridRecord($scope.pagedCollection.query).then(function () {
            if($scope.pageCount === 1){
                $scope.allContentItems = [];
            }
            $scope.allContentItems.push(...$scope.pagedCollection.data['hydra:member']);
            $scope.totalContentItems = $scope.pagedCollection.data['hydra:totalItems'];
            $scope.allContentItemsCount = $scope.allContentItems.length;
            $scope.processing = false;
          })
          .finally(function () {
            $scope.processing = false;
          });
      }

      function toggleFilterPanel(){
        $scope.marketPlaceFilterExpand = !$scope.marketPlaceFilterExpand;
      }

      function loadNextContent() {
        if($scope.allContentItemsCount < $scope.totalContentItems){
            $scope.pageCount += 1;
            $scope.getList();
        }
      }
      
      function _handleTranslations() {
        widgetUtilityService.checkTranslationMode($scope.$parent.model.type).then(function () {
          $scope.viewWidgetVars = {
            // Create your translating static string variables here
          };
        });
      }

      function searchContent() {
        $scope.getList(null, true);
      }

      function clearSearch() {
        $scope.getList(true);
      }

      function reloadContent() {
        $scope.getList(true);
      }

      function onViewUpdated($event) {
        $scope.allContentItems = [];
        $scope.allContentItems.push(...$event.data['hydra:member']);
        $scope.totalContentItems = $event.data['hydra:totalItems'];
        $scope.allContentItemsCount = $scope.allContentItems.length;
      }

      function loadAttributes() {
        $scope.fields = [];
        $scope.fieldsArray = [];
        var entity = new Entity($scope.config.module);
        entity.loadFields().then(function () {
          $scope.fields = entity.getFormFields();
          angular.extend($scope.fields, entity.getRelationshipFields());
          $scope.fieldsArray = entity.getFormFieldsArray();
          $scope.filterColumns = gridColumns.create($scope.fieldsArray, $scope.pagedCollection.query, $scope.config.totalFields);
          $scope.filterColumns = _.filter($scope.filterColumns, function(column) { return (_.indexOf($scope.config.totalFields,column.filter.field.name) !== -1) && (column.filter.field.name !== $scope.config.imageURL) && (column.filter.field.name !== $scope.config.cardLeftBorder) ;});
          $scope.filterColumns = _.pluck($scope.filterColumns, 'filter');
          angular.forEach($scope.fieldsArray, function (field) {
            angular.forEach($scope.config.fields, function(fieldValue) {
              if(fieldValue === field.name) {
                $scope.config.filters.push(field);
              }
            });
          });
        });
      }

      function init() {
        // To handle backward compatibility for widget
        $scope.processing = true;
        $scope.pagedCollection = new PagedCollection($scope.config.module, null);
        _handleTranslations();
        getList();
        loadAttributes();
      }

      init();
    }
})();
