(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['wellknown'],
      __esModule: true,
    };
  }

  define('wellknown', [], vendorModule);
})();
