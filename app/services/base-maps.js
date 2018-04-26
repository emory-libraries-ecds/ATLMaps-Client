import Service from '@ember/service';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';

export default Service.extend({
  greyscale: computed('', function() {
    return {
      label: 'greyscale',
      url:
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      thumbnail: '/assets/images/carto.png'
    };
  }),

  satellite: computed('', function() {
    return {
      label: 'satellite',
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      thumbnail: '/assets/images/satellite.png'
    };
  }),

  street: computed('', function() {
    return {
      label: 'street',
      url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      attribution:
        '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      thumbnail: '/assets/images/street_map.png'
    };
  }),

  baseMaps: computed('', function() {
    return A([
      get(this, 'greyscale'),
      get(this, 'satellite'),
      get(this, 'street')
    ]);
  }),

  init() {
    this._super(...arguments);
  }
});
