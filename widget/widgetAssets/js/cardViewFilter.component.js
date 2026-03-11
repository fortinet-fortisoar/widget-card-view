/* Copyright start
  MIT License
  Copyright (c) 2026 Fortinet Inc
  Copyright end */
'use strict';

(function () {
    let self;
    class cardViewFilterComponent {
        constructor($state, _, $rootScope, translationService, Query,
        ) {
            self = this;
            this.self = self;
            this.$state = $state;
            this._ = _;
            self.$rootScope = $rootScope;
            this.translationService = translationService;
            this.Query = Query;
        }

        $onInit() {
            self._getFilterList();
        }
        
        //to get and set initial threat actor type list
        _getFilterList(clearAllFilter) {
            self.processing = true;
            var queryConfig = angular.copy(self.config);
            let query = new self.Query({
                widgetQuery: queryConfig.query,
                limit: self.config.query.limit
            });
            self.pagedCollection.query = query;
            if(clearAllFilter) {
                self.pagedCollection.columns = [];
            }else {
                self.pagedCollection.query.__selectFields = angular.copy(self.config.totalFields);
            }
            self.pagedCollection.loadGridRecord(self.pagedCollection.query).then(function () {
                if(clearAllFilter) {
                    self.onViewChange({ $event: { data: self.pagedCollection.data } });
                }
                self.processing = false;
            }, angular.noop)
            .finally(function () {
                self.processing = false;
            });
        }

        

        clearFilter(value,columnFilter){
            columnFilter.term = '';
            this.filterChanged(value, columnFilter.field);
            return;
        }

        clearAllFiltersAndTags(){
            angular.forEach(self.filterColumns, function(colm) {
                colm.term = '';
            });
            self._getFilterList(true);
        }

        filterChanged(newValue, field) {
            self.pagedCollection.columns = [];
            var filters = [];
            if(newValue) {
                filters.push({
                field: field.name,
                value: newValue,
                type: field.type,
                displayTemplate: field.displayTemplate,
                operator: field.operator,
                fieldType: field.onlyDate ? 'date' : undefined
                });
            }
            var _config = {
                logic : 'AND',
                widgetQuery: self.pagedCollection.query.widgetQuery
            };
            _config.filters = filters;
            var query = new self.Query(_config);
            query.updateFilters(filters);
            self.pagedCollection.extendFilter(query, newValue, field);
            self.pagedCollection.loadGridRecord(self.pagedCollection.query).then(function () {
                self.onViewChange({ $event: { data: self.pagedCollection.data } });
            });
            
        }
    }

    angular.module('cybersponse').component('cardViewFilterComponent', {
        bindings: {
            config: '<',
            filterColumns: '<',
            pagedCollection: '<',
            onViewChange: '&'
        },
        controller: ['$state', '_', '$rootScope', 'translationService', 'Query',
            cardViewFilterComponent,
        ],
        templateUrl: 'widgets/installed/cardView-2.0.0/widgetAssets/html/cardViewFilter.component.html'
    });
})();