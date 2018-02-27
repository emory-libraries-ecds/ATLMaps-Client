import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  flashMessage: service(),

  model(params) {
    return this.store.findRecord('vector-layer', params.layer_id);
  }

  // setupController(controller, model, params) {
  //     // Call _super for default behavior
  //     this._super(controller, model, params);
  // }
});
