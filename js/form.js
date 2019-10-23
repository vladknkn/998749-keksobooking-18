'use strict';

(function () {
  // Валидация полей

  var MAIN_PIN_HEIGHT = 44;
  var MAIN_PIN_WIDTH = 40;
  var PIN_END_HEIGHT = 22;
  var DEFAULT_PIN_X = 570;
  var DEFAULT_PIN_Y = 375;
  window.houseType = window.adForm.querySelector('#type');
  var priceInput = window.adForm.querySelector('#price');
  var roomNumber = window.adForm.querySelector('#room_number');
  var timeIn = window.adForm.querySelector('#timein');
  var resetButton = window.adForm.querySelector('.ad-form__reset');
  var titleInput = window.adForm.querySelector('#title');
  var descriptionInput = window.adForm.querySelector('#description');
  var features = window.adForm.querySelector('.features');
  var featuresCheckboxes = features.querySelectorAll('input');
  var addressInput = window.adForm.querySelector('#address');
  var isActive = false;

  // Заполнение поля адреса

  function fillAddressInput() {
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

  function setMinPrices() {
    switch (window.houseType.value) {
      case 'flat':
        priceInput.min = 1000;
        priceInput.placeholder = 1000;
        break;
      case 'house':
        priceInput.min = 5000;
        priceInput.placeholder = 5000;
        break;
      case 'palace':
        priceInput.min = 10000;
        priceInput.placeholder = 10000;
        break;
      default:
        priceInput.placeholder = 0;
    }
  }

  window.houseType.addEventListener('change', function () {
    setMinPrices();
  });

  // Валидация полей заезда и выезда

  function disableTimeOptions() {
    var timeOut = window.adForm.querySelector('#timeout');
    var timeOutOptions = timeOut.querySelectorAll('option');
    for (var i = 0; i < timeOutOptions.length; i++) {
      if (timeIn.value !== timeOutOptions[i].value) {
        timeOutOptions[i].setAttribute('disabled', 'disabled');
      } else if (timeIn.value === timeOutOptions[i].value) {
        timeOutOptions[i].removeAttribute('disabled');
        timeOutOptions[i].selected = true;
      }
    }
  }

  disableTimeOptions();

  timeIn.addEventListener('change', function () {
    disableTimeOptions();
  });

  // Валидация полей комнат и гостей

  function disableGuestOptions() {
    var capacity = window.adForm.querySelector('#capacity');
    var capacityOptions = capacity.querySelectorAll('option');
    for (var i = 0; i < capacityOptions.length; i++) {
      if (roomNumber.value === '1' && capacityOptions[i].value !== '1') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
        capacityOptions[2].selected = true;
      } else if (roomNumber.value === '2' && capacityOptions[i].value !== '1' && capacityOptions[i].value !== '2') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
        capacityOptions[1].selected = true;
      } else if (roomNumber.value === '3' && capacityOptions[i].value === '0') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
        capacityOptions[0].selected = true;
      } else if (roomNumber.value === '100' && capacityOptions[i].value !== '0') {
        capacityOptions[i].setAttribute('disabled', 'disabled');
        capacityOptions[3].selected = true;
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

  disableGuestOptions();

  // Сброс настроек

  roomNumber.addEventListener('change', function () {
    disableGuestOptions();
  });

  function roomNumberReset() {
    var roomNumberOptions = roomNumber.querySelectorAll('option');
    roomNumberOptions[0].selected = true;
    disableGuestOptions();
  }

  function timeReset() {
    var timeInOptions = timeIn.querySelectorAll('option');
    timeInOptions[0].selected = true;
    disableTimeOptions();
  }

  function houseTypeReset() {
    var houseTypeOptions = window.houseType.querySelectorAll('option');
    houseTypeOptions[1].selected = true;
  }

  function textFieldsReset() {
    priceInput.placeholder = 5000;
    titleInput.value = '';
    descriptionInput.value = '';
  }

  function featuresReset() {
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      featuresCheckboxes[i].checked = false;
    }
  }

  function mainPinReset() {
    window.mapMainPin.style = 'left:' + DEFAULT_PIN_X + 'px; top: ' + DEFAULT_PIN_Y + 'px;';
    addressInput.value = DEFAULT_PIN_X + ', ' + DEFAULT_PIN_Y;

  }

  function pinsListReset() {
    window.mapPinsList.innerHTML = '';
    window.mapPinsList.appendChild(window.mapMainPin);
  }

  function filtersReset() {
    var filterOptions = window.mapFilter.querySelectorAll('option');
    for (var i = 0; i < filterOptions.length; i++) {
      if (filterOptions[i].value === 'any') {
        filterOptions[i].selected = true;
      }
    }

    var housingFeatures = window.mapFilter.querySelector('#housing-features');
    var housingFeaturesCheckboxes = housingFeatures.querySelectorAll('input');
    for (i = 0; i < housingFeaturesCheckboxes.length; i++) {
      housingFeaturesCheckboxes[i].checked = false;
    }
  }

  function toReset() {
    window.deactivateApplication();
    roomNumberReset();
    timeReset();
    houseTypeReset();
    textFieldsReset();
    featuresReset();
    mainPinReset();
    pinsListReset();
    filtersReset();
  }

  resetButton.addEventListener('click', function () {
    toReset();
  });

  // Отправка формы

  function showSuccessMessage() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.body.appendChild(successElement);

    successElement.addEventListener('click', function () {
      successElement.remove();
    });

    successElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        successElement.remove();
      }
    });
  }

  function saveHandler() {
    showSuccessMessage();
    window.deactivateApplication();
  }

  window.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(window.adForm), saveHandler, window.errorHandler);
  });

})();
