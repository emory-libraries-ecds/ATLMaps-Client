import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-panel/provider', 'Integration | Component | search panel/provider', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{search-panel/provider}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#search-panel/provider}}
      template block text
    {{/search-panel/provider}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
