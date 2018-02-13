import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    session: service(),

    showingLogin: false,

    // TODO: I don't like this. Not one bit.
    // This is here to hide the main navbar while looliking at a project.
    // We should rethink this whole thing.
    // computed property - whether this current route is a project.* page
    isProjectDetail: computed('currentRouteName', function isIt() {
        if (get(this, 'currentRouteName').includes('project.') || get(this, 'currentRouteName').includes('layers')) {
            return true;
        }
        return false;
    })
});
