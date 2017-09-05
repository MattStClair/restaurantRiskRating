'use strict';
var app = app || {};

(function(module) {
  const searchController = {};
  searchController.index = () => {

    $('#search').show().siblings().hide();
  };
  module.searchController = searchController;
})(app);
