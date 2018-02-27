import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('extras/fa-checkbox', 'Integration | Component | extras/fa checkbox', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{extras/fa-checkbox}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#extras/fa-checkbox}}
      template block text
    {{/extras/fa-checkbox}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
