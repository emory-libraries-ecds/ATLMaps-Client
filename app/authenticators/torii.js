/* eslint arrow-body-style: ["error", "as-needed"] */
import { get } from '@ember/object';

import { inject as service } from '@ember/service';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from '../config/environment';

export default Torii.extend({
  torii: service(),
  ajax: service(),
  session: service(),
  currentUser: service(),

  authenticate() {
    const ajax = this.get('ajax');

    return this._super(...arguments).then((data) => {
      const grantType = data.provider === 'password' ? 'password' : `${data.provider}_auth_code`;
      return ajax.request(`${ENV.APP.API_HOST}/token`, {
        type: 'POST',
        dataType: 'json',
        data: {
          grant_type: grantType,
          auth_code: data.authorizationCode
        }
      }).then((response) => {
        const authData = {
          access_token: response.access_token,
          provider: data.provider
        };
        get(this, 'currentUser').load();
        return authData;
      });
    });
  },

  logOut() {
    const ajax = get(this, 'ajax');

    return this._super(...arguments.then(function dip() {
      return ajax.request(`${ENV.APP.API_HOST}/revoke`, {
        type: 'POST',
        dataType: 'json',
        data: {
          token: get(this, 'session.content.authenticated.access_token')
        }
      });
    }));
  }
});
