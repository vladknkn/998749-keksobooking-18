'use strict';

(function () {
  // Загрузка объявлений

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

  window.errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.body.appendChild(errorElement);
  };

  window.housingType.addEventListener('change', function () {
    updateOffers();
  });

  // Создание карточек

  // function makeCards() {
  //   var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  //   var cardElement = cardTemplate.cloneNode(true);
  //   document.body.appendChild(cardElement);
  // }

  // var pins = document.querySelectorAll('.map__pin');
  // pins.addEventListener('click', function () {
  //   for (var i = 0; i < pins.length; i++) {
  //     if (pins[i].classList.contains !== 'map__pin--main') {
  //       makeCards();
  //     }
  //   }
  // });

  // Активация приложения

  var ENTER_KEYCODE = 13;
  window.adForm = document.querySelector('.ad-form');
  window.mapMainPin = document.querySelector('.map__pin--main');
  var fieldsets = window.adForm.querySelectorAll('fieldset');
  window.mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = window.mapFilter.querySelectorAll('select');
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
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
