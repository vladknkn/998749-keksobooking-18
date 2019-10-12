'use strict';

(function () {
  // Рендер пинов
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function getPin(offer) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;
    return pinElement;
  }

  function loadHandler(offers) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(getPin(offers[i]));
    }
    mapPinsList.appendChild(fragment);
  }

  function errorHandler() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.body.appendChild(errorElement);
  }

  // Активация приложения
  var ENTER_KEYCODE = 13;
  window.adForm = document.querySelector('.ad-form');
  window.mapMainPin = document.querySelector('.map__pin--main');
  var fieldsets = window.adForm.querySelectorAll('fieldset');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var isActive = false;

  function setArrayAttribute(array, firstValue, secondValue) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute(firstValue, secondValue);
    }
  }

  function deactivateApplication() {
    setArrayAttribute(fieldsets, 'disabled', 'disabled');
    setArrayAttribute(mapFilterSelects, 'disabled', 'disabled');
  }

  deactivateApplication();

  function removeArrayAttribute(array, value) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute(value);
    }
  }

  function activateApplication() {
    var mapDialog = document.querySelector('.map');
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
