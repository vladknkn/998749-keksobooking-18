'use strict';
(function () {
  window.mapPinsList = document.querySelector('.map__pins');

  function getPin(offer) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.dataset.id = offer.id;

    pinElement.addEventListener('click', function (evt) {
      var pinId = evt.currentTarget.dataset.id;
      makeOfferCard(pinId);
    });

    var pinImage = pinElement.querySelector('img');
    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;
    return pinElement;
  }

  window.renderPins = function (offersArray) {

    var fragment = document.createDocumentFragment();
    if (window.housingType.value === 'any') {
      for (var i = 0; i < 5; i++) {
        fragment.appendChild(getPin(offersArray[i]));
      }
    } else {
      for (i = 0; i < offersArray.length; i++) {
        fragment.appendChild(getPin(offersArray[i]));
      }
    }
    window.mapPinsList.innerHTML = '';
    window.mapPinsList.appendChild(window.mapMainPin);
    window.mapPinsList.appendChild(fragment);
  };

  // Создание карточек

  function clearAllCards() {
    document.querySelectorAll('.map__card--copy').forEach(function (el) {
      el.remove();
    });
  }

  function makeOfferCard(pinId) {
    clearAllCards();

    var advert = window.offers[pinId];
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.classList.add('map__card--copy');

    var cardAvatar = cardElement.querySelector('img');
    cardAvatar.src = advert.author.avatar;

    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.innerText = advert.offer.title;

    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.innerText = advert.offer.address;

    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.innerText = advert.offer.price;

    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.innerText = advert.offer.description;

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.innerText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    if (advert.offer.rooms !== 1) {
      if (advert.offer.guests !== 1) {
        cardCapacity.innerText = advert.offer.rooms + ' комнат для ' + advert.offer.guests + ' гостей';
      } else {
        cardCapacity.innerText = advert.offer.rooms + ' комнат для ' + advert.offer.guests + ' гостя';
      }
    } else {
      if (advert.offer.guests !== 1) {
        cardCapacity.innerText = advert.offer.rooms + ' комната для ' + advert.offer.guests + ' гостей';
      } else {
        cardCapacity.innerText = advert.offer.rooms + ' комната для ' + advert.offer.guests + ' гостя';
      }
    }

    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardFeaturesElements = cardFeatures.querySelectorAll('.popup__feature');
    for (var i = 0; i < cardFeaturesElements.length; i++) {
      if (!advert.offer.features.includes('wifi') && cardFeaturesElements[i].classList.contains('popup__feature--wifi')) {
        cardFeaturesElements[i].remove();
      } else if (!advert.offer.features.includes('dishwasher') && cardFeaturesElements[i].classList.contains('popup__feature--dishwasher')) {
        cardFeaturesElements[i].remove();
      } else if (!advert.offer.features.includes('parking') && cardFeaturesElements[i].classList.contains('popup__feature--parking')) {
        cardFeaturesElements[i].remove();
      } else if (!advert.offer.features.includes('washer') && cardFeaturesElements[i].classList.contains('popup__feature--washer')) {
        cardFeaturesElements[i].remove();
      } else if (!advert.offer.features.includes('elevator') && cardFeaturesElements[i].classList.contains('popup__feature--elevator')) {
        cardFeaturesElements[i].remove();
      } else if (!advert.offer.features.includes('conditioner') && cardFeaturesElements[i].classList.contains('popup__feature--conditioner')) {
        cardFeaturesElements[i].remove();
      }
    }

    var cardType = cardElement.querySelector('.popup__type');
    var offerType = advert.offer.type;
    switch (offerType) {
      case 'bungalo':
        cardType.innerText = 'Бунгало';
        break;
      case 'flat':
        cardType.innerText = 'Квартира';
        break;
      case 'house':
        cardType.innerText = 'Дом';
        break;
      case 'palace':
        cardType.innerText = 'Дворец';
        break;
    }

    var cardPhotos = cardElement.querySelector('.popup__photos');
    var photo = cardPhotos.querySelector('.popup__photo');
    var offerPhotosArray = advert.offer.photos;
    var photoTemplate = photo.cloneNode(true);
    photo.remove();

    for (var j = 0; j < offerPhotosArray.length; j++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = offerPhotosArray[j];
      cardPhotos.appendChild(photoElement);
    }

    var mapElement = document.querySelector('.map__pins');
    mapElement.appendChild(cardElement);

    window.mapFilter.addEventListener('change', function () {
      cardElement.remove();
    });
  }

})();
