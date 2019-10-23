'use strict';

(function () {
  // Функционал карты

  var ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  window.adForm = document.querySelector('.ad-form');
  window.mapMainPin = document.querySelector('.map__pin--main');
  window.mapFilter = document.querySelector('.map__filters');
  window.housingType = document.querySelector('#housing-type');
  var fieldsets = window.adForm.querySelectorAll('fieldset');
  var mapFilterSelects = window.mapFilter.querySelectorAll('select');
  var mapDialog = document.querySelector('.map');
  var isActive = false;
  var offers = [];

  // Загрузка объявлений

  function filterHouseType() {
    var newOffers = offers.slice();
    var filteredOffers = newOffers.filter(function (element) {
      if (window.housingType.value !== 'any') {
        return element.offer.type === window.housingType.value;
      } else {
        return newOffers;
      }
    });

    filteredOffers = filteredOffers.map(function (offer, i) {
      offer.id = i;
      return offer;
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

  window.errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    document.body.appendChild(errorElement);

    errorButton.addEventListener('click', function () {
      window.load(loadHandler, window.errorHandler);
    });

    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });

    errorElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        errorElement.remove();
      }
    });

  };

  window.housingType.addEventListener('change', function () {
    updateOffers();
  });

  // Активация приложения

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
    window.load(loadHandler, window.errorHandler);
    isActive = true;
    return isActive;
  }

  // Функционал главного пина

  function pinMoving(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mapMainPin.style.top = (window.mapMainPin.offsetTop - shift.y) + 'px';
      window.mapMainPin.style.left = (window.mapMainPin.offsetLeft - shift.x) + 'px';

      if (window.mapMainPin.style.left === '630px' || window.mapMainPin.style.left === '130px') {
        document.removeEventListener('mousemove', onMouseMove);
      }

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    mapDialog.addEventListener('mouseout', function () {
      document.removeEventListener('mousemove', onMouseMove);
    });

  }

  window.mapMainPin.addEventListener('mousedown', function (evt) {
    activateApplication();
    pinMoving(evt);
  });

  window.mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateApplication();
    }


  });



})();
