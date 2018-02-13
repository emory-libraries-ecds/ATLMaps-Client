import $ from 'jquery';
import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
    classNames: ['layer-list-item-title'],

    actions: {
        expand() {
            get(this, 'layer').toggleProperty('active_in_list');
            $(`#${get(this, 'layer.slug')}-content`).slideToggle();
        }
    }
});
