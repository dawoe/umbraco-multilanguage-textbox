(function () {
  'use strict';

  function MultiLanguageTextboxController($scope, languageResource) {
    var vm = this;

    vm.initialized = false;
    vm.values = [];
    vm.cultures = [];

    vm.cultureTextBoxes = [];

    vm.validationString = 'init';

    vm.markMandatoryLanguages = !$scope.model.validation.mandatory && $scope.model.config.isMandatoryLanguageRequired;

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

      if (vm.initialized === false) {
        // init has not finished
        return {
          isValid: true,
          errorMsg: '',
          errorKey : 'required',
        }
      }
     
      var isValid = true;

      if ($scope.model.validation.mandatory) {
        if (vm.validationString === '') {
          isValid = false;
        }
      }
      else {
        if ($scope.model.config.isMandatoryLanguageRequired && vm.cultureTextBoxes.some(x => x.isMandatory)) {
          if (vm.validationString === '') {
            isValid = false;
          }
        }
      }
      

      return {
        isValid: isValid,
        errorMsg: "Value cannot be empty",
        errorKey: "required"
      };
    }

    function updateValidationString() {
      if ($scope.model.validation.mandatory) {
        vm.validationString = vm.cultureTextBoxes.map(x => x.value).filter(x => x !== '').join(',')
      }
      else if ($scope.model.config.isMandatoryLanguageRequired && vm.cultureTextBoxes.some(x => x.isMandatory)) {
        vm.validationString = vm.cultureTextBoxes.filter(x => x.isMandatory).map(x => x.value).filter(x => x !== '').join(',')
      }
      else {
        vm.validationString = '';
      }        
      
      vm.mltbform.valueString.$setViewValue(vm.validationString);
      vm.mltbform.valueString.$dirty = true;
     
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
              value: '',
              isMandatory : c.isMandatory
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

        vm.initialized = true;
        updateValidationString();
        
      });
    }

   

    init();

  }

  angular.module('umbraco').controller('Our.Umbraco.MultiLanguageTextboxController',
    ['$scope', 'languageResource', MultiLanguageTextboxController]);
})();
