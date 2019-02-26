/**
 * Route to display list of projects
 */
import { get } from '@ember/object';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  currentUser: service(),

  _loadCurrentUser() {
    return this.get('currentUser').load();
  },

  beforeModel(params) {
    if (params.project_id) {
      this.transitionTo('/project', params.project_id);
    }
    return this._loadCurrentUser();
  },

  model() {
    /**
     * The API will only return featured projects when asked for all.
     * We'll make seperate calls for a user's projects if a user is authenticated.
     */

    return RSVP.hash({
      mine: get(this, 'session.isAuthenticated')
        ? this.store.query('project', { user_id: true })
        : undefined,
      featured: this.store.findAll('project')
    });
  },

  actions: {
    didTransition() {
      document.querySelector('head').setAttribute('title', 'ATLMaps: Projects');
    },

    willTransition() {
      this.store.unloadAll('project');
    },

    createProject() {
      this.transitionTo('project.info', 'new');
    },

    deleteProject(project_id) {
      const response = confirm('Are you sure you want to DELETE this project?');

      if (response === true) {
        this.store.peekRecord('project', project_id).destroyRecord();
      }
    }
  }
});
