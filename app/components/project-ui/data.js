import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  tagName: '',
  store: service(),

  didInsertElement() {
    UIkit.accordion(document.getElementById('data-layers'));
  },

  actions: {
    toggleLayer(layer) {
      const vectorLayer = get(layer, 'vector_layer');
      vectorLayer.toggleProperty('showing');
      get(vectorLayer, 'vector_feature').forEach(feature => {
        feature.toggleProperty('show');
      });
      // get(project, 'allVectorsHidden');
    },

    toggleAll(model) {
      if (get(model, 'project.allVectorsHidden') === false) {
        get(this, 'store')
          .peekAll('vector_feature')
          .forEach(vf => {
            vf.setProperties({ show: false });
          });
        get(this, 'store')
          .peekAll('vector_layer')
          .forEach(vl => {
            vl.setProperties({ showing: false });
          });
      } else {
        get(this, 'store')
          .peekAll('vector_feature')
          .forEach(vf => {
            vf.setProperties({ show: true });
          });
        get(this, 'store')
          .peekAll('vector_layer')
          .forEach(vl => {
            vl.setProperties({ showing: true });
          });
      }
    }
  }
});
