import Ember from 'ember';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { timeParse } from 'd3-time-format';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { extent, min, max } from 'd3-array';

//d3 graph component

export default Ember.Component.extend({
    model: null, //passed in as attribute is 
    didUpdateAttrs() {
        let attrs = this.get('attrs');
        if (attrs.model) {
            setupD3(this.element, attrs.model.get('stats'));
        }
    },
    didInsertElement() {
        if (!this.get('model')) { return; }
        setupD3(this.element, this.get('model.stats'));
    }
});

function setupD3(el ,stats) {
     let  margin = {top: 20, right: 20, bottom: 30, left: 50};
    // let width = 960 - margin.left - margin.right;
    // let height = 500 - margin.top - margin.bottom;

    let width = window.innerWidth - 70;
    let height = (window.innerHeight / 2) - 50;

    // parse the date / time
    let parseTime = timeParse("%Y-%m-%d");

    // set the ranges
    let x = scaleTime().range([0, width]);
    let y = scaleLinear().range([height, 0]);

    // define the line
    let valueline = line()
        .x(function(d) { return x(d.Date); })
        .y(function(d) { return y(d.Close); });
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    
        // format the stats
        stats.forEach(d => {
            d.Date = parseTime(d.Date);
            d.Close = +d.Close;
        });

        // Scale the range of the stats
        x.domain(extent(stats, function(d) { return d.Date; }));
        y.domain([min(stats, function(d) { return d.Close; }), max(stats, function(d) { return d.Close; })]);

        // Add the valueline path.
        svg.append("path")
            .data([stats])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(axisLeft(y));
}
