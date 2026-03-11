/* Copyright start
  MIT License
  Copyright (c) 2026 Fortinet Inc
  Copyright end */
'use strict';

(function () {
  let self;
  class cardViewTileComponent {
    constructor($state, $filter, appModulesService, $rootScope) {
      self = this;
      self.$state = $state;
      self.$filter = $filter;
      self.appModulesService = appModulesService;
      self.appDatetimeFormat = $rootScope.appDatetimeFormat;
      self.defaultImage = self.widgetBasePath + 'widgetAssets/images/default_image.png';
    }

    $onInit() {
      self.processing = false;
      self.fieldsConfig = {};
      angular.forEach(self.config.totalFields, function(field) {
        angular.forEach(self.fieldsArray, function(fieldValue) {
          if(fieldValue.name === field) {
            let newField = angular.copy(fieldValue);
            newField.value = angular.copy(self.contentItem[field]);
            if(fieldValue.type === 'datetime' || fieldValue.type === 'date') {
              newField.value = self.$filter('unixToDate')(newField.value);
            }else if(fieldValue.type === 'number' || fieldValue.type === 'decimal') {
              newField.value = parseFloat(newField.value);
            }
            self.fieldsConfig[field] = newField;
          }
        });
      });
      if(self.$state.params && self.$state.params.uuid && self.contentItem.uuid === self.$state.params.uuid){
        self.onClickDetailPanel(self.contentItem);
      }
    }

    getPlainText(html) {
        return html ? html.replace(/<[^>]+>/g, '') : '';
    }

    //On click function for tiles in listing
    onClickDetailPanel(selectedItem) {
    let module = self.config.module;
      var state = self.appModulesService.getState(module);
        var params = {
          module: module,
          id: self.$filter("getEndPathName")(selectedItem['@id']),
          previousState: self.$state.current.name,
          previousParams: JSON.stringify(self.$state.params),
        };
        self.$state.go(state, params);
    }

  }

  angular.module('cybersponse').component('cardViewTileComponent', {
    bindings: { 
      config: '<',
      fieldsArray: '<',
      contentItem: '<',
      refreshList: '&',
      lastContentItem: '<',
      widgetBasePath: '<'
    },
    controller: ['$state', '$filter', 'appModulesService', '$rootScope',
       cardViewTileComponent,
    ],
    templateUrl: 'widgets/installed/cardView-2.0.0/widgetAssets/html/cardViewTile.component.html'
  });
})();