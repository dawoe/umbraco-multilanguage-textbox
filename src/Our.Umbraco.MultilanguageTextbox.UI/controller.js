(function () {
  'use strict';

  function MultiLanguageTextboxController($scope, languageResource) {
    var vm = this;


    vm.values = [];
    vm.cultures = [];

    vm.cultureTextBoxes = [];

    vm.updateModel = function () {
      $scope.model.value = [];

      _.each(vm.cultureTextBoxes,
        function (c) {
          $scope.model.value.push({
            culture: c.culture,
            text: c.value
          });
        });
    }

    function init() {
      if ($scope.model.value && $scope.model.value !== '') {
        vm.values = $scope.model.value;
      }

      languageResource.getAll().then(function (data) {
        vm.cultures = data;

        _.each(vm.cultures,
          function (c) {
            var ctb = {
              culture: c.culture,
              label: c.name,
              value: ''
            };

            var cultureValue = _.find(vm.values,
              function (v) {
                return v.culture === c.culture;
              });

            if (cultureValue) {
              ctb.value = cultureValue.text;
            }

            vm.cultureTextBoxes.push(ctb);
          });

      });
    }

    init();

  }

  angular.module('umbraco').controller('Our.Umbraco.MultiLanguageTextboxController',
    ['$scope', 'languageResource', MultiLanguageTextboxController]);
})();
