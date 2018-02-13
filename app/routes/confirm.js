import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    currentUser: service(),
    session: service(),

    model(params) {
        return this.store.query('confirmation-token', { confirm_token: params.confirm_token });
    },

    afterModel() {
        this.transitionTo('/');
    }
});
