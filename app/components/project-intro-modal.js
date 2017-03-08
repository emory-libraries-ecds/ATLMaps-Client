import Ember from 'ember';

const {
    Component,
    inject: { service },
    get
} = Ember;

export default Component.extend({
    cookies: service(),

    classNames: ['intro-modal-link'],

    keyboardActivated: true,

    actions: {

        suppressIntro() {
            const model = get(this, 'project');
            const cookieService = get(this, 'cookies');
            const cookieName = `noIntro${model.id}`;

            if (model.hasSuppressCookie === true) {
                cookieService.clear(cookieName);
                model.setProperties({ hasSuppressCookie: false });
            } else {
                cookieService.write(cookieName, `Surppress-intro-for-project-${model.id}-on-ATLMaps.`);
                model.setProperties({ hasSuppressCookie: true });
            }
        }
    }
});
