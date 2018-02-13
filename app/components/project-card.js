import Component from '@ember/component';

export default Component.extend({
    classNames: ['card'],
    isShowingModal: false,

    actions: {
        toggleActionMenu() {
            this.toggleProperty('isShowingModal');
        }
    }
});
