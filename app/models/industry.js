/*global $ */
import Ember from 'ember';
import moment from 'moment';

let Industry = Ember.Object.extend({
    tag: null,
    name: null,
    stats: null, //populate from webservice for d3
});

let yahooQueryGenerator =  query => `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;


function getDataByTicker(ticker, start, end) {

    let query =
        `select * from yahoo.finance.historicaldata where symbol = "${ticker}" and startDate = "${start}" and endDate = "${end}"`;

    let url = yahooQueryGenerator(query);


    return new Ember.RSVP.Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url,
            success: data => resolve(data.query.results.quote),
            failure: err => reject(err)
        });
    });
}


Industry.reopenClass({
    fetchByTag: getDataByTicker,
    fetchTagOneYear(tag) {
        let today = moment().format("YYYY-MM-DD");
        let lastYear = moment().subtract(1, 'year').format("YYYY-MM-DD");

        return this.fetchByTag(tag, lastYear, today);
    }
});

export default Industry;
