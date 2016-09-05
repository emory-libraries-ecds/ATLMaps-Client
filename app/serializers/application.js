import Ember from 'ember';
import DS from 'ember-data';

const { String: { underscore } } = Ember;

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
    keyForAttribute(attr) {
        return underscore(attr);
    },

    keyForRelationship(rawKey) {
        return underscore(rawKey);
    }
});
