import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import L from "leaflet";

export default class MapComponent extends Component {

  @tracked map;
  @tracked activeFeature = null;
  @service searchParameters;
  @service dataColors;
  @service deviceContext;
  @service fastboot;

  baseLayer = null;

  inactiveIcon(vectorFeature) {
    return L.divIcon({
      html: `<div id="data-layer-${vectorFeature.id}"><i class="fas fa-map-marker-alt"></i></div>`,
      className: `leaflet-marker-icon leaflet-div-icon leaflet-zoom-animated leaflet-interactive atlm-map-marker ${vectorFeature.color.name}`
    });
  }

  activeIcon(vectorFeature) {
    return L.divIcon({
      html: `<div id="data-layer-${vectorFeature.id}"><i class="fas fa-map-marker-alt"></i></div>`,
      className: `leaflet-marker-icon leaflet-div-icon leaflet-zoom-animated leaflet-interactive atlm-map-marker ${vectorFeature.color.name} active`
    });
  }

  // get _center() {
  //   if (!this.map) {
  //     return null;
  //   }
  //   return {lat: this.map.getCenter().lat.toString(), lng: this.map.getCenter().lng.toString()};
  // }

  @action
  onEachFeature(vectorFeature, color, feature, layer) {
    // TODO: This probably isn't the best/most obvious place to set
    // the color.
    if (!color) {
      color = layer.getLayers().firstObject.options.fillColor;
    }
    vectorFeature.setProperties({ leafletObject: layer, color });
    vectorFeature.leafletObject.bringToBack();
    vectorFeature.get('vectorLayer').setProperties({ onMap: true });

    if (vectorFeature.geometryType == 'Point') {
      if (vectorFeature.active) {
        this.activeFeature.leafletMarker.setIcon(
          this.activeIcon(this.activeFeature)
        );
      } else {
        vectorFeature.leafletMarker.setIcon(
          this.inactiveIcon(vectorFeature)
        );
      }
    }

    layer.on('click', () => {
      this.clearActiveFeature();
      vectorFeature.setProperties({
        active: true
      });
      this.activeFeature = vectorFeature;
    });

    layer.on('keyup', event => {
      if (event.originalEvent.key == 'Enter') {
        this.clearActiveFeature();
        this.activeFeature = vectorFeature;
        if (vectorFeature.geometryType == 'Point') {
          this.activeFeature.leafletMarker.setIcon(
            this.activeIcon(this.activeFeature)
          );
        }
     }
    });
  }

  @action
  clearActiveFeatureKey(event) {
    // if (!event || event.type != 'keyup') return;
    if (event && event.type == 'keyup' && event.key == 'Escape' || event.key == 'Enter' && event.target.id == 'atlm-close-popup-button') {
      this.clearActiveFeature();
    }
  }

  @action
  clearActiveFeature() {
    if (this.activeFeature) {
      if (this.activeFeature.geometryType == 'Point') {
        this.clearActivePoint();
      }
      this.activeFeature.setProperties({
        active: false
      });
    }
    this.activeFeature = null;
  }

  clearActivePoint() {
    this.activeFeature.leafletMarker.setIcon(
      this.inactiveIcon(this.activeFeature)
    );
  }

  @action
  captureBounds() {
    if (this.map) {
      this.searchParameters.currentBounds = this.map.getBounds();
    }
  }

  @action
  addMarker(vectorFeature, layer, feature/*, point*/) {
    if (vectorFeature.geometryType == 'Point') {
      let marker = L.marker(feature);
      vectorFeature.setProperties({ leafletMarker: marker });
      // This function has to return the marker object.
      return marker;
    }
  }

  @action
  rasterAdded(raster, event) {
    raster.setProperties({ leafletObject: event.sourceTarget, onMap: true });
  }

  @action
  initMap(event) {
    const map = event.target;
    this.args.project.setProperties({
      leafletMap: map
    });
    if(this.deviceContext.isDesktop) {
      map.zoomControl.setPosition('bottomleft');
    } else {
      map.zoomControl.remove();
    }
    this.args.project.get('vectors').forEach(vector => {
      map.createPane(
        vector.get('vectorLayer.name')
      );
      let pane = map.getPane(vector.get('vectorLayer.name'));
      pane.style.zIndex = 500 - (vector.order * 10);
      pane.classList.add('leaflet-overlay-pane');
      vector.setProperties({
        leafletPane: pane
      });
    });
    this.map = map;
    this.captureBounds();
  }

  @action
  baseChange(newBaseLayer) {
    if (!this.baseLayer) {
      this.baseLayer = newBaseLayer;
    } else if (newBaseLayer != this.baseLayer) {
      this.baseLayer.leafletObjects.forEach(layer => {
        layer.remove();
      });
      this.baseLayer.leafletObjects = A([]);
      this.baseLayer = newBaseLayer;
    }
  }

  @action
  baseChanged(event) {
    this.baseLayer.leafletObjects.push(event.target);
  }
}