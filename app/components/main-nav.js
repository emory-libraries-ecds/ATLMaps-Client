import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import UIkit from 'uikit';

export default Component.extend({
  session: service(),
  currentUser: service(),
  tagName: 'header',
  classNames: ['navigation'],

  didInsertElement() {
    let modal = UIkit.modal(document.getElementById('login-modal'));
    set(this, 'modal', modal);
  },

  willDestroyElement() {
    if (isEmpty(get(this, 'modal'))) {
      return;
    }
    get(this, 'modal').$destroy();
  },

  actions: {
    invalidateSession() {
      get(this, 'session').invalidate();
    },

    updateDisplayName() {
      get(this, 'currentUser').update();
    },

    showLoginModal() {
      get(this, 'modal').show();
    },

    cancelUpdate() {
      //
    }
  }
});
