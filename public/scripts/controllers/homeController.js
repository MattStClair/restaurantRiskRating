'use strict';
var app = app || {};

(function(module) {
  const homeController = {};
  homeController.index = () => {

    $('#home').show().siblings().hide();
    $('#logo').show();
    $('#wrap').show();
  };
  module.homeController = homeController;
})(app);
