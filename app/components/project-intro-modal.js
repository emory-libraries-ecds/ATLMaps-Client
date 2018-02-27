import $ from 'jquery';
import { on } from '@ember/object/evented';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { set, get } from '@ember/object';
import UIkit from 'uikit';

export default Component.extend({
  // activateKeyboard: on('init', () => {
  //     set(this, 'keyboardActivated', true);
  // }),

  cookies: service(),
  tagName: '',
  hasSuppressCookie: false,

  didInsertElement() {
    let modal = UIkit.modal(document.getElementById('project-intro-modal'));
    set(this, 'modal', modal);
    let suppress = get(this, 'cookies').read(`noIntro${get(this, 'model.id')}`);
    if (suppress === undefined) {
      modal.show();
    } else {
      set(this, 'hasSuppressCookie', true);
    }
  },

  willDestroyElement() {
    get(this, 'modal').$destroy();
  },

  actions: {

    showModal() {
      get(this, 'modal').show();
    },

    suppressIntro() {
      const model = get(this, 'model');
      const cookieService = get(this, 'cookies');
      console.log(get(this, 'hasSuppressCookie'))
      const cookieName = `noIntro${model.id}`;

      if (get(this, 'hasSuppressCookie') === false) {
        cookieService.clear(cookieName);
      } else {
        console.log(cookieName)
        cookieService.write(cookieName, `Surppress-intro-for-project-${model.id}-on-ATLMaps.`);
      }
    }
  }
});
