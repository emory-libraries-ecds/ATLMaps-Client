import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
/**
 * Ember application route.
 *
 */

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  flashMessage: service(),

  sessionAuthenticated() {
    this._super(...arguments);
    set(this.controller, 'showingLogin', false);
  },

  actions: {
    error(error /* , transition */) {
      const flash = get(this, 'flashMessage');
      flash.setProperties({ message: error.message });
      this.transitionTo('error');
    },

    toggleShowingLogin() {
      this.controller.toggleProperty('showingLogin');
    }
  }
});
