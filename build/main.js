(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/bob/Development/JCG_CAPITAL/MVP/client/views/graphview/chart.jsx":[function(require,module,exports){
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

},{}],"/home/bob/Development/JCG_CAPITAL/MVP/client/views/graphview/chartoptions.jsx":[function(require,module,exports){
var seriesModel = [{
      name: 'Year 1800',
      data: [107, 31, 635, 203, 2]
  }, {
      name: 'Year 1900',
      data: [133, 156, 947, 408, 6]
  }, {
      name: 'Year 2008',
      data: [973, 914, 1000, 732, 34]
}];

var chartModel = {
   chart: {
       renderTo: 'container',
       type: 'line',
   },
   title: {
       text: 'Historic World Population by Region'
   },
   subtitle: {
       text: 'Source: Wikipedia.org'
   },
   xAxis: {
       categories: ['Africans', 'America', 'Asia', 'Europe', 'Oceania'],
       title: {
           text: null
       }
   },
   yAxis: {
       min: 0,
       title: {
           text: 'Population (millions)',
           align: 'high'
       },
       labels: {
           overflow: 'justify'
       }
   },
   tooltip: {
       formatter: function() {
           return ''+
               this.series.name +': '+ this.y +' millions';
       }
   },
   plotOptions: {
       bar: {
           dataLabels: {
               enabled: true
           }
       }
   },
   legend: {
       layout: 'vertical',
       align: 'right',
       verticalAlign: 'top',
       x: -100,
       y: 100,
       floating: true,
       borderWidth: 1,
       backgroundColor: '#FFFFFF',
       shadow: true
   },
   credits: {
       enabled: false
   }
 }


module.exports = {seriesModel: seriesModel, chartModel: chartModel}

},{}],"/home/bob/Development/JCG_CAPITAL/MVP/client/views/mainView/mainView.jsx":[function(require,module,exports){
  // incomplete animations
  // var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;



  // // var Editor = require('../codeeditorview/CodeMirror.jsx')

  // // console.log(MenuBar, MenuItems, Graph, Editor)
  // // document.write(MenuBar, MenuItems, Graph, Editor)

  // // <MenuBar config={ MenuItems } />
  // // <div id="jcgCapitalChart"></div>
  // // <div id="jcgCapitalEditor"></div>


  // var MainView = React.createClass({
  //   render: function(){
  //     console.log(MenuItems)
  //     return (
  //       <div>
  //         <Graph />
  //       </div>

  //     )
  //   }
  // })


  // React.render(<MainView />, document.getElementById('WTF'));
/** @jsx React.DOM */
'use strict';

var MenuBar = require('../menubarview/MenuBarView.jsx')
var MenuItems = require('../menubarview/MenuItems.jsx')

var Chart = require('../graphview/chart.jsx')
var ChartOptions = require('../graphview/chartoptions.jsx')

var App = React.createClass({displayName: "App",
  render: function(){
    console.log(MenuItems)
    return (
        //React.createElement(Chart, ChartOptions)
      React.createElement(MenuBar, MenuItems)

    )
  }
});

React.render(React.createElement(App, null), document.getElementById('THEAPP'));

},{"../graphview/chart.jsx":"/home/bob/Development/JCG_CAPITAL/MVP/client/views/graphview/chart.jsx","../graphview/chartoptions.jsx":"/home/bob/Development/JCG_CAPITAL/MVP/client/views/graphview/chartoptions.jsx","../menubarview/MenuBarView.jsx":"/home/bob/Development/JCG_CAPITAL/MVP/client/views/menubarview/MenuBarView.jsx","../menubarview/MenuItems.jsx":"/home/bob/Development/JCG_CAPITAL/MVP/client/views/menubarview/MenuItems.jsx"}],"/home/bob/Development/JCG_CAPITAL/MVP/client/views/menubarview/MenuBarView.jsx":[function(require,module,exports){
var MenuBar = React.createClass({displayName: "MenuBar",
    navstyle: {
        'background-color': '#CCC',
        'width': '42.75em',
        'height': '1.3em', 
    },
    style: {
        'a': {'text-decoration': 'none',
            'color': '#FFF',
            'font-family': 'Arial',
            'text-decoration': 'none',
        },
        'navigation__item': {
            'display': 'inline-block',
            'vertical-align': 'center',
            'top': '0px',
            'margin': '0px 5px'
        },
        'navigation__dropdown': {
            'display':'none',
            'position':'absolute',
            'list-style':'none',
            'width':'60px',
            'text-align':'center',
            'background-color':'#999',
            'padding':'0px',
            'margin':'0px'
        },
        'navigation__dropdown__link': {
            'list-style':'none',
        },
        'navigation__dropdown--open': {
            'display':'block',
        },
    },
    getInitialState: function () {
        return {
            openDropdown: -1
        };
    },
    getDefaultProps: function () {
        return {
            config: []
        }
    },
    openDropdown: function (id) {
        // console.log('open!');
        this.setState({
            openDropdown: id
        });
    },
    closeDropdown: function () {
        this.setState({
            openDropdown: -1
        });
    },
    propTypes: {
        config: React.PropTypes.array
    },
    render: function () {
        var config = this.props.config;
        var style = this.style

        var items = config.map(function (item, index) {
            var children, dropdown;
            if (item.children) {
                children = item.children.map(function (child) {
                    return (
                        React.createElement("li", {style:  style["navigation__dropdown__item"] }, 
                            React.createElement("a", {style:  style["navigation__dropdown__link"], href: "#!"}, 
                                 child.text
                            )
                        )
                    );
                });

                var dropdownClass = 'navigation__dropdown';
                if (this.state.openDropdown === index) {
                    dropdownClass += ' navigation__dropdown--open';
                }
                
                // console.log(this.state.openDropdown, index);

                dropdown = (
                    React.createElement("ul", {className:  dropdownClass }, 
                         children 
                    )
                );
            }
            return (
                React.createElement("li", {style:  style["navigation__item"], onMouseOut:  this.closeDropdown, onMouseOver:  this.openDropdown.bind(this, index) }, 
                    React.createElement("a", {style: style["navigation__link"], href: "#!"}, 
                         item.text
                    ), 

                     dropdown 
                )
                );
        }, this);

        return (
            React.createElement("div", {style: this.navstyle}, 
                 items 
            )
            );
    }
});



// React.render(<MenuBar config={ menuitems } />, document.getElementById('jcgCapitalMenu'));
module.exports = MenuBar

},{}],"/home/bob/Development/JCG_CAPITAL/MVP/client/views/menubarview/MenuItems.jsx":[function(require,module,exports){
var menuitems =    [
        {'text':'File',
            'children': [{'text':'Open'},{'text':'Close'}]
        },
        {'text': 'Edit',
            'children': [{'text':'Open'},{'text':'Close'}]
        },
        {'text':'Selection',
            'children': [{'text':'Open'},{'text':'Close'}]
        },
        {'text':'Find',
            'children': [{'text':'Open'},{'text':'Close'}]
        },
        {'text':'Preferences',
            'children': [{'text':'Open'},{'text':'Close'}]
        }
    ]

module.exports = {config: menuitems}

},{}]},{},["/home/bob/Development/JCG_CAPITAL/MVP/client/views/graphview/chart.jsx","/home/bob/Development/JCG_CAPITAL/MVP/client/views/menubarview/MenuBarView.jsx","/home/bob/Development/JCG_CAPITAL/MVP/client/views/menubarview/MenuItems.jsx","/home/bob/Development/JCG_CAPITAL/MVP/client/views/mainView/mainView.jsx"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9ncmFwaHZpZXcvY2hhcnQuanN4IiwiL2hvbWUvYm9iL0RldmVsb3BtZW50L0pDR19DQVBJVEFML01WUC9jbGllbnQvdmlld3MvZ3JhcGh2aWV3L2NoYXJ0b3B0aW9ucy5qc3giLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9tYWluVmlldy9tYWluVmlldy5qc3giLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9tZW51YmFydmlldy9NZW51QmFyVmlldy5qc3giLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9tZW51YmFydmlldy9NZW51SXRlbXMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0VBQzVCLFdBQVcsRUFBRSxPQUFPO0VBQ3BCLGVBQWUsRUFBRSxXQUFXO0lBQzFCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3ZDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQzdDLElBQUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs7SUFFL0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO01BQ2pELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7T0FD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LE1BQU0sQ0FBQyxXQUFXO1lBQ2YsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFDRCxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ1YsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFDRCxDQUFDLE1BQU0sQ0FBQyxhQUFhO1lBQ2pCLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO0FBQ1QsS0FBSzs7QUFFTCxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBDaGFydCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6IFwiQ2hhcnRcIixcbiAgaW5pdGlhbGl6ZUNoYXJ0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2hhcnRNb2RlbCA9IHRoaXMucHJvcHMuY2hhcnRNb2RlbDtcbiAgICB2YXIgc2VyaWVzTW9kZWwgPSB0aGlzLnByb3BzLnNlcmllc01vZGVsO1xuICAgIHZhciBzZWxlY3RvciA9IHRoaXMucmVmcy5teUNoYXJ0LmdldERPTU5vZGUoKTs7XG5cbiAgICB2YXIgY2hhcnRPcHRpb25zID0gUmVhY3QuYWRkb25zLnVwZGF0ZShjaGFydE1vZGVsLCB7XG4gICAgICBjaGFydDoge1xuICAgICAgICByZW5kZXJUbzogeyRzZXQ6IHNlbGVjdG9yfVxuICAgICAgfSxcbiAgICAgIHNlcmllczogeyRzZXQ6IHNlcmllc01vZGVsfVxuICAgIH0pO1xuXG4gICAgdmFyIGNoYXJ0SW5zdGFuY2UgPSBuZXcgSGlnaGNoYXJ0cy5DaGFydChjaGFydE9wdGlvbnMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hhcnRJbnN0YW5jZTogY2hhcnRJbnN0YW5jZVxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJteUNoYXJ0XCJ9KVxuICAgICk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNoYXJ0KCk7XG4gIH1cblxufSk7XG5cblxuLy8gdmFyIGNoYXJ0ID0gUmVhY3QucmVuZGVyKFxuLy8gICBSZWFjdC5jcmVhdGVFbGVtZW50KENoYXJ0LCB7XG4vLyAgICAgc2VyaWVzTW9kZWw6IHNlcmllc09iamVjdCwgXG4vLyAgICAgY2hhcnRNb2RlbDogY2hhcnRPYmplY3R9KSxcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pjZ0NhcGl0YWxDaGFydCcpXG4vLyApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0XG5cbi8vIHZhciBjaGFydCA9IFJlYWN0LnJlbmRlciggPCBDaGFydCBjb25maWc9e3Nlcmllc01vZGVsOiBzZXJpZXNPYmplY3QsIGNoYXJ0TW9kZWw6IGNoYXJ0T2JqZWN0fSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pjZ0NhcGl0YWxBcHAnKSk7XG4iLCJ2YXIgc2VyaWVzTW9kZWwgPSBbe1xuICAgICAgbmFtZTogJ1llYXIgMTgwMCcsXG4gICAgICBkYXRhOiBbMTA3LCAzMSwgNjM1LCAyMDMsIDJdXG4gIH0sIHtcbiAgICAgIG5hbWU6ICdZZWFyIDE5MDAnLFxuICAgICAgZGF0YTogWzEzMywgMTU2LCA5NDcsIDQwOCwgNl1cbiAgfSwge1xuICAgICAgbmFtZTogJ1llYXIgMjAwOCcsXG4gICAgICBkYXRhOiBbOTczLCA5MTQsIDEwMDAsIDczMiwgMzRdXG59XTtcblxudmFyIGNoYXJ0TW9kZWwgPSB7XG4gICBjaGFydDoge1xuICAgICAgIHJlbmRlclRvOiAnY29udGFpbmVyJyxcbiAgICAgICB0eXBlOiAnbGluZScsXG4gICB9LFxuICAgdGl0bGU6IHtcbiAgICAgICB0ZXh0OiAnSGlzdG9yaWMgV29ybGQgUG9wdWxhdGlvbiBieSBSZWdpb24nXG4gICB9LFxuICAgc3VidGl0bGU6IHtcbiAgICAgICB0ZXh0OiAnU291cmNlOiBXaWtpcGVkaWEub3JnJ1xuICAgfSxcbiAgIHhBeGlzOiB7XG4gICAgICAgY2F0ZWdvcmllczogWydBZnJpY2FucycsICdBbWVyaWNhJywgJ0FzaWEnLCAnRXVyb3BlJywgJ09jZWFuaWEnXSxcbiAgICAgICB0aXRsZToge1xuICAgICAgICAgICB0ZXh0OiBudWxsXG4gICAgICAgfVxuICAgfSxcbiAgIHlBeGlzOiB7XG4gICAgICAgbWluOiAwLFxuICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgIHRleHQ6ICdQb3B1bGF0aW9uIChtaWxsaW9ucyknLFxuICAgICAgICAgICBhbGlnbjogJ2hpZ2gnXG4gICAgICAgfSxcbiAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgb3ZlcmZsb3c6ICdqdXN0aWZ5J1xuICAgICAgIH1cbiAgIH0sXG4gICB0b29sdGlwOiB7XG4gICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgcmV0dXJuICcnK1xuICAgICAgICAgICAgICAgdGhpcy5zZXJpZXMubmFtZSArJzogJysgdGhpcy55ICsnIG1pbGxpb25zJztcbiAgICAgICB9XG4gICB9LFxuICAgcGxvdE9wdGlvbnM6IHtcbiAgICAgICBiYXI6IHtcbiAgICAgICAgICAgZGF0YUxhYmVsczoge1xuICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICB9XG4gICAgICAgfVxuICAgfSxcbiAgIGxlZ2VuZDoge1xuICAgICAgIGxheW91dDogJ3ZlcnRpY2FsJyxcbiAgICAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJyxcbiAgICAgICB4OiAtMTAwLFxuICAgICAgIHk6IDEwMCxcbiAgICAgICBmbG9hdGluZzogdHJ1ZSxcbiAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcbiAgICAgICBzaGFkb3c6IHRydWVcbiAgIH0sXG4gICBjcmVkaXRzOiB7XG4gICAgICAgZW5hYmxlZDogZmFsc2VcbiAgIH1cbiB9XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7c2VyaWVzTW9kZWw6IHNlcmllc01vZGVsLCBjaGFydE1vZGVsOiBjaGFydE1vZGVsfVxuIiwiICAvLyBpbmNvbXBsZXRlIGFuaW1hdGlvbnNcbiAgLy8gdmFyIFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwID0gUmVhY3QuYWRkb25zLkNTU1RyYW5zaXRpb25Hcm91cDtcblxuXG5cbiAgLy8gLy8gdmFyIEVkaXRvciA9IHJlcXVpcmUoJy4uL2NvZGVlZGl0b3J2aWV3L0NvZGVNaXJyb3IuanN4JylcblxuICAvLyAvLyBjb25zb2xlLmxvZyhNZW51QmFyLCBNZW51SXRlbXMsIEdyYXBoLCBFZGl0b3IpXG4gIC8vIC8vIGRvY3VtZW50LndyaXRlKE1lbnVCYXIsIE1lbnVJdGVtcywgR3JhcGgsIEVkaXRvcilcblxuICAvLyAvLyA8TWVudUJhciBjb25maWc9eyBNZW51SXRlbXMgfSAvPlxuICAvLyAvLyA8ZGl2IGlkPVwiamNnQ2FwaXRhbENoYXJ0XCI+PC9kaXY+XG4gIC8vIC8vIDxkaXYgaWQ9XCJqY2dDYXBpdGFsRWRpdG9yXCI+PC9kaXY+XG5cblxuICAvLyB2YXIgTWFpblZpZXcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIC8vICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAvLyAgICAgY29uc29sZS5sb2coTWVudUl0ZW1zKVxuICAvLyAgICAgcmV0dXJuIChcbiAgLy8gICAgICAgPGRpdj5cbiAgLy8gICAgICAgICA8R3JhcGggLz5cbiAgLy8gICAgICAgPC9kaXY+XG5cbiAgLy8gICAgIClcbiAgLy8gICB9XG4gIC8vIH0pXG5cblxuICAvLyBSZWFjdC5yZW5kZXIoPE1haW5WaWV3IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnV1RGJykpO1xuLyoqIEBqc3ggUmVhY3QuRE9NICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBNZW51QmFyID0gcmVxdWlyZSgnLi4vbWVudWJhcnZpZXcvTWVudUJhclZpZXcuanN4JylcbnZhciBNZW51SXRlbXMgPSByZXF1aXJlKCcuLi9tZW51YmFydmlldy9NZW51SXRlbXMuanN4JylcblxudmFyIENoYXJ0ID0gcmVxdWlyZSgnLi4vZ3JhcGh2aWV3L2NoYXJ0LmpzeCcpXG52YXIgQ2hhcnRPcHRpb25zID0gcmVxdWlyZSgnLi4vZ3JhcGh2aWV3L2NoYXJ0b3B0aW9ucy5qc3gnKVxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2coTWVudUl0ZW1zKVxuICAgIHJldHVybiAoXG4gICAgICAgIC8vUmVhY3QuY3JlYXRlRWxlbWVudChDaGFydCwgQ2hhcnRPcHRpb25zKVxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51QmFyLCBNZW51SXRlbXMpXG5cbiAgICApXG4gIH1cbn0pO1xuXG5SZWFjdC5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RIRUFQUCcpKTtcbiIsInZhciBNZW51QmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG5hdnN0eWxlOiB7XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNDQ0MnLFxuICAgICAgICAnd2lkdGgnOiAnNDIuNzVlbScsXG4gICAgICAgICdoZWlnaHQnOiAnMS4zZW0nLCBcbiAgICB9LFxuICAgIHN0eWxlOiB7XG4gICAgICAgICdhJzogeyd0ZXh0LWRlY29yYXRpb24nOiAnbm9uZScsXG4gICAgICAgICAgICAnY29sb3InOiAnI0ZGRicsXG4gICAgICAgICAgICAnZm9udC1mYW1pbHknOiAnQXJpYWwnLFxuICAgICAgICAgICAgJ3RleHQtZGVjb3JhdGlvbic6ICdub25lJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ25hdmlnYXRpb25fX2l0ZW0nOiB7XG4gICAgICAgICAgICAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogJ2NlbnRlcicsXG4gICAgICAgICAgICAndG9wJzogJzBweCcsXG4gICAgICAgICAgICAnbWFyZ2luJzogJzBweCA1cHgnXG4gICAgICAgIH0sXG4gICAgICAgICduYXZpZ2F0aW9uX19kcm9wZG93bic6IHtcbiAgICAgICAgICAgICdkaXNwbGF5Jzonbm9uZScsXG4gICAgICAgICAgICAncG9zaXRpb24nOidhYnNvbHV0ZScsXG4gICAgICAgICAgICAnbGlzdC1zdHlsZSc6J25vbmUnLFxuICAgICAgICAgICAgJ3dpZHRoJzonNjBweCcsXG4gICAgICAgICAgICAndGV4dC1hbGlnbic6J2NlbnRlcicsXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6JyM5OTknLFxuICAgICAgICAgICAgJ3BhZGRpbmcnOicwcHgnLFxuICAgICAgICAgICAgJ21hcmdpbic6JzBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJ25hdmlnYXRpb25fX2Ryb3Bkb3duX19saW5rJzoge1xuICAgICAgICAgICAgJ2xpc3Qtc3R5bGUnOidub25lJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ25hdmlnYXRpb25fX2Ryb3Bkb3duLS1vcGVuJzoge1xuICAgICAgICAgICAgJ2Rpc3BsYXknOidibG9jaycsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bjogLTFcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uZmlnOiBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBvcGVuRHJvcGRvd246IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3BlbiEnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBvcGVuRHJvcGRvd246IGlkXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xvc2VEcm9wZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bjogLTFcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5wcm9wcy5jb25maWc7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVcblxuICAgICAgICB2YXIgaXRlbXMgPSBjb25maWcubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuLCBkcm9wZG93bjtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17IHN0eWxlW1wibmF2aWdhdGlvbl9fZHJvcGRvd25fX2l0ZW1cIl0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBzdHlsZT17IHN0eWxlW1wibmF2aWdhdGlvbl9fZHJvcGRvd25fX2xpbmtcIl0gfSBocmVmPScjISc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2hpbGQudGV4dCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBkcm9wZG93bkNsYXNzID0gJ25hdmlnYXRpb25fX2Ryb3Bkb3duJztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcGVuRHJvcGRvd24gPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duQ2xhc3MgKz0gJyBuYXZpZ2F0aW9uX19kcm9wZG93bi0tb3Blbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUub3BlbkRyb3Bkb3duLCBpbmRleCk7XG5cbiAgICAgICAgICAgICAgICBkcm9wZG93biA9IChcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17IGRyb3Bkb3duQ2xhc3MgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2hpbGRyZW4gfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17IHN0eWxlW1wibmF2aWdhdGlvbl9faXRlbVwiXSB9IG9uTW91c2VPdXQ9eyB0aGlzLmNsb3NlRHJvcGRvd24gfSBvbk1vdXNlT3Zlcj17IHRoaXMub3BlbkRyb3Bkb3duLmJpbmQodGhpcywgaW5kZXgpIH0+XG4gICAgICAgICAgICAgICAgICAgIDxhIHN0eWxlPXtzdHlsZVtcIm5hdmlnYXRpb25fX2xpbmtcIl19IGhyZWY9JyMhJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaXRlbS50ZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICAgICAgICAgIHsgZHJvcGRvd24gfVxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMubmF2c3R5bGV9PlxuICAgICAgICAgICAgICAgIHsgaXRlbXMgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5cblxuLy8gUmVhY3QucmVuZGVyKDxNZW51QmFyIGNvbmZpZz17IG1lbnVpdGVtcyB9IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamNnQ2FwaXRhbE1lbnUnKSk7XG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVCYXIiLCJ2YXIgbWVudWl0ZW1zID0gICAgW1xuICAgICAgICB7J3RleHQnOidGaWxlJyxcbiAgICAgICAgICAgICdjaGlsZHJlbic6IFt7J3RleHQnOidPcGVuJ30seyd0ZXh0JzonQ2xvc2UnfV1cbiAgICAgICAgfSxcbiAgICAgICAgeyd0ZXh0JzogJ0VkaXQnLFxuICAgICAgICAgICAgJ2NoaWxkcmVuJzogW3sndGV4dCc6J09wZW4nfSx7J3RleHQnOidDbG9zZSd9XVxuICAgICAgICB9LFxuICAgICAgICB7J3RleHQnOidTZWxlY3Rpb24nLFxuICAgICAgICAgICAgJ2NoaWxkcmVuJzogW3sndGV4dCc6J09wZW4nfSx7J3RleHQnOidDbG9zZSd9XVxuICAgICAgICB9LFxuICAgICAgICB7J3RleHQnOidGaW5kJyxcbiAgICAgICAgICAgICdjaGlsZHJlbic6IFt7J3RleHQnOidPcGVuJ30seyd0ZXh0JzonQ2xvc2UnfV1cbiAgICAgICAgfSxcbiAgICAgICAgeyd0ZXh0JzonUHJlZmVyZW5jZXMnLFxuICAgICAgICAgICAgJ2NoaWxkcmVuJzogW3sndGV4dCc6J09wZW4nfSx7J3RleHQnOidDbG9zZSd9XVxuICAgICAgICB9XG4gICAgXVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtjb25maWc6IG1lbnVpdGVtc30iXX0=
