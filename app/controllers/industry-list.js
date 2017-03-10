import Ember from 'ember';
import Industry from '../models/industry';

export default Ember.Controller.extend({
    showingList: false,
    industries: null, // is array mon!
    init(...args) {
        this._super(...args);
        let industries = [
            Industry.create({tag: 'XLE', name: 'Energy'}),
            Industry.create({tag: 'XLK', name: 'Technology'}),
            Industry.create({tag: 'XLU', name: 'Utilities'}),
            Industry.create({tag: 'XLI', name: 'Industrials'})
        ]
        this.set('industries', industries);
    },
    actions: {
        toggleList() {
            this.toggleProperty('showingList');
        },
        goToGraph(tag) {
            this.transitionTo('graph', tag);
        }
    }
});
