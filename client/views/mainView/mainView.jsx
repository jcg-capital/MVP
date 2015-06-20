/** @jsx React.DOM */
'use strict';

var MenuBar = require('../menubarview/MenuBarView.jsx')
var MenuItems = require('../menubarview/MenuItems.jsx')

var Chart = require('../graphview/chart.jsx')
var ChartOptions = require('../graphview/chartoptions.jsx')

var App = React.createClass({
  render: function(){
    console.log(MenuItems)
    return (
        //React.createElement(Chart, ChartOptions)
      React.createElement(MenuBar, MenuItems)

    )
  }
});

React.render(<App />, document.getElementById('THEAPP'));
