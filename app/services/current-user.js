import { get } from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  session: service('session'),
  store: service(),

  init() {
    this._super(...arguments);
  },

  load() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store')
        .queryRecord('user', { me: true })
        .then(user => {
          this.set('user', user);
        });
    }
    return false;
  },

  reLoad() {
    this.get('store')
      .queryRecord('user', { me: true })
      .then(user => {
        get(this, 'store').unloadRecord(user);
        this.load();
      });
  },

  update() {
    const user = get(this, 'store').peekRecord('user', get(this, 'user.id'));
    user.save();
  }
});
