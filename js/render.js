'use strict';
(function () {
  function getPin(offer) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;
    return pinElement;
  }

  window.renderPins = function (offersArray) {
    var mapPinsList = document.querySelector('.map__pins');
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
    mapPinsList.innerHTML = '';
    mapPinsList.appendChild(window.mapMainPin);
    mapPinsList.appendChild(fragment);
  };
})();
