/**
 * Component to initiate UI for search results.
 */
// import $ from 'jquery';

import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  browseParams: service(),
  tagName: ''

//   didRender() {
//     $('ul.tabs').tabs();
//   }
});
