/**
 * @private
 * TODO: Do we need a component for this or can this be handled by the `layerSearch`
 * service? Honestly, this is smelly.
 * Component to maintain state for a search by institution.
 */
import Component from '@ember/component';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({

  layerSearch: service(),

  classNames: ['browse-by-institution'],

  actions: {
    /**
     * Adds or remove institution from filter.
     */
    checkInstitution(institution) {
      if (institution) {
        get(this, 'layerSearch').addInstitution(institution);
        this.sendAction('getResults');
      }
    },

    removeInstitution(institution) {
      this.get('layerSearch').removeInstution(institution);
      this.sendAction('getResults');
    }
  }
});
