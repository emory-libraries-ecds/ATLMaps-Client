import Component from '@ember/component';
import { set } from '@ember/object';
/* global Draggabilly */

export default Component.extend({
  classNames: ['feature-popup', 'uk-box-shadow-large'],

  didInsertElement() {
    new Draggabilly( this.element, {
      // options...
    });
  },

  actions: {
    closeFeature() {
      set(this, 'feature', null);
    }
  }
});
