'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};
  aboutController.index = () => {

    $('#about').show().siblings().hide();
    $('#logo').show();
  };
  module.aboutController = aboutController;
})(app);
