import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  store: service(),
  dataColors: service(),

  actions: {
    addRemoveLayer(layer) {
      const project = get(this, 'project');
      if (get(layer, 'activeInProject') === false) {
        if(get(layer, 'data_format') === 'raster') {
          let newLayer = get(this, 'store').createRecord('raster_layer_project', {
            project,
            raster_layer: layer,
            position: get(project, 'raster_layers.length') + 11
          });
          if (get(project, 'may_edit') === true) {
            newLayer.save().then(() => {
              UIkit.notification(`${get(layer, 'title')} added to ${get(project, 'name')}`, 'success');
            });
          }
        } else {
          let color = null;
          if (get(layer, 'data_type') === 'Point') {
            const markerColors = this.get('dataColors.markerColors');
            color = Math.floor(Math.random() * markerColors.length);
          } else {
            const shapeColors = this.get('dataColors.markerColors');
            color = Math.floor(Math.random() * shapeColors.length);
          }

          let newLayer = get(this, 'store').createRecord('vector_layer_project', {
            project,
            vector_layer: layer,
            marker: color
          });

          if (get(project, 'may_edit') === true) {
            newLayer.save().then(() => {
              UIkit.notification(`${get(layer, 'title')} added to ${get(project, 'name')}`, 'success');
            });
          }

        }
      } else {
        if(get(layer, 'data_format') === 'raster') {
          get(this, 'store').queryRecord('raster_layer_project', {
            project_id: project.id, raster_layer_id: layer.id
          }).then((layerToDelete) => {
            if (get(project, 'may_edit') === true) {
              layerToDelete.deleteRecord();
            } else {
              layerToDelete.destroy();
            }
          });
        } else {
          get(this, 'store').queryRecord('vector_layer_project', {
            project_id: project.id, vector_layer_id: layer.id
          }).then((layerToDelete) => {
            if (get(project, 'may_edit') === true) {
              layerToDelete.deleteRecord();
            } else {
              layerToDelete.destroy();
            }
          });
        }
      }
    }
  }
});
