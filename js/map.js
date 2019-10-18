'use strict';

(function () {
  var offers = [];
  window.housingType = document.querySelector('#housing-type');


  function filterHouseType() {
    var newOffers = offers.slice();
    var filteredOffers = newOffers.filter(function (element) {
      if (window.housingType.value !== 'any') {
        return element.offer.type === window.housingType.value;
      } else {
        return newOffers;
      }
    });
    return filteredOffers;
  }

  function updateOffers() {
    var filteredOffersArray = filterHouseType();
    window.renderPins(filteredOffersArray);
  }

  function loadHandler(data) {
    offers = data;

    updateOffers();
  }

  function errorHandler() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.body.appendChild(errorElement);
  }

  window.housingType.addEventListener('change', function () {
    updateOffers();
  });

  // Активация приложения
  var ENTER_KEYCODE = 13;
  window.adForm = document.querySelector('.ad-form');
  window.mapMainPin = document.querySelector('.map__pin--main');
  var fieldsets = window.adForm.querySelectorAll('fieldset');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapDialog = document.querySelector('.map');
  var isActive = false;

  function setArrayAttribute(array, firstValue, secondValue) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute(firstValue, secondValue);
    }
  }

  window.deactivateApplication = function () {
    setArrayAttribute(fieldsets, 'disabled', 'disabled');
    setArrayAttribute(mapFilterSelects, 'disabled', 'disabled');
    mapDialog.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    isActive = false;

  };

  window.deactivateApplication();

  function removeArrayAttribute(array, value) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute(value);
    }
  }

  function activateApplication() {
    mapDialog.classList.remove('map--faded');
    removeArrayAttribute(fieldsets, 'disabled');
    removeArrayAttribute(mapFilterSelects, 'disabled');
    window.adForm.classList.remove('ad-form--disabled');
    window.load(loadHandler, errorHandler);
    isActive = true;
    return isActive;
  }

  window.mapMainPin.addEventListener('mousedown', function () {
    activateApplication();
  });

  window.mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateApplication();
    }
  });
})();
