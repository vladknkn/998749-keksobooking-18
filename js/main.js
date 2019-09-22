'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var avatarNumber = [];
var locationYNumber = [];

for(var i = 1; i < 9; i++) {
  var number = i;
  avatarNumber.push(number);
}

for (var a = 130; a < 631; a++) {
  var numberY = a;
  locationYNumber.push(numberY);
}

var prices = [1000, 5000, 10000, 15000];

// ['', ''] | boolean
function getRandomItem(itemsArr, isDelited) {
  var arrIndex = Math.floor(Math.random() * itemsArr.length); // 5
  var randomValue = itemsArr[arrIndex]; // '5 string'
  if (isDelited) {
    itemsArr.splice(arrIndex, 1);
  }
  return randomValue;
}

function getArrayValues(itemsArr, count) {
  // создаем новвый массив
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

function getGeneratedAdvert() {
  var rand = avatarNumber[Math.floor(Math.random() * 8)];
  return {
    author: {
      avatar: getAvatarImgAddress(rand)
    },

    offer: {
      title: '',
      address: '',
      price: getRandomItem(prices),
      type: getRandomItem(OFFER_TYPES),
      rooms: 1,
      guests:  2,
      checkin: getRandomItem(OFFER_CHECKINS),
      checkout: getRandomItem(OFFER_CHECKOUTS),
      features: getArrayValues(OFFER_FEATURES, 3),
      description: '',
      photos: ['']
    },

    location: {
      x: 10,
      y: 20,
    }
  };
}

/**
 * func name
 * @param {number} count - The title of the book.
 * @return {Array}  -  dsgsdgsdgsdg
 */
function generateOffers(count) {
  var tempAppr = [];
  for (var i = 0; i < count; i++) {
    tempAppr.push(getGeneratedAdvert());
  }
  return tempAppr;
}

console.log(generateOffers(3))


var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('.map--faded');

var similarWizardTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
