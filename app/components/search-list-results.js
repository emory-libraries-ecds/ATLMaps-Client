import Component from '@ember/component';

export default Component.extend({
    classNames: ['scroll-container'],

    nextPage(meta) {
        this.getResults(meta.next_page);
    }
});
