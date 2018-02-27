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
    toggleLayer(layer, project) {
      const vectorLayer = get(layer, 'vector_layer');
      vectorLayer.toggleProperty('showing');
      get(vectorLayer, 'vector_feature').forEach((feature) => {
        if (get(vectorLayer, 'showing') === false) {
          get(feature, 'leafletObject').remove();
        } else {
          get(feature, 'leafletObject').addTo(get(project, 'leafletObject'));
        }
      });
      get(project, 'allVectorsHidden');
    },

    toggleAll(model) {
      if(get(model, 'project.allVectorsHidden') === false) {
        get(this, 'store').peekAll('vector_feature').forEach((vf)=> {
          get(vf, 'leafletObject').remove();
        });
        get(this, 'store').peekAll('vector_layer').setEach('showing', false);
      } else {
        get(this, 'store').peekAll('vector_feature').forEach((vf)=> {
          get(vf, 'leafletObject').addTo(get(model, 'project.leafletObject'));
        });
        get(this, 'store').peekAll('vector_layer').setEach('showing', true);
      }
    }
  }
});
