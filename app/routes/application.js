import Route from '@ember/routing/route';
import UIkit from 'uikit';
/**
 * Ember application route.
 *
 */

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  sessionAuthenticated() {
    this._super(...arguments);
  },

  actions: {
    error(error /* , transition */) {
      // const flash = get(this, 'flashMessage');
      // flash.setProperties({ message: error.message });
      UIkit.notification({ message: error.message, status: 'danger' });
      this.transitionTo('error');
    }
  }
});
