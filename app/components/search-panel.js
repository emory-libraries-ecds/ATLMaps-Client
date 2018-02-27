import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  layerSearch: service(),
  store: service(),
  tagName: '',
  showPanel: false,

  actions: {
    getResults(page, type) {
      const data = get(this, 'model');
      const currentRasters = get(data, 'rasters.meta.total_count');
      const currentVectors = get(data, 'vectors.meta.total_count');
      const searchParams = {
        search: true,
        tags: this.get('layerSearch.tags'),
        text_search: this.get('layerSearch.searchText'),
        institution: this.get('layerSearch.institutions'),
        // start_year: this.get('layerSearch.start_year'),
        // end_year: this.get('layerSearch.end_year'),
        bounds: this.get('layerSearch.bounds'),
        // meta: this.get('controller.rasters.meta'),
        page: page || 0,
        limit: get(this, 'layerSearch.searchLimit')
      };

      if (type === 'rasters' || !type) {
        set(this, 'searchingRasters', true);
        get(this, 'store').query('raster-layer', searchParams).then((rasters) => {
          set(data, 'rasters', rasters);
          if (currentRasters !== rasters.meta.total_count) {
            // this.updatedResults('rasters');
          }
          set(this, 'searchingRasters', false);
        });
      }

      if (type === 'vectors' || !type) {
        set(this, 'searchingVectors', true);
        get(this, 'store').query('vector-layer', searchParams).then((vectors) => {
          set(data, 'vectors', vectors);
          if (currentVectors !== vectors.meta.total_count) {
            // this.updatedResults('vectors');
          }
          set(this, 'searchingVectors', false);
        });
      }

      // This scrolls the results to the top while clicking through the pages.
      // TODO: Will need to fix this for fastboot.
      if (type) {
        document.getElementById(type).scrollIntoView();
      }
    }
  }
});
