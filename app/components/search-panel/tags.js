/**
 * Component to track tags are currently being searched.
 * TODO: Would this be better in the `layerSearch` service?
 */

import { get, set } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  layerSearch: service(),
  classNames: ['browse-by-tags'],
  accordion: null,

  didRender() {
    if (get(this, 'accordion') === null) {
      let accordion = UIkit.accordion(
        document.getElementById('category-accordion'),
        {
          multiple: true
        }
      );
      set(this, 'accordion', accordion);
    }
  },

  willDestroyElement() {
    get(this, 'accordion').$destroy(true);
    set(this, 'accordion', null);
  },

  actions: {
    // If the tag is already checked, we remove it from the qurey. Otherwise
    // we add it.
    checkSingleTag(tag) {
      tag.toggleProperty('checked');

      if (get(tag, 'checked')) {
        get(this, 'layerSearch').addTag(tag);
      } else {
        get(this, 'layerSearch').removeTag(tag);
      }

      this.sendAction('getResults');
    },

    // handle checking/un-checking all tags.
    checkAllTagsInCategory(category) {
      let allChecked = get(category, 'allChecked');
      const tags = get(category, 'sortedTags');

      if (allChecked === false) {
        get(this, 'accordion').$emit((event = 'update'));
        get(this, 'layerSearch').addAllTags(tags);
        tags.forEach(tag => {
          tag.setProperties({ checked: true });
        });
      } else {
        get(this, 'layerSearch').removeAllTags(tags);
        tags.forEach(tag => {
          tag.setProperties({ checked: false });
        });
      }
      this.sendAction('getResults');
    }
  }
});
