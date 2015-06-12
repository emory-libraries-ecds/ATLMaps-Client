import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
	layers: function() {

		var $loading_gif = Ember.$("<img/>").attr({'src':'/assets/images/loaders/Preloader_19.gif'});
        var $loading_message = Ember.$("<div/>").addClass("modal-loading-content").append($loading_gif);
        var $loading = Ember.$("<div/>").addClass("modal-loading").append($loading_message);

		var layers = DS.PromiseObject.create({
			promise: this.store.find('layer')
		});

		layers.then(function(){
			$loading.fadeOut(1500, function(){
                    Ember.$(this).remove();
                });
		});

		return layers;


	}.property(),

	actions: {
		addLayer: function(layer){
			console.log(layer);

			this.sendAction('action', this.get('param'));
		}
	}
});
