import Service from '@ember/service';
import { set } from '@ember/object';
import { A } from '@ember/array';
/* global L */

export default Service.extend({
  init() {
    this._super(...arguments);
    set(this, 'layers', A([
      {
        name: 'street',
        layer: L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
          attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      },
      {
        name: 'satellite',
        layer: L.layerGroup([
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            className: 'satellite base',
            thumbnail: '/assets/images/satellite.png',
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }),
          L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png', {
            className: 'labels base',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd'
          })
        ])
      },
      {
        name: 'greyscale',
        layer: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
          className: 'greyscale base',
          thumbnail: '/assets/images/carto.png',
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          subdomains: 'abcd'
        })
      }
    ]));
  }

});
