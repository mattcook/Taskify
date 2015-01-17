(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    var flash = document.createElement('div');
    flash.classList.add('flash');

    var flashyFlashy = function (timeout) {
      if (typeof timeout === 'undefined' || timeout === null) {
        timeout = 5000;
      };
      timeout += randInt(-3000,3000);
      if (timeout < 500) timeout = 500;

      document.body.appendChild(flash);
      setTimeout(function() { flash.remove() }, 50);
      setTimeout(flashyFlashy, timeout, timeout);
    };

    setTimeout(flashyFlashy, 5000);

    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

  });
})();
