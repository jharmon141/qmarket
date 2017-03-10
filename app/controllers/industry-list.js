import Ember from 'ember';

export default Ember.Controller.extend({
    showingList: false,
    actions: {
        toggleList() {
            this.toggleProperty('showingList');
        }
    }
});
