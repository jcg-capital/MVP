/** @jsx React.DOM */

var Chart = React.createClass({
  displayName: "Chart",
  initializeChart: function() {
    var chartModel = this.props.chartModel;
    var seriesModel = this.props.seriesModel;
    var selector = this.refs.myChart.getDOMNode();;

    var chartOptions = React.addons.update(chartModel, {
      chart: {
        renderTo: {$set: selector}
      },
      series: {$set: seriesModel}
    });

    var chartInstance = new Highcharts.Chart(chartOptions);
    this.setState({
      chartInstance: chartInstance
    });
  },

  render: function() {
    return (
      React.createElement("div", {ref: "myChart"})
    );
  },

  componentDidMount: function() {
    this.initializeChart();
  }

});


// var chart = React.render(
//   React.createElement(Chart, {
//     seriesModel: seriesObject, 
//     chartModel: chartObject}),
//   document.getElementById('jcgCapitalChart')
// );

module.exports = Chart

// var chart = React.render( < Chart config={seriesModel: seriesObject, chartModel: chartObject} />, document.getElementById('jcgCapitalApp'));
