import Component from '@ember/component';
import UIkit from 'uikit';

// empty function as default event handler
const noop = () => {};

export default Component.extend({
  tagName: 'ul',
  attributeBindings: [
    'ukAccordion:uk-accordion',
    'active',
    'animation',
    'collapsible',
    'content',
    'duration',
    'multiple',
    'targets',
    'toggle',
    'transition'
  ],

  ukAccordion: true,
  active: false,
  animation: true,
  collapsible: true,
  content: '> .uk-accordion-content',
  duration: 200,
  multiple: false,
  targets: '> *',
  toggle: '> .uk-accordion-title',
  transition: 'ease',

  setEvents() {
    let events = {
      beforeshow: this.getWithDefault('on-beforeshow', noop),
      show: this.getWithDefault('on-show', noop),
      shown: this.getWithDefault('on-shown', noop),
      beforehide: this.getWithDefault('on-beforehide', noop),
      hide: this.getWithDefault('on-hide', noop),
      hidden: this.getWithDefault('on-hidden', noop)
    };

    for (let event in events) {
      UIkit.util.on(this.element, event, events[event]);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.setEvents();
  }
});
