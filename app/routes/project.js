import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import { on } from '@ember/object/evented';
import UIkit from 'uikit';

export default Route.extend({
  dataColors: service(),
  layerSearch: service(),
  session: service(),
  cookies: service(),
  currentUser: service(),

  model(params) {
    let project = null;

    if (params.project_id === 'explore') {
      project = this.store.createRecord('project', {
        showingSearch: true,
        name: 'Explore',
        description:
          'Here you can explore almost 3,000 maps of Atlanta from collections held by Emory University and Georgia State University. Go ahead and click the search glass to the left and say good bye to next few hours.',
        exploring: true,
        may_edit: true
      });
    } else if (params.project_id === 'new') {
      project = this.store.createRecord('project', {
        showingSearch: true,
        name: `New: ${new Date()}`,
        description:
          'ATLMaps is very much a work in progress. We will be updating the insturctions soon. For now, play with the filters to the right, add some layers, and have fun.',
        is_mine: true,
        may_edit: true
      });
    } else {
      project = this.store.findRecord('project', params.project_id);
    }
    return RSVP.hash({
      project,
      categories: this.store.findAll('category'),
      institutions: this.store.findAll('institution')
    });
  },

  afterModel(model) {
    this.get('meta').update({
      title: `${get(model.project, 'name')}: ATLMaps`,
      description: get(model.project, 'description')
      // 'og:image': 'https://exemple.net/latest-news.png',
      // 'twitter:author': '@j15e'
    });
    get(this, 'currentUser').load();
  },

  // Function the runs after we fully exit a project route and clears the map,
  // clears the serarch parameteres and items checked. Fired by the `deactivate` hook.
  teardown: on('deactivate', function() {
    let { project } = this.currentModel;
    project.rollbackAttributes();
    get(this, 'layerSearch').init();
    // // Clear the chekes for the checked categories and tags.
    this.store.peekAll('tag').setEach('checked', false);
    let categories = this.store.peekAll('category');
    categories.forEach(category => {
      category.setProperties({
        checked: false,
        clicked: false
      });
      // category.get('tag_ids').setEach('checked', false);
    });
    // Clear the vector layers that are marked active in this project.
    let vectors = this.store.peekAll('vector-layer');
    vectors.forEach(vector => {
      vector.setProperties({
        activeInProject: false
      });
    });
    // Clear the raster layers that are marked active in this project.
    let rasters = this.store.peekAll('raster-layer');
    rasters.forEach(raster => {
      raster.setProperties({
        activeInProject: false
      });
    });

    set(this.controller, 'rasters', null);
    set(this.controller, 'vectors', null);
    // Clear checked institution
    let institutions = this.store.peekAll('institution');
    institutions.setEach('checked', false);

    // // Clear the map.
    // get(this, 'mapObject.map').remove();
    // set(this, 'mapObject.map', '');
    // Uload the store. It would be nice to just unload all at once, but we
    // need to keep the user in the store.
    // NOTE: This creates an awful memroy leak with dev tools open.
    this.store.unloadAll('raster-layer');
    this.store.unloadAll('raster-layer-project');
    this.store.unloadAll('vector-layer');
    this.store.unloadAll('vector-layer-project');
    this.store.unloadAll('vector-feature');
    this.store.unloadAll('project');
    project = null;
    categories = null;
    vectors = null;
    rasters = null;
    institutions = null;
  }),

  // updatedResults(type) {
  //   set(this.controller, `${type}_diffResults`, true);
  //   run.later(
  //     this,
  //     () => {
  //       set(this.controller, `${type}_diffResults`, false);
  //     },
  //     300
  //   );
  // },

  actions: {
    toggleIntro() {
      this.modelFor('project').project.toggleProperty('suppressIntro');
    },

    saveProject(project) {
      project.save().then(
        savedProject => {
          savedProject.get('raster_layer_project').invoke('save');
          savedProject.get('vector_layer_project').invoke('save');
          UIkit.notification('Project saved', 'success');
        },
        error => {
          UIkit.notification(
            `ERROR UPDATING PROJECT: ${error.message}`,
            'danger'
          );
        }
      );
    },

    updateProject(project) {
      project.save().then(
        () => {
          UIkit.notification('Project Saved', 'success');
        },
        error => {
          UIkit.notification(
            `Error saving project<br /><code>${error.message}</code>`,
            'danger'
          );
        }
      );
    },

    cancleUpdate(project) {
      project.rollbackAttributes();
      set(project, 'suppressIntro', true);
    },

    removeLayer(layer) {
      layer.destroyRecord().then(
        () => {
          UIkit.notification('Layer Removed', 'success');
        },
        error => {
          UIkit.notification(
            `Error removing layer <br /><code>${error.message}</code>`,
            'danger'
          );
        }
      );
    }
  }
});
