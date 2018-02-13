import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-panel/tags', 'Integration | Component | search panel/tags', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{search-panel/tags}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#search-panel/tags}}
      template block text
    {{/search-panel/tags}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
