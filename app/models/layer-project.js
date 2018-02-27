import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  /*
  * Extended by RasterLayerProject and VectorLayerProject.
  */
  data_format: attr(),
  project: belongsTo('project')
});
