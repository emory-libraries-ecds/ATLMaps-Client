import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  layerSearch: service(),
  classNames: ['search-bounds'],

  actions: {
    searchBounds() {
      this.toggleProperty('hasBounds');
      get(this, 'layerSearch').setBoundsToSearch();
      this.sendAction('getResults');
    }
  }
});
