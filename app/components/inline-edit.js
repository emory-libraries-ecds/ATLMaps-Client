import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
    tagName: 'span',

    editing: false,

    click() {
        set(this, 'editing', true);
    },

    actions: {
        abort() {
            set(this, 'editing', false);
            const model = get(this, 'model');
            // TODO: Update this to `rollbackAttribute('description')` as soon as it is avaliable.
            model.rollbackAttribute('description');
            model.setProperties({ suppressIntro: true });
        }
    }
});
