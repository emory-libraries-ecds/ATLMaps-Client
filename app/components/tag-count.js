import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    currentUser: service(),

    session: service(),

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
        }
    }
});
