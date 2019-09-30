'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
<<<<<<< HEAD
=======
var avatarNumber = getAvatarArray();
var locationX = getLocationX();
var locationY = getLocationY();

function getAvatarArray() {
  var avatarNumber = [];
  for(var i = 1; i < 9; i++) {
    var number = i;
    avatarNumber.push(number);
  } return avatarNumber;
}
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880

function getRandomArbitrary (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

<<<<<<< HEAD
function getRandomNumber(amount) {
  return Math.floor(Math.random() * amount);
};

function getAvatarNumbers (avatars) {
  var avatarNumbers = [];
  for (var j = 1; j <= avatars; j++) {
    avatarNumbers.push(j);
  } return avatarNumbers;
};

var avatarNumbers = getAvatarNumbers(8);

function getRandomItem(itemsArr, isDeleted) {
  var arrIndex = Math.floor(Math.random() * itemsArr.length); // 5
=======
var prices = [1000, 5000, 10000, 15000];

function getRandomNumber(amount) {
  var randomNumb = Math.floor(Math.random() * amount);
  return randomNumb;
}

function getRandomNumbFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getLocationX() {
  var map = document.querySelector('.map');
  var width = map.clientWidth;
  var locationX = getRandomNumber(width);
  return locationX;
}

function getLocationY() {
  var locationY = getRandomNumbFromInterval(130, 630);
  return locationY;
}

// ['', ''] | boolean
function getRandomItem(itemsArr, isDeleted) {
  var arrIndex = getRandomNumber(itemsArr.length); // 5
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880
  var randomValue = itemsArr[arrIndex]; // '5 string'
  if (isDeleted) {
    itemsArr.splice(arrIndex, 1);
  }
  return randomValue;
}

function getArrayValues(itemsArr, count) {
<<<<<<< HEAD
=======
  // создаем новый массив
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880
  var itemsArrCopy = itemsArr.slice();
  var newArr = [];
  for (var i = 0; i < count && itemsArrCopy.length; i++) {
    var randomValue = getRandomItem(itemsArrCopy, true);
    newArr.push(randomValue);
  }
  return newArr;
}

function getLocationX () {
  var map = document.querySelector('.map');
  var width = map.clientWidth;
  var locationX = Math.floor(Math.random() * width);
  return locationX;
};

// avatarNumber[Math.floor(Math.random() * 8)]
function getAvatarImgAddress(avatarNumber) {
  var str = (avatarNumber < 10) ? '0' : '';
  return 'img/avatars/user' + str + avatarNumber + '.png';
}

<<<<<<< HEAD
function getGeneratedAdvert() {
  var rand = getRandomItem(avatarNumbers, true);
  var locationX = getLocationX();
  var locationY = getRandomArbitrary(130, 630);
=======
function getAddress(locationX, locationY) {
  return locationX + ', ' + locationY;
}

function getGeneratedAdvert(amt) {
  var rand = avatarNumber[getRandomNumber(amt)];
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880
  return {
    author: {
      avatar: getAvatarImgAddress(rand)
    },

    offer: {
<<<<<<< HEAD
      title: 'Заголовок',
      address: locationX + ', ' + locationY,
      price: getRandomArbitrary(1000, 15000),
      type: getRandomItem(OFFER_TYPES),
      rooms: 2,
      guests:  4,
      checkin: getRandomItem(OFFER_CHECKINS),
      checkout: getRandomItem(OFFER_CHECKOUTS),
      features: getArrayValues(OFFER_FEATURES, getRandomArbitrary(1, 6)),
      description: 'Описание',
      photos: getArrayValues(OFFER_PHOTOS, getRandomArbitrary(1, 3))
=======
      title: '',
      address: getAddress(locationX, locationY),
      price: getRandomItem(prices),
      type: getRandomItem(OFFER_TYPES),
      rooms: getRandomNumbFromInterval(1,5),
      guests:  getRandomNumbFromInterval(1, 10),
      checkin: getRandomItem(OFFER_CHECKINS, getRandomNumber(3)),
      checkout: getRandomItem(OFFER_CHECKOUTS, getRandomNumber(3)),
      features: getArrayValues(OFFER_FEATURES, getRandomNumber(6)),
      description: '',
      photos: getArrayValues(OFFER_PHOTOS, getRandomNumber(3))
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880
    },

    location: {
      x: locationX,
<<<<<<< HEAD
      y: locationY
=======
      y: locationY,
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880
    }
  };
}

function generateOffers(count) {
<<<<<<< HEAD
  var offersArray = [];
  for (var i = 0; i < count; i++) {
    offersArray.push(getGeneratedAdvert());
  }
  return offersArray;
}

var offers = generateOffers(8);

console.log(offers);
=======
  var offers = [];
  for (var i = 0; i < count; i++) {
    offers.push(getGeneratedAdvert(count));
  }
  return offers;
}

var offers = generateOffers(8);
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880

console.log(offers);

var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('.map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

<<<<<<< HEAD
function renderPins (advert) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.fill = 'left: ' + advert.locationX + 'px; top: ' + advert.locationY + 'px;';
  pinElement.src = advert.author.avatar;
  pinElement.alt = advert.offer.title;
  return pinElement;
}

console.log(renderPins(offers[1]));

var mapPinsList = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  fragment.appendChild(renderPins(offers[i]));
}

var renderedPins = mapPinsList.appendChild(fragment);

=======
function renderPins (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.fill = 'left: ' + locationX + 'px; top: ' + locationY + 'px;';
  pinElement.setAttribute('src', 'author.avatar');
  pinElement.setAttribute('alt', 'offer.title');

  return pinElement;
}

var mapPinsList = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();
for (i = 0; i < offers.length; i++) {
  fragment.appendChild(renderPins(offers[i]));
}

mapPinsList.appendChild(fragment);
>>>>>>> 787713a939c73b05f1beccecf47c9e5a565d6880
