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

for (var a = 130; a < 631; i++) {
  var numberY = a;
  locationYNumber.push(numberY);
}


function getGeneratedAdverts(authors, offers, locations) {
  return {
    author: {
      avatar: 'img/avatars/user0' + avatarNumber[Math.floor(Math.random() * 8)] + '.png'
    },

    offer: {
      title: offers.title,
      address:
      price: offers.price,
      type: offers.type[Math.floor(Math.random() * 4)],
      rooms: offers.rooms,
      guests: offers.guests,
      checkin: offers.checkin[Math.floor(Math.random() * 3)],
      checkout: offers.checkout[Math.floor(Math.random() * 3)],
      features: offers.feautres[Math.floor(Math.random() * 6)],
      description: offers.description,
      photos: offers.photos[Math.floor(Math.random() * 3)]
    },

    location: {
      x: locations.x,
      y: locations.y[Math.floor(Math.random() * 500)],
    }
  };
}

var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('.map--faded');

var similarWizardTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
