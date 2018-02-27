/**
 * @public
 * Route to display layers outside of a project.
 * NOTE: Hopefully we can get rid of these try/catch handlers when we move to
 * JSONAPI. Somthing changed and Ember Data is not liking empty responses when
 * quering the store.
 */
import $ from 'jquery';

import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { run } from '@ember/runloop';
import MapLayerMixin from '../mixins/map-layer';

export default Route.extend({
  setupController(controller, model, params) {
    this._super(controller, model, params);
    run.scheduleOnce('afterRender', () => {
      const raster = get(model.rasters, 'firstObject');
      const vector = get(model.vectors, 'firstObject');
      if (raster) {
        this.controllerFor('layers').set('raster', raster);
      }
      if (vector) {
        this.controllerFor('layers').set('vector', vector);
      }
    });
  },

  actions: {
    setOpacity() {
      const value = $(`#${get(this, 'controller.raster.name')}`).val();
      get(this, 'controller.raster.leaflet_object').setOpacity(value / 100);
    }
  }
});
