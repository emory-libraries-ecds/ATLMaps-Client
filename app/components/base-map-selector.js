import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  didInsertElement() {
    this.setProperties({
      vertical: get(this, 'orientation') === 'vertical'
    });
  },

  actions: {
    setBase(base) {
      const project = get(this, 'project');
      project.setProperties({ default_base_map: base.name });
    }
  }
});
