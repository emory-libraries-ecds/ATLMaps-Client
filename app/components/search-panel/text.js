/**
 * Component to manage current text search.
 */
import Component from '@ember/component';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  layerSearch: service(),
  classNames: ['search-box'],
  tagNames: 'form',

  // Had to add the search event as a custom event in `config/environment.js`.
  actions: {
    search() {
      get(this, 'layerSearch').setSearchText(get(this, 'searchTerms'));
      this.sendAction('getResults');
    }
  }
});
