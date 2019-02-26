import Service from '@ember/service';
import { get, set } from '@ember/object';
import { A } from '@ember/array';

export default Service.extend({
  searchParams: {},
  mapLayers: A([]),
  dataLayers: A([]),
  currentBounds: null,

  init() {
    this._super(...arguments);
    this.setProperties({
      searchText: '',
      tags: [],
      institutions: [],
      start_year: '',
      end_year: '',
      bounds: {},
      searchLimit: '25'
    });
  },

  setSearchText(searchText) {
    this.setProperties({ searchText });
  },

  addTag(tag) {
    get(this, 'tags').pushObject(tag.get('name'));
  },

  removeTag(tag) {
    get(this, 'tags').removeObject(tag.get('name'));
  },

  addInstitution(institution) {
    const institutions = get(this, 'institutions');
    if (!institutions.includes(get(institution, 'name'))) {
      institutions.pushObject(institution.get('name'));
    }
  },

  removeInstution(institution) {
    get(this, 'institutions').removeObject(institution);
  },

  addAllTags(allTags) {
    get(this, 'tags').pushObjects(allTags.getEach('name'));
  },

  removeAllTags(allTags) {
    get(this, 'tags').removeObjects(allTags.getEach('name'));
  },

  setYearSearch(min_year, max_year) {
    this.setProperties({ start_year: min_year, end_year: max_year });
  },

  setCurrentBounds(bounds) {
    set(this, 'currentBounds', bounds);
  },

  setBoundsToSearch() {
    const currentBounds = get(this, 'currentBounds');
    this.setProperties({
      bounds: {
        s: currentBounds.getSouth(),
        n: currentBounds.getNorth(),
        e: currentBounds.getEast(),
        w: currentBounds.getWest()
      }
    });
  }
});
