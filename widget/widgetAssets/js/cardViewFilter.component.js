/* Copyright start
  MIT License
  Copyright (c) 2025 Fortinet Inc
  Copyright end */
'use strict';

(function () {
    let self;
    class cardViewFilterComponent {
        constructor($state, $stateParams, _, CommonUtils, commonService, $rootScope, $timeout, translationService, PagedCollection, Query, Field
        ) {
            self = this;
            this.self = self;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this._ = _;
            this.commonUtils = CommonUtils;
            this.commonService = commonService;
            self.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.translationService = translationService;
            this.PagedCollection = PagedCollection;
            this.Query = Query;
            this.Field = Field;
        }

        $onInit() {
            self.filterSection = [];
            self.configParams = {
                query: {
                    page: 1,
                    limit: 30,
                    filters: [
                        {
                            field: self.config.filters.moduleField,
                            operator: 'like',
                            _operator: 'like',
                            value: self.config.filters.keyStoreName,
                            type: 'primitive'
                        },
                        {
                            sort: [],
                            limit: 30,
                            logic: 'AND',
                            filters: []
                        }
                    ],
                }
            };
            angular.forEach(self.config.filters.mapping, function (value, key) {
                let obj = {};
                obj[key] = false;
                if(key !== 'tag'){
                    self.filterSection.push({
                        type: key,
                        name: value,
                        searchFilter: '',
                        selectionList: obj,
                        singleSelected : false,
                        open: true,
                        values: [],
                        selectionString: ''
                    });
                } else {
                    self.searchByTags = {
                        open:false,
                        recordTags: [],
                        tagsField : new self.Field({
                        name: 'Tags',
                        writeable: true,
                        title: 'Tags',
                        formType: 'tags',
                        dataSource: {
                            model: 'recordTags'
                        }
                    }),
                        placeholder : self.translationService.instantTranslate('MARKETPLACE.PLACEHOLDER_SEARCH_BY_TAGS')
                    };
                }
            });
            
            self._getFilterList();
            self.tagsSelected = [];
        }
        
        //to get and set initial threat actor type list
        _getFilterList() {
            self.processing = true;
            let pagedCollection = new this.PagedCollection('keys', null);
            pagedCollection.query = new this.Query(self.configParams.query);
            pagedCollection.query.__selectFields = ['jSONValue'];
            pagedCollection.loadGridRecord(pagedCollection.query).then(function () {
                angular.forEach(pagedCollection.data['hydra:member'], function (item) {
                    if(item.jSONValue){
                        angular.forEach(self.filterSection,function(section){
                            if(section.type === 'threatActorType'){
                                section.values.push(...item.jSONValue.threat_actor_type);
                            }
                            if(section.type === 'targetedIndustries'){
                                section.values.push(...item.jSONValue.targeted_industries);
                            }
                        });
                    }
                });
                self.processing = false;
            }, angular.noop)
            .finally(function () {
                self.processing = false;
            });
        }

        _updateFilterSelection(_fromRemovedTags) {
            self.filteredArray = [];
            angular.forEach(self.filterSection, function (_currentElement) {
                if (_currentElement.selectionList) {
                    _currentElement.singleSelected = false;
                    angular.forEach(_currentElement.selectionList, function (value, key) {
                        if (value === true) {
                            _currentElement.singleSelected = true;
                            self.filteredArray.push({ 'key': key, 'searchFor': _currentElement.type });
                        }
                    });
                }
            });
            self.tagsSelected.forEach(element => {
                self.filteredArray.push({ 'key': element, 'label': element, 'searchFor': 'tag' });
            });
            self.onViewChange({ $event: { filterList: self.filteredArray , dataFromTags: _fromRemovedTags } });
        }

        clearFilter(event,_type){
            event.preventDefault();
            event.stopPropagation();
            if(_type ===  'tag') {
                self.tagsSelected = [];
                self.searchByTags.recordTags = [];
            } else {
                let _currentType = self._.findWhere(self.filterSection, { 'type': _type });
                angular.forEach(_currentType.selectionList,function(element,key){
                    _currentType.selectionList[key] = false;
                });    
            }
            self._updateFilterSelection();
        }

        clearAllFiltersAndTags(event){
            event.preventDefault();
            event.stopPropagation();
            self.tagsSelected = [];
            self.searchByTags.recordTags = [];
            angular.forEach(self.filterSection,function(elem){
                let _currentType = self._.findWhere(self.filterSection, { 'type': elem.type });
                angular.forEach(_currentType.selectionList,function(element,key){
                _currentType.selectionList[key] = false;
                });    
            });
            self._updateFilterSelection();
        }

        tagsChanged(_value){
            self.tagsSelected = _value.map(element => element.split('/api/3/tags/')[1]);
            self._updateFilterSelection();
        }

        clearFilterSearch(_type){
            let _currentType = self._.findWhere(self.filterSection, { 'type': _type });
            _currentType.searchFilter = '';
        }
    }

    angular.module('cybersponse').component('cardViewFilterComponent', {
        bindings: {
            config: '<',
            onViewChange: '&'
        },
        controller: ['$state', '$stateParams', '_', 'CommonUtils', 'commonService', '$rootScope', '$timeout', 'translationService', 'PagedCollection', 'Query', 'Field',
            cardViewFilterComponent,
        ],
        templateUrl: 'widgets/installed/cardView-1.0.0/widgetAssets/html/cardViewFilter.component.html'
    });
})();