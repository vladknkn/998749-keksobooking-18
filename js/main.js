'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ENTER_KEYCODE = 13;
var MAIN_PIN_HEIGHT = 44;
var MAIN_PIN_WIDTH = 40;
var PIN_END_HEIGHT = 22;

// Отрисовка пинов
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getAvatarNumbers(avatars) {
  var avatarNumbers = [];
  for (var j = 1; j <= avatars; j++) {
    avatarNumbers.push(j);
  } return avatarNumbers;
}

var avatarNumbers = getAvatarNumbers(8);

function getRandomItem(itemsArr, isDeleted) {
  var arrIndex = Math.floor(Math.random() * itemsArr.length); // 5
  var randomValue = itemsArr[arrIndex]; // '5 string'
  if (isDeleted) {
    itemsArr.splice(arrIndex, 1);
  }
  return randomValue;
}

function getArrayValues(itemsArr, count) {
  var itemsArrCopy = itemsArr.slice();
  var newArr = [];
  for (var i = 0; i < count && itemsArrCopy.length; i++) {
    var randomValue = getRandomItem(itemsArrCopy, true);
    newArr.push(randomValue);
  }
  return newArr;
}

function getLocationX() {
  var map = document.querySelector('.map');
  var width = map.clientWidth;
  var locationX = Math.floor(Math.random() * width);
  return locationX;
}

function getAvatarImgAddress(avatarNumber) {
  var str = (avatarNumber < 10) ? '0' : '';
  return 'img/avatars/user' + str + avatarNumber + '.png';
}

function getGeneratedAdvert() {
  var rand = getRandomItem(avatarNumbers, true);
  var locationX = getLocationX();
  var locationY = getRandomArbitrary(130, 630);
  return {
    author: {
      avatar: getAvatarImgAddress(rand)
    },

    offer: {
      title: 'Заголовок',
      address: locationX + ', ' + locationY,
      price: getRandomArbitrary(1000, 15000),
      type: getRandomItem(OFFER_TYPES),
      rooms: 2,
      guests: 4,
      checkin: getRandomItem(OFFER_CHECKINS),
      checkout: getRandomItem(OFFER_CHECKOUTS),
      features: getArrayValues(OFFER_FEATURES, getRandomArbitrary(1, 6)),
      description: 'Описание',
      photos: getArrayValues(OFFER_PHOTOS, getRandomArbitrary(1, 3))
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
}

function generateOffers(count) {
  var offersArray = [];
  for (var i = 0; i < count; i++) {
    offersArray.push(getGeneratedAdvert());
  }
  return offersArray;
}

var offers = generateOffers(8);

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function getPin(advert) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;';
  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.title;
  return pinElement;
}

function renderPins(offersArray) {
  var mapPinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offersArray.length; i++) {
    fragment.appendChild(getPin(offersArray[i]));
  }
  mapPinsList.appendChild(fragment);
}

// Активация приложения
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var isActive = false;
var mapMainPin = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var mapFilterSelects = mapFilter.querySelectorAll('select');

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
  adForm.classList.remove('ad-form--disabled');
  renderPins(offers);
  isActive = true;
  return isActive;
}

mapMainPin.addEventListener('mousedown', function () {
  activateApplication();
});

mapMainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateApplication();
  }
});

// Заполнение поля адреса
function fillAddressInput() {
  var addressInput = adForm.querySelector('#address');
  var pinEndX = (MAIN_PIN_WIDTH * 0.5) + PIN_END_HEIGHT;
  var pinEndY = (MAIN_PIN_HEIGHT * 0.5) + PIN_END_HEIGHT;
  var activeAddressValueX = mapMainPin.offsetLeft + pinEndX;
  var activeAddressValueY = mapMainPin.offsetTop + pinEndY;
  if (isActive) {
    addressInput.value = activeAddressValueX + ', ' + activeAddressValueY;
  } else {
    addressInput.value = mapMainPin.offsetLeft + ', ' + mapMainPin.offsetTop;
  }
}

fillAddressInput();

mapMainPin.addEventListener('mousemove', function () {
  fillAddressInput();
});

// Валидация поля цен
var houseType = adForm.querySelector('#type');

function setMinPrices() {
  var priceInput = adForm.querySelector('#price');
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
var timeIn = adForm.querySelector('#timein');

function disableTimeOptions() {
  var timeOut = adForm.querySelector('#timeout');
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
var roomNumber = adForm.querySelector('#room_number');

function disableGuestOptions() {
  var capacity = adForm.querySelector('#capacity');
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
