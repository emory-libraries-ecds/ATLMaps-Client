import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('project');
  },

  actions: {
    willTransition() {
      this._super(...arguments);
      this.store.unloadAll('project');
    }
  }
});
