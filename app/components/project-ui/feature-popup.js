import Component from '@ember/component';
import { set } from '@ember/object';
/* global Draggabilly */

export default Component.extend({
  classNames: ['feature-popup'],
  classNameBindings: ['feature:has-feature'],

  didInsertElement() {
    new Draggabilly(this.element, {
      // options...
    });
  },

  actions: {
    closeFeature() {
      set(this, 'feature', null);
    }
  }
});
