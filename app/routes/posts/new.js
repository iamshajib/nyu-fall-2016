import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {};
  },
  actions: {
    save(model) {
      let myPost = model;
      let currentUser = this.get('session.currentUser.uid');
      this.store.findRecord('profile', currentUser).then((profile) => {
        if (myPost.title && myPost.body) {
          let newPost = this.store.createRecord('post', {
            title: myPost.title,
            body: myPost.body,
            imageURL: myPost.imageURL,
            timestamp: new Date().getTime(),
            author: profile
          });
          profile.get('posts').addObject(newPost);
          newPost.save().then(() => {
            profile.save();
            this.transitionTo('posts.show', newPost);
          });
        } else {
          alert('Please fill in title and body');
        }
      });
    },
    cancel() {
      // Clear input fields
      this.set('model.title', null);
      this.set('model.body', null);
      this.transitionTo('index');
    }
  }
});
