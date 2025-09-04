/* Copyright start
  MIT License
  Copyright (c) 2025 Fortinet Inc
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
      self.defaultImage = 'widgets/installed/cardView-1.0.0/widgetAssets/images/default_image.png';
    }

    $onInit() {
      self.processing = false;
      if(self.$state.params && self.$state.params.uuid && self.contentItem.uuid === self.$state.params.uuid){
        self.onClickDetailPanel(self.contentItem);
      }
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
      lastContentItem: '<'
    },
    controller: ['$state', '$filter', 'appModulesService', '$rootScope',
       cardViewTileComponent,
    ],
    templateUrl: 'widgets/installed/cardView-1.0.0/widgetAssets/html/cardViewTile.component.html'
  });
})();