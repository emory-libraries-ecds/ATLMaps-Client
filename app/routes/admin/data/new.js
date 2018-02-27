import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const {
  Logger
} = Ember;

export default Route.extend({
  flashMessage: service(),
  model() {
    return this.store.createRecord('vector-layer');
  },

  actions: {
    save(layer) {
      const flash = get(this, 'flashMessage');
      layer.save().then(() => {
        get(layer, 'vector_feature').forEach((vf) => {
          vf.save().then(() => {
            flash.setProperties({
              message: 'Features Created',
              show: true,
              success: true
            });
            run.later(this, () => {
              flash.setProperties({ message: '', show: false });
            }, 3000);
          }, (error) => {
            Logger.debug('error', error);
            flash.setProperties({
              message: `ERROR ${error}`,
              show: true,
              success: false
            });
          });
        });
      }, (error) => {
        Logger.debug('error', error);
      });
    }
  }
});
