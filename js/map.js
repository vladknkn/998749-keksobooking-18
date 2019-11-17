'use strict';

(function () {
  // Функционал карты

  var ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  var price = {
    LOW: 10000,
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: 50000
  };
  window.adForm = document.querySelector('.ad-form');
  window.mapMainPin = document.querySelector('.map__pin--main');
  window.mapFilter = document.querySelector('.map__filters');
  var housingType = window.mapFilter.querySelector('#housing-type');
  var priceType = window.mapFilter.querySelector('#housing-price');
  var roomsValue = window.mapFilter.querySelector('#housing-rooms');
  var guestValue = window.mapFilter.querySelector('#housing-guests');
  var featuresFilter = window.mapFilter.querySelector('#housing-features');
  var checkedFeatures = featuresFilter.querySelectorAll('input:checked');
  var fieldsets = window.adForm.querySelectorAll('fieldset');
  var mapFilterSelects = window.mapFilter.querySelectorAll('select');
  var mapDialog = document.querySelector('.map');
  var isActive = false;
  window.offers = [];
  var filteredOffers = [];

  // Фильтрация объявлений

  function filterHouseType(element) {
    return element.offer.type === housingType.value || housingType.value === 'any';
  }

  function filterPriceValue(element) {
    if (priceType.value === 'any') {
      return true;
    }
    if (element.offer.price < price.LOW) {
      return priceType.value === 'low';
    }
    if (element.offer.price >= price.MIDDLE.MIN && element.offer.price <= price.MIDDLE.MAX) {
      return priceType.value === 'middle';
    }
    if (element.offer.price > price.HIGH) {
      return priceType.value === 'high';
    }

    return false;
  }

  function filterRoomsValue(element) {
    return element.offer.rooms === parseInt(roomsValue.value, 10) || roomsValue.value === 'any';
  }

  function filterGuestsValue(element) {
    if (guestValue.value === 'any') {
      return true;
    }
    if (parseInt(guestValue.value, 10) !== 0 || parseInt(guestValue.value, 10) === 0) {
      return element.offer.guests === parseInt(guestValue.value, 10);
    }

    return false;
  }

  function filterFeatures(offerElement) {
    return Array.from(checkedFeatures).every(function (element) {
      return offerElement.offer.features.includes(element.value);
    });
  }

  function getFilteredOffers() {
    var newOffers = window.offers.slice();
    filteredOffers = newOffers.filter(function (item) {
      return filterHouseType(item) &&
              filterPriceValue(item) &&
              filterRoomsValue(item) &&
              filterGuestsValue(item) &&
              filterFeatures(item);
    });

    return filteredOffers;
  }

  // Загрузка объявлений

  function updateOffers() {
    filteredOffers = getFilteredOffers();
    window.renderPins(filteredOffers);
  }

  function loadHandler(data) {
    window.offers = data;
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
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE && errorElement) {
        errorElement.remove();
      }
    });

  };

  window.mapFilter.addEventListener('change', function () {
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

  function pinMoving() {
    var DragLimit = {
      X: {
        MIN: 100,
        MAX: 1100
      },
      Y: {
        MIN: 100,
        MAX: 700
      }
    };

    var Border = {
      TOP: DragLimit.Y.MIN - window.mapMainPin.offsetHeight,
      BOTTOM: DragLimit.Y.MAX - window.mapMainPin.offsetHeight,
      LEFT: DragLimit.X.MIN - window.mapMainPin.offsetWidth / 2,
      RIGHT: DragLimit.X.MAX - window.mapMainPin.offsetWidth / 2
    };

    var onMainPinMouseDown = function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinPosition = {
          x: window.mapMainPin.offsetLeft - shift.x,
          y: window.mapMainPin.offsetTop - shift.y
        };

        if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
          window.mapMainPin.style.left = mainPinPosition.x + 'px';
        }

        if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
          window.mapMainPin.style.top = mainPinPosition.y + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    window.mapMainPin.addEventListener('mousedown', onMainPinMouseDown);
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
