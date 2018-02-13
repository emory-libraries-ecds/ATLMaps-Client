import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
    tagName: 'article',
    classNames: ['article-container'],
    classNameBindings: ['expanded'],
    expanded: false,
    showMore: false,
    truncatedArticle: '',
    truncated: false,

    didInsertElement() {
        const article = get(this, 'article');
        if (article.length > 250) {
            this.setProperties(
                {
                    truncatedArticle: article.substring(0, 250),
                    truncated: true
                }
            );
        }
    },

    actions: {
        toggleShow() {
            this.toggleProperty('expanded');
            set(this, '_article', get(this, 'article'));
        }
    }
});
