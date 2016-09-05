// import DS from 'ember-data';
// import ENV from '../config/environment';
//
// const { JSONAPIAdapter } = DS;
//
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
//
// export default JSONAPIAdapter.extend(DataAdapterMixin, {
//     host: ENV.APP.API_HOST,
//     namespace: 'v1',
//     suffix: '.json',
//     authorizer: 'authorizer:oauth2',
//     buildURL: function(record, suffix) {
//         let s = this._super(record, suffix);
//         return s + this.get('suffix');
//     }
// });

import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';

const {
    $,
    get,
    String: {
        underscore,
        pluralize
    }
} = Ember;

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
    namespace: 'v1',
    authorizer: 'authorizer:oauth2',
    // if your rails app is on a different port from your ember app
    // this can be helpful for development.
    // in production, the host for both rails and ember should be the same.
    host: ENV.APP.API_HOST,

    // allows the multiword paths in urls to be underscored
    pathForType(type) {
        let underscored = underscore(type);
        return pluralize(underscored);
    },

    // allows queries to be sent along with a findRecord
    // hopefully Ember / EmberData will soon have this built in
    // ember-data issue tracked here:
    // https://github.com/emberjs/data/issues/3596
    urlForFindRecord(id, modelName, snapshot) {
        let url = this._super(...arguments);
        let query = get(snapshot, 'adapterOptions.query');
        if (query) {
            url += `?${$.param(query)}`;
        }
        return url;
    }
});
