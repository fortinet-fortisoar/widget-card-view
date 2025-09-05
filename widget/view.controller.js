/* Copyright start
  MIT License
  Copyright (c) 2025 Fortinet Inc
  Copyright end */
'use strict';
(function () {
    angular
      .module('cybersponse')
      .controller('cardView100Ctrl', cardView100Ctrl);

    cardView100Ctrl.$inject = ['$scope', 'widgetUtilityService', 'PagedCollection', 'Query', 'widgetBasePath', '_', 'config', 'Entity'];

    function cardView100Ctrl($scope, widgetUtilityService, PagedCollection, Query, widgetBasePath, _, config, Entity) {
      $scope.params = {
        searchText: '',
        query: {
          page: 1,
          limit: 30,
          logic: 'AND',
        }
      };
      $scope.config = {
        module: 'threat_actors',
        mapping: {
          showImg: true,
          image: 'imageURL',
          cardHeader: 'title',
          cardSubHeader: 'description',
          subtitle1: 'threatActorType',
          subtitle2: 'recordTags',
        },
        filters: {
          keyStoreName: 'threat-intel-management-threat-actor-filter',
          moduleField: 'key',
          mapping: {
            threatActorType: 'Threat Actor Type',
            targetedIndustries: 'Targeted Industries',
            tag: 'Tags'
          }
        }
      };

      $scope.searchContent = searchContent;
      $scope.clearSearch = clearSearch;
      $scope.reloadContent = reloadContent;
      $scope.getList = getList;
      $scope.loadNextContent = loadNextContent;
      $scope.toggleFilterPanel = toggleFilterPanel;
      $scope.pageCount = 1;
      $scope.marketPlaceFilterExpand = true;
      $scope.widgetCSS = widgetBasePath + 'widgetAssets/css/cardView.css';
      $scope.onViewUpdated = onViewUpdated;

      function getList(forceReload) {
        if (forceReload) {
          $scope.pageCount = 1;
          $scope.allContentItems = [];
          $scope.allContentItemsCount = 0;
          $scope.totalContentItems = 0;
          $scope.params.searchText = '';
          $scope.params.query.filters = [];
        }
        $scope.params.query.page = $scope.pageCount || 1;
        $scope.processing = true;
        var pagedCollection = new PagedCollection($scope.config.module, null);
        pagedCollection.query = new Query($scope.params.query);
        pagedCollection.query.__selectFields = [$scope.config.mapping.cardHeader, $scope.config.mapping.image, $scope.config.mapping.cardSubHeader, $scope.config.mapping.subtitle1, $scope.config.mapping.subtitle2];
        pagedCollection.currPageNum = $scope.pageCount || 1;
        pagedCollection.loadGridRecord(pagedCollection.query).then(function () {
            if($scope.pageCount === 1){
                $scope.allContentItems = [];
            }
            $scope.allContentItems.push(...pagedCollection.data['hydra:member']);
            $scope.totalContentItems = pagedCollection.data['hydra:totalItems'];
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
        const searchText = ($scope.params.searchText || '').trim();
        const filters = $scope.params.query.filters;

        if (searchText) {
          // Apply title filter
          if(filters.length === 0){
            $scope.params.query.filters = [{
              field: 'title',
              operator: 'like',
              value: `%${searchText}%`,
              _operator: 'like'
            }];
          }else {
            const titleFilter = filters.find(f => f.field === 'title');
            if (titleFilter) {
              titleFilter.value = `%${searchText}%`;
            } else {
              filters.push({
                field: 'title',
                operator: 'like',
                value: `%${searchText}%`,
                _operator: 'like'
              });
            }
          }
        } else {
          // Remove existing title filter
          const index = filters.findIndex(f => f.field === 'title');
          if (index > -1) {
            filters.splice(index, 1);
          }
        }

        $scope.pageCount = 1;
        $scope.getList(); 
      }

      function clearSearch() {
        $scope.getList(true);
      }

      function reloadContent() {
        $scope.getList(true);
      }

      // Helper: add, update, or remove filter
      function updateFilter(field, operator, values) {
        const index = $scope.params.query.filters.findIndex(f => f.field === field);

        if (values && values.length > 0) {
          if (index > -1) {
            $scope.params.query.filters[index].value = values;
          } else {
            $scope.params.query.filters.push({ field, operator, value: values });
          }
        } else if (index > -1) {
          $scope.params.query.filters.splice(index, 1);
        }
      }

      function onViewUpdated($event) {
        $scope.pageCount = 1;
        $scope.params.query.filters = $scope.params.query.filters || [];

        // Extract values
        const threatActorValues = $event.filterList.filter(f => f.searchFor === 'threatActorType').map(f => f.key);
        const targetedIndustries = $event.filterList.filter(f => f.searchFor === 'targetedIndustries').map(f => f.key);
        const tagKeys = $event.filterList.filter(f => f.searchFor === 'tag').map(f => f.key);

        // --- Apply filters ---
        updateFilter('threatActorType', 'in', threatActorValues);

        // Remove old targetedIndustries filters
        $scope.params.query.filters = $scope.params.query.filters.filter(f => f.field !== 'targetedIndustries');

        // Add new targetedIndustries filters
        targetedIndustries.forEach(value => {
          $scope.params.query.filters.push({
            field: 'targetedIndustries',
            operator: 'like',
            value: `%${value}%`
          });
        });

        updateFilter('recordTags', 'in', tagKeys);

        $scope.getList();
      }

      function loadAttributes() {
        $scope.fields = [];
        $scope.fieldsArray = [];
        var entity = new Entity($scope.config.module);
        entity.loadFields().then(function () {
          $scope.fields = entity.getFormFields();
          angular.extend($scope.fields, entity.getRelationshipFields());
          $scope.fieldsArray = entity.getFormFieldsArray();
        });
      }

      function init() {
        // To handle backward compatibility for widget
        _handleTranslations();
        getList();
        loadAttributes();
      }

      init();
    }
})();
