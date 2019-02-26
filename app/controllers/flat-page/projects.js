import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    makeNew() {
      let project = this.store.createRecord('project');
      project.save().then(() => {
        this.transitionToRoute('project', project);
      }),
      /* eslint-disable */
      // Prettier wants spaces, but then complains
      // about indentation
      error => {
        // UIkit.notification({
        //   message: `ERROR: ${error.message}`,
        //   stauts: 'danger'
        // });
      };
      /* eslint-enable */
    },

    deleteProject(project_id) {
      const response = confirm('Are you sure you want to DELETE this project?');

      if (response === true) {
        this.store.peekRecord('project', project_id).destroyRecord();
      }
    }
  }
});
