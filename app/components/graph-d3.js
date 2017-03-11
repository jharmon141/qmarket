import Ember from 'ember';

export default Ember.Component.extend({
    model: null, //passed in as attribute is 
    didUpdateAttrs() {
        let attrs = this.get('attrs');
        if (attrs.model) {
            setupD3(this.element, attrs.model.get('stats'));
        }
    },
    didInsertElement() {
        if (!this.get('model') { return }
        setupD3(this.element, model.get('stats'));
    }
});

function setupD3(el, stats) {
    let  margin = {top: 20, right: 20, bottom: 30, left: 50};
    let width = 960 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    // parse the date / time
    let parseTime = d3.timeParse("%Y-%m-%d");

    // set the ranges
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // define the line
    let valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.Close); });
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.json("industry.json", function(error, data) {
        if (error) throw error;
        console.log(data);

        // format the data
        data.forEach(function(d) {
            console.log(d);
            d.date = parseTime(d.date);
            console.log(d.date);
            d.Close = +d.Close;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([d3.min(data, function(d) { return d.Close; }), d3.max(data, function(d) { return d.Close; })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });
}
