/**
 * @public
 * Route to display layers outside of a project.
 */

import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  model(queryParams) {
    return hash({
      rasters:
        get(this, 'store').query('raster-layer', {
          names: queryParams.maps
        }) || [],
      vectors:
        get(this, 'store').query('vector-layer', {
          names: queryParams.maps
        }) || []
    });
  }
});
