/*
 * Component to determine if the user menu is shown and what is shown in it.
 */
import Component from '@ember/component';

import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  // The `register-click` class excludes the menu from the listener
  // that hides the menu when any other element is clicked.
  classNames: ['user-menu', 'z-depth-2', 'register-click'],
  classNameBindings: ['userMenuShow'],
  currentUser: service(),
  session: service(),

  didRender() {
    this.get('currentUser').load();
  },

  didUpdateAttrs() {
    // if (get(this, 'currentUser.confirmed')) {
    //     set(this, 'userMenuShow', get(this, 'showUserMenu'));
    // }
    set(this, 'userMenuShow', get(this, 'showUserMenu'));
  },

  actions: {
    updateDisplayName() {
      get(this, 'currentUser').update();
    },

    cancelUpdate() {
      //
    }
  }
});
