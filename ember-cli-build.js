/* eslint-disable */
/* global require, module */

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var nodeSass = require('node-sass'); // loads the version in your package.json

module.exports = function(defaults) {
    var env = EmberApp.env();
    var isProductionLikeBuild = ['production :('].indexOf(env) > -1;

    var app = new EmberApp(defaults, {

        emberComposableHelpers: {
            only: ['toggle', 'pipe']
        },

        // fingerprint: {
        //     enabled: isProductionLikeBuild,
        //     prepend: 'https://s3.amazonaws.com/atlmaps-' + env + '/'
        // },

        sassOptions: {
            includePaths: [
                'node_modules/ember-modal-dialog/app/styles/ember-modal-dialog',
                'bower_components/leaflet/dist',
                'bower_components/trumbowyg/dist/ui/sass',
                'bower_components/nouislider/src',
                'bower_components/bourbon/core',
                'bower_components/bitters/core',
                'bower_components/neat/core',
                'bower_components/swiper/dist/css',
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

    var funnel = require('broccoli-funnel');

    var leafletImages = funnel('bower_components/leaflet/dist/images', {
        destDir: 'assets/images'
    });

    var fa = funnel('bower_components/font-awesome/fonts/', {
        destDir: 'assets/fonts'
    });

    var trumbowyg = funnel('bower_components/trumbowyg/dist/ui', {
        destDir: 'assets/ui'
    })

    app.import('bower_components/leaflet/dist/leaflet.js');
    app.import('bower_components/leaflet-ajax/dist/leaflet.ajax.js');
    app.import('bower_components/materialize/dist/js/materialize.min.js');
    app.import('bower_components/nouislider/distribute/nouislider.min.js');
    app.import('bower_components/trumbowyg/dist/trumbowyg.min.js');
    app.import('bower_components/swiper/dist/js/swiper.min.js')
    // TODO this is for the drag and drop for reorderings.
    // use HTML5 instead.
    app.import('bower_components/interact/dist/interact.js');
    app.import('bower_components/js-xlsx/dist/xlsx.full.min.js');
    app.import('bower_components/wellknown/wellknown.js');
    app.import('vendor/shims/wellknown.js');

    return app.toTree([leafletImages, trumbowyg, fa]);
};
