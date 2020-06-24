import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | map-ui/popup/images', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('feature', this.server.create('vector-feature', 'withImages'));
  });

  test('it renders', async function(assert) {
    await render(hbs`<MapUi::Popup::Images @images={{this.feature.images}} />`);
    const imageCount = findAll('img').length;
    assert.equal(imageCount, 2);
  });
});