/* eslint-disable */
/* global require, module */

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var nodeSass = require('node-sass'); // loads the version in your package.json

module.exports = function(defaults) {
    var env = EmberApp.env();
    var isProductionLikeBuild = ['production :('].indexOf(env) > -1;

    var app = new EmberApp(defaults, {

        emberComposableHelpers: {
            only: ['toggle', 'pipe', 'next']
        },

        // fingerprint: {
        //     enabled: isProductionLikeBuild,
        //     prepend: 'https://s3.amazonaws.com/atlmaps-' + env + '/'
        // },

        sassOptions: {
            includePaths: [
                'bower_components/font-awesome/scss'
            ],
            nodeSass // Workaround for ember-cli-sass bug https://github.com/aexmachina/ember-cli-sass/issues/117
        },

        sourcemaps: {
            enabled: !isProductionLikeBuild
        },

        minifyCSS: { enabled: isProductionLikeBuild },
        minifyJS: { enabled: isProductionLikeBuild }
    });

    // NOTE: this is the only one to keep
    app.import('node_modules/draggabilly/dist/draggabilly.pkgd.min.js');

    return app.toTree();
};
