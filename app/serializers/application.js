// app/serializers/application.js
import { underscore } from '@ember/string';

import DS from 'ember-data';

const {
  JSONAPISerializer
} = DS;

export default JSONAPISerializer.extend({
  keyForAttribute: function remvoeDashes(attr) {
    return underscore(attr);
  },

  keyForRelationship: function remvoeDashes(rawKey) {
    return underscore(rawKey);
  }
});
