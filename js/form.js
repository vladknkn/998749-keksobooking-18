'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 44;
  var MAIN_PIN_WIDTH = 40;
  var PIN_END_HEIGHT = 22;
  var isActive = false;

  // Заполнение поля адреса
  function fillAddressInput() {
    var addressInput = window.adForm.querySelector('#address');
    var pinEndX = (MAIN_PIN_WIDTH * 0.5) + PIN_END_HEIGHT;
    var pinEndY = (MAIN_PIN_HEIGHT * 0.5) + PIN_END_HEIGHT;
    var activeAddressValueX = window.mapMainPin.offsetLeft + pinEndX;
    var activeAddressValueY = window.mapMainPin.offsetTop + pinEndY;
    if (isActive) {
      addressInput.value = activeAddressValueX + ', ' + activeAddressValueY;
    } else {
      addressInput.value = window.mapMainPin.offsetLeft + ', ' + window.mapMainPin.offsetTop;
    }
  }

  fillAddressInput();

  window.mapMainPin.addEventListener('mousemove', function () {
    fillAddressInput();
  });

  // Валидация поля цен
  var houseType = window.adForm.querySelector('#type');

  function setMinPrices() {
    var priceInput = window.adForm.querySelector('#price');
    if (houseType.value === 'flat') {
      priceInput.min = 1000;
      priceInput.placeholder = 1000;
    } else if (houseType.value === 'house') {
      priceInput.min = 5000;
      priceInput.placeholder = 5000;
    } else if (houseType.value === 'palace') {
      priceInput.min = 10000;
      priceInput.placeholder = 10000;
    } else {
      priceInput.placeholder = 0;
    }
  }

  houseType.addEventListener('change', function () {
    setMinPrices();
  });

  // Валидация полей заезда и выезда
  var timeIn = window.adForm.querySelector('#timein');

  function disableTimeOptions() {
    var timeOut = window.adForm.querySelector('#timeout');
    var timeOutOptions = timeOut.querySelectorAll('option');
    for (var i = 0; i < timeOutOptions.length; i++) {
      if (timeIn.value !== timeOutOptions[i].value) {
        timeOutOptions[i].setAttribute('disabled', 'disabled');
      } else if (timeIn.value === timeOutOptions[i].value) {
        timeOutOptions[i].removeAttribute('disabled');
      }
    }
  }

  timeIn.addEventListener('change', function () {
    disableTimeOptions();
  });

  // Валидация полей комнат и гостей
  var roomNumber = window.adForm.querySelector('#room_number');

  function disableGuestOptions() {
    var capacity = window.adForm.querySelector('#capacity');
    var capacityOptions = capacity.querySelectorAll('option');
    for (var i = 0; i < capacityOptions.length; i++) {
      if (roomNumber.value === '1' && capacityOptions[i].value !== '1') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
      } else if (roomNumber.value === '2' && capacityOptions[i].value !== '1' && capacityOptions[i].value !== '2') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
      } else if (roomNumber.value === '3' && capacityOptions[i].value === '0') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
      } else if (roomNumber.value === '100' && capacityOptions[i].value !== '0') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
      } else if (roomNumber.value === '1' && capacityOptions[i].value === '1') {
        capacityOptions[i].removeAttribute('disabled');
      } else if (roomNumber.value === '2' && capacityOptions[i].value === '1' || capacityOptions[i].value === '2') {
        capacityOptions[i].removeAttribute('disabled');
      } else if (roomNumber.value === '3' && capacityOptions[i].value !== '0') {
        capacityOptions[i].removeAttribute('disabled');
      } else if (roomNumber.value === '100' && capacityOptions[i].value === '0') {
        capacityOptions[i].removeAttribute('disabled');
      }
    }
  }

  roomNumber.addEventListener('change', function () {
    disableGuestOptions();
  });
})();
