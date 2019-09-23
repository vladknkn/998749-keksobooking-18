'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
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

for(var i = 1; i < 9; i++) {
  var number = i;
  avatarNumber.push(number);
}

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
  var randomValue = itemsArr[arrIndex]; // '5 string'
  if (isDeleted) {
    itemsArr.splice(arrIndex, 1);
  }
  return randomValue;
}

function getArrayValues(itemsArr, count) {
  // создаем новый массив
  var itemsArrCopy = itemsArr.slice();
  var newArr = [];
  for (var i = 0; i < count && itemsArrCopy.length; i++) {
    var randomValue = getRandomItem(itemsArrCopy, true);
    newArr.push(randomValue);
  }
  return newArr;
}

// avatarNumber[Math.floor(Math.random() * 8)]
function getAvatarImgAddress(avatarNumber) {
  var str = (avatarNumber < 10) ? '0' : '';
  return 'img/avatars/user' + str + avatarNumber + '.png';
}

function getAddress(locationX, locationY) {
  return locationX + ', ' + locationY;
}

function getGeneratedAdvert(amt) {
  var rand = avatarNumber[getRandomNumber(amt)];
  return {
    author: {
      avatar: getAvatarImgAddress(rand)
    },

    offer: {
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
    },

    location: {
      x: locationX,
      y: locationY,
    }
  };
}

/**
 * func name
 * @param {number} count - The title of the book.
 * @return {Array}  -  dsgsdgsdgsdg
 */
function generateOffers(count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    offers.push(getGeneratedAdvert(count));
  }
  return offers;
}

var offers = generateOffers(8);

console.log(offers);

var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('.map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
