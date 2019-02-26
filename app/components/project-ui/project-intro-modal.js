import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import UIkit from 'uikit';

export default Component.extend({
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
      const cookieName = `noIntro${model.id}`;

      if (get(this, 'hasSuppressCookie') === false) {
        cookieService.clear(cookieName);
      } else {
        cookieService.write(
          cookieName,
          `Surppress-intro-for-project-${model.id}-on-ATLMaps.`
        );
      }
    }
  }
});
