import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    flashMessage: service(),

    setupController(controller, model, params) {
        // Call _super for default behavior
        this._super(controller, model, params);
        this.controllerFor('error').set('flashMessage', get(this, 'flashMessage'));
    }
});
