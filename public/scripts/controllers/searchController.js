'use strict';
var app = app || {};

(function(module) {
  const searchController = {};
  searchController.index = () => {

    $('#search').show().siblings().hide();
    $('#logo').show();
    $('#wrap').show();
  };
  module.searchController = searchController;
})(app);
