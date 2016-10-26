import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(model) {
      model.save().then((post) =>
        this.transitionTo('posts.show', post)
      );
    },
    delete(model){
      // remove post from profile
      // delete all comments from post
      // delete post
      // save profile
      model.destroyRecord().then(() =>
        this.transitionTo('index')
      );
    },
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo('posts.show', model);
    }
  }
});
