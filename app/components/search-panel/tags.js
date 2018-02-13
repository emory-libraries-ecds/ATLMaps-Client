/**
 * Component to track tags are currently being searched.
 * TODO: Would this be better in the `browseParams` service?
 */

import { get } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  browseParams: service(),

  classNames: ['browse-by-tags'],

  actions: {
    // If the tag is already checked, we remove it from the qurey. Otherwise
    // we add it.
    checkSingleTag(tag, category) {
      tag.toggleProperty('checked');

      if (get(tag, 'checked')) {
        get(this, 'browseParams').addTag(tag);
      } else {
        get(this, 'browseParams').removeTag(tag);
        category.setProperties(
          {
            allChecked: false
          }
        );
      }

      this.sendAction('getResults');
    },

    // handle checking/un-checking all tags.
    checkAllTagsInCategory(category) {
      let allChecked = get(category, 'allChecked');
      const tags = get(category, 'sortedTags');
      category.toggleProperty('allChecked');

      if (allChecked === false) {
        get(this, 'browseParams').addAllTags(tags);
      } else {
        get(this, 'browseParams').removeAllTags(tags);
      }

      tags.forEach((tag) => {
        tag.setProperties(
          {
            checked: get(category, 'allChecked')
          }
        );
      });

      this.sendAction('getResults');
    }
  }
});
