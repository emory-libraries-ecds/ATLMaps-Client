import Route from '@ember/routing/route';
import { get } from '@ember/object';
import Ember from 'ember';

const { Logger } = Ember;

export default Route.extend({
  model() {
    return this.store.createRecord('vector-layer');
  },

  actions: {
    save(layer) {
      layer.save().then(() => {
        get(layer, 'vector_feature').forEach(
          vf => {
            vf.save().then(() => {});
          },
          error => {
            Logger.debug('error', error);
          }
        );
      });
    }
  }
});
