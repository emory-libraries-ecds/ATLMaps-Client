import Service from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default class BaseMapsService extends Service {
  grayscale = {
    label: 'grayscale',
    displayLabel: 'Light Gray',
    layers: A([
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
    ]),
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    thumbnail: '/assets/images/carto.png',
    leafletObjects: A([])
  };

  satellite = {
    label: 'satellite',
    displayLabel: 'Satellite',
    layers: A([
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    ]),
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    thumbnail: '/assets/images/satellite.png',
    leafletObjects: A([])
  };

  street = {
    label: 'street',
    displayLabel: 'Street',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    thumbnail: '/assets/images/street_map.png',
    layers: A([
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
    ]),
    leafletObjects: A([])
  };

  city1928 = {
    label: 'city1928',
    displayLabel: '1928 Atlas',
    layers: A([
      'https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png',
      'https://s3.amazonaws.com/tilemaps/ATL28_200tiles/{z}/{x}/{y}.png'
    ]),
    attribution: 'Emory University',
    thumbnail: '/assets/images/1928.png',
    leafletObjects: A([])
  };

  @computed
  get baseMaps() {
    return A([this.street, this.satellite, this.grayscale, this.city1928]);
  }
}
