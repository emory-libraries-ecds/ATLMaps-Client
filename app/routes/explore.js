import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    didTransition() {
      this._super(...arguments);
      this.transitionTo('project', 'explore');
    }

  }
});
