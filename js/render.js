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

  function makeOfferCard() {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var mapElement = document.querySelector('.map__pins');
    mapElement.appendChild(cardElement);

    window.mapFilter.addEventListener('change', function () {
      cardElement.remove();
    });
  }

})();
