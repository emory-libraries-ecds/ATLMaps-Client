import Component from '@ember/component';

export default Component.extend({
    tagName: 'span',
    classNames: ['label-switch']

    // actions: {

    //
    //     toggleAll(layers) {
    //         const toggleSwitch = document.getElementById('toggle-all');
    //         layers.forEach((layer) => {
    //             if (toggleSwitch.checked) {
    //                 layer.setProperties({ opacity: 10 });
    //                 if (get(layer, 'sliderObject')) {
    //                     get(layer, 'sliderObject').set(10);
    //                 }
    //             } else {
    //                 layer.setProperties({ opacity: 0 });
    //                 if (get(layer, 'sliderObject')) {
    //                     get(layer, 'sliderObject').set(0);
    //                 }
    //             }
    //         });
    //     }
    // }
});
