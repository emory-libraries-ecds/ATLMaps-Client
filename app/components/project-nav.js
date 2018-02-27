import { filterBy } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { get } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  routes: null,

  init() {
    this._super(...arguments);
    this.set('routes', [
      EmberObject.create({
        route: 'project.info',
        label: 'Info',
        icon: 'info_outline',
        iconClass: null,
        show: true
      }),
      EmberObject.create({
        route: 'project.raster-layers',
        label: 'Maps',
        icon: 'layers',
        iconClass: null,
        show: get(this, 'model.hasRasters')
      }),
      // Vector layers uses a custom icon.
      EmberObject.create({
        route: 'project.vector-layers',
        label: 'Data',
        icon: null,
        iconClass: 'atlmaps-ext database',
        show: get(this, 'model.hasVectors')
      }),
      EmberObject.create({
        route: 'project.base-layers',
        label: 'Base',
        icon: 'map',
        iconClass: null,
        show: true
      })
    ]);
  },

  // classNames: ['project-nav'],
  // classNameBindings: ['hideNav'],
  // tagName: 'ul',
  hideNav: false,

  links: filterBy('routes', 'show', true),

  // TODO: This is bad. Make vector detail a proper component.
  click() {
    $('div.vector-info').hide();
    $('.active-marker').removeClass('active-marker');
  },

  actions: {
    toggleNav() {
      this.toggleProperty('hideNav');
    }
  }
});
