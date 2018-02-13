import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-ui/maps', 'Integration | Component | project ui/maps', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{project-ui/maps}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#project-ui/maps}}
      template block text
    {{/project-ui/maps}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
