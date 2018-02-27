import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

/**
 * This is a router.
 */

const Router = EmberRouter.extend({
  location: config.locationType,
  metrics: service(),
  session: service(),
  currentUser: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();

    if (!this.get('currentUser.displayname')) {
        this.get('currentUser').load();
    }
  },

  _trackPage() {
    scheduleOnce('afterRender', this, function() {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({
        page,
        title
      });
    });
  }
});

Router.map(function() {
  this.route('flat-page', {
    path: '/'
  }, function() {
    this.route('index', {
      path: '/'
    });
    this.route('about');
    this.route('projects');
    this.route('404', {
      path: '/*wildcard'
    });
  });

  this.route('project', {
    path: '/project/:project_id'
  }, function() {});

  this.route('explore');
  this.route('layers', {
    path: '/layers/:maps'
  });
  this.route('error');
  this.route('confirm', {
    path: '/confirm/:confirm_token'
  });
  this.route('embed', {
    path: '/embed/:maps'
  });

  this.route('admin', function() {
    this.route('data', function() {
      this.route('new');
      this.route('edit', {
          path: 'edit/:layer_id'
      });
    });
  });
});

export default Router;
