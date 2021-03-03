(function () {
  'use strict';

  function MultiLanguageTextboxController($scope, languageResource) {
    var vm = this;


    vm.values = [];
    vm.cultures = [];

    vm.cultureTextBoxes = [];

    vm.validationString = '';

    vm.updateModel = function () {
      $scope.model.value = [];

      _.each(vm.cultureTextBoxes,
        function (c) {
          $scope.model.value.push({
            culture: c.culture,
            text: c.value
          });
        });

      updateValidationString();
    }

    vm.validateMandatory = function () {
      var isValid = true;

      if ($scope.model.validation.mandatory && vm.validationString === '') {
        isValid = false;
      } 

      return {
        isValid: isValid,
        errorMsg: "Value cannot be empty",
        errorKey: "required"
      };
    }

    function updateValidationString() {
      if (vm.cultureTextBoxes.length > 0) {
        vm.validationString = vm.cultureTextBoxes.map(x => x.value).filter(x => x !== '').join(',')
      }

      if (vm.mltbform && vm.mltbform.valueString.$viewValue !== vm.valueString) {
        vm.mltbform.valueString.$setViewValue(vm.validationString);
      }
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

        updateValidationString();
      });
    }

   

    init();

  }

  angular.module('umbraco').controller('Our.Umbraco.MultiLanguageTextboxController',
    ['$scope', 'languageResource', MultiLanguageTextboxController]);
})();
