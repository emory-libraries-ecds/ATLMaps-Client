import { filterBy, gt, sort } from '@ember/object/computed';
import { get, computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  slug: attr('string'),
  tags: hasMany('tag'),

  allChecked: computed('tagsChecked', function allChecked() {
    return get(this, 'tags.length') === get(this, 'tagsChecked.length');
  }),
  // displayName: computed(function absoluteUrl() {
  //   return get(this, 'tag_ids.length');
  // }),
  // displayName: computed(function absoluteUrl() {
  //   return get(this, 'tag_ids.length');
  // }),

  // Add that little checkmark next to a category that that has a checked tag
  // because everyone wanted it.
  tagsChecked: filterBy('tags', 'checked', true),
  checked: gt('tagsChecked.length', 0),

  // Property to sort the tags by name
  sortedTags: sort('tags', '_nameSort'),
  _nameSort: ['name:asc']
});
