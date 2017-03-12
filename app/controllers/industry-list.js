import Ember from 'ember';
import Industry from '../models/industry';

export default Ember.Controller.extend({
    showingList: false,
    industries: null, // is array mon!
    selectedIndustry: null,
    init(...args) {
        this._super(...args);
        let industries = [
            Industry.create({tag: 'XLE', name: 'Energy'}),
            Industry.create({tag: 'XLK', name: 'Technology'}),
            Industry.create({tag: 'XLU', name: 'Utilities'}),
            Industry.create({tag: 'XLI', name: 'Industrials'})
        ];
        this.set('industries', industries);
    },
    actions: {
        toggleList() {
            this.toggleProperty('showingList');
        },
        populateGraph(industry) {
            this.set('isFetching', true);
            Industry.fetchTagOneYear(industry.get('tag'))
                .then(stats => {
                    industry.set('stats', stats);
                    this.set('selectedIndustry', industry);
                })
                .catch(err => console.error(`fuckedup: ${err}`))
                .finally(() => this.set('isFetching', false));
        }
    }
});
