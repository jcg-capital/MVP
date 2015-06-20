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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9ncmFwaHZpZXcvY2hhcnQuanN4IiwiL2hvbWUvYm9iL0RldmVsb3BtZW50L0pDR19DQVBJVEFML01WUC9jbGllbnQvdmlld3MvZ3JhcGh2aWV3L2NoYXJ0b3B0aW9ucy5qc3giLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9tYWluVmlldy9tYWluVmlldy5qc3giLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9tZW51YmFydmlldy9NZW51QmFyVmlldy5qc3giLCIvaG9tZS9ib2IvRGV2ZWxvcG1lbnQvSkNHX0NBUElUQUwvTVZQL2NsaWVudC92aWV3cy9tZW51YmFydmlldy9NZW51SXRlbXMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0VBQzVCLFdBQVcsRUFBRSxPQUFPO0VBQ3BCLGVBQWUsRUFBRSxXQUFXO0lBQzFCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3ZDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQzdDLElBQUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs7SUFFL0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO01BQ2pELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7T0FDM0I7TUFDRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO0FBQ2pDLEtBQUssQ0FBQyxDQUFDOztJQUVILElBQUksYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ1osYUFBYSxFQUFFLGFBQWE7S0FDN0IsQ0FBQyxDQUFDO0FBQ1AsR0FBRzs7RUFFRCxNQUFNLEVBQUUsV0FBVztJQUNqQjtNQUNFLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQzVDO0FBQ04sR0FBRzs7RUFFRCxpQkFBaUIsRUFBRSxXQUFXO0lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUMzQixHQUFHOztBQUVILENBQUMsQ0FBQyxDQUFDO0FBQ0g7O0FBRUEsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLCtDQUErQztBQUMvQyxLQUFLOztBQUVMLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSzs7QUFFdEIsK0lBQStJOzs7QUM1Qy9JLElBQUksV0FBVyxHQUFHLENBQUM7TUFDYixJQUFJLEVBQUUsV0FBVztNQUNqQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0dBQy9CLEVBQUU7TUFDQyxJQUFJLEVBQUUsV0FBVztNQUNqQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0dBQ2hDLEVBQUU7TUFDQyxJQUFJLEVBQUUsV0FBVztNQUNqQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDOztBQUVILElBQUksVUFBVSxHQUFHO0dBQ2QsS0FBSyxFQUFFO09BQ0gsUUFBUSxFQUFFLFdBQVc7T0FDckIsSUFBSSxFQUFFLE1BQU07SUFDZjtHQUNELEtBQUssRUFBRTtPQUNILElBQUksRUFBRSxxQ0FBcUM7SUFDOUM7R0FDRCxRQUFRLEVBQUU7T0FDTixJQUFJLEVBQUUsdUJBQXVCO0lBQ2hDO0dBQ0QsS0FBSyxFQUFFO09BQ0gsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztPQUNoRSxLQUFLLEVBQUU7V0FDSCxJQUFJLEVBQUUsSUFBSTtRQUNiO0lBQ0o7R0FDRCxLQUFLLEVBQUU7T0FDSCxHQUFHLEVBQUUsQ0FBQztPQUNOLEtBQUssRUFBRTtXQUNILElBQUksRUFBRSx1QkFBdUI7V0FDN0IsS0FBSyxFQUFFLE1BQU07UUFDaEI7T0FDRCxNQUFNLEVBQUU7V0FDSixRQUFRLEVBQUUsU0FBUztRQUN0QjtJQUNKO0dBQ0QsT0FBTyxFQUFFO09BQ0wsU0FBUyxFQUFFLFdBQVc7V0FDbEIsT0FBTyxFQUFFO2VBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDO1FBQ25EO0lBQ0o7R0FDRCxXQUFXLEVBQUU7T0FDVCxHQUFHLEVBQUU7V0FDRCxVQUFVLEVBQUU7ZUFDUixPQUFPLEVBQUUsSUFBSTtZQUNoQjtRQUNKO0lBQ0o7R0FDRCxNQUFNLEVBQUU7T0FDSixNQUFNLEVBQUUsVUFBVTtPQUNsQixLQUFLLEVBQUUsT0FBTztPQUNkLGFBQWEsRUFBRSxLQUFLO09BQ3BCLENBQUMsRUFBRSxDQUFDLEdBQUc7T0FDUCxDQUFDLEVBQUUsR0FBRztPQUNOLFFBQVEsRUFBRSxJQUFJO09BQ2QsV0FBVyxFQUFFLENBQUM7T0FDZCxlQUFlLEVBQUUsU0FBUztPQUMxQixNQUFNLEVBQUUsSUFBSTtJQUNmO0dBQ0QsT0FBTyxFQUFFO09BQ0wsT0FBTyxFQUFFLEtBQUs7SUFDakI7QUFDSixFQUFFO0FBQ0Y7O0FBRUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQzs7O0FDcEVuRSxxQkFBcUI7QUFDckIsWUFBWSxDQUFDOztBQUViLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQztBQUN2RCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUM7O0FBRXZELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztBQUM3QyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUM7O0FBRTNELElBQUkseUJBQXlCLG1CQUFBO0VBQzNCLE1BQU0sRUFBRSxVQUFVO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQzFCLElBQUk7O0FBRUosTUFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7O0tBRXhDO0dBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O0FDcEJ6RCxJQUFJLDZCQUE2Qix1QkFBQTtJQUM3QixRQUFRLEVBQUU7UUFDTixrQkFBa0IsRUFBRSxNQUFNO1FBQzFCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO0tBQ3BCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsTUFBTTtZQUMzQixPQUFPLEVBQUUsTUFBTTtZQUNmLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLE1BQU07U0FDNUI7UUFDRCxrQkFBa0IsRUFBRTtZQUNoQixTQUFTLEVBQUUsY0FBYztZQUN6QixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFNBQVM7U0FDdEI7UUFDRCxzQkFBc0IsRUFBRTtZQUNwQixTQUFTLENBQUMsTUFBTTtZQUNoQixVQUFVLENBQUMsVUFBVTtZQUNyQixZQUFZLENBQUMsTUFBTTtZQUNuQixPQUFPLENBQUMsTUFBTTtZQUNkLFlBQVksQ0FBQyxRQUFRO1lBQ3JCLGtCQUFrQixDQUFDLE1BQU07WUFDekIsU0FBUyxDQUFDLEtBQUs7WUFDZixRQUFRLENBQUMsS0FBSztTQUNqQjtRQUNELDRCQUE0QixFQUFFO1lBQzFCLFlBQVksQ0FBQyxNQUFNO1NBQ3RCO1FBQ0QsNEJBQTRCLEVBQUU7WUFDMUIsU0FBUyxDQUFDLE9BQU87U0FDcEI7S0FDSjtJQUNELGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU87WUFDSCxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ25CLENBQUM7S0FDTDtJQUNELGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU87WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiO0tBQ0o7QUFDTCxJQUFJLFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRTs7UUFFeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUMsQ0FBQztLQUNOO0lBQ0QsYUFBYSxFQUFFLFlBQVk7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDbkIsQ0FBQyxDQUFDO0tBQ047SUFDRCxTQUFTLEVBQUU7UUFDUCxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLO0tBQ2hDO0lBQ0QsTUFBTSxFQUFFLFlBQVk7UUFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDdkMsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSzs7UUFFdEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDMUMsSUFBSSxRQUFRLEVBQUUsUUFBUSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUU7b0JBQzFDO3dCQUNJLG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUksQ0FBQSxFQUFBOzRCQUM5QyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLEVBQUEsQ0FBRSxDQUFDLElBQUEsRUFBSSxDQUFDLElBQUssQ0FBQSxFQUFBO2dDQUN0RCxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUU7NEJBQ2QsQ0FBQTt3QkFDSCxDQUFBO3NCQUNQO0FBQ3RCLGlCQUFpQixDQUFDLENBQUM7O2dCQUVILElBQUksYUFBYSxHQUFHLHNCQUFzQixDQUFDO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDbkMsYUFBYSxJQUFJLDZCQUE2QixDQUFDO0FBQ25FLGlCQUFpQjtBQUNqQjtBQUNBOztnQkFFZ0IsUUFBUTtvQkFDSixvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFFLENBQUMsY0FBZ0IsQ0FBQSxFQUFBO3dCQUMzQixDQUFDLFNBQVU7b0JBQ1gsQ0FBQTtpQkFDUixDQUFDO2FBQ0w7WUFDRDtnQkFDSSxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUEsQ0FBRSxDQUFDLFVBQUEsRUFBVSxDQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQSxDQUFFLENBQUMsV0FBQSxFQUFXLENBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFJLENBQUEsRUFBQTtvQkFDMUgsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBQyxDQUFDLElBQUEsRUFBSSxDQUFDLElBQUssQ0FBQSxFQUFBO3dCQUMxQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDckMsb0JBQXdCLENBQUEsRUFBQTs7b0JBRUgsQ0FBQyxTQUFVO2dCQUNYLENBQUE7a0JBQ0g7QUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUVUO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsUUFBVSxDQUFBLEVBQUE7Z0JBQ3RCLENBQUMsTUFBTztZQUNQLENBQUE7Y0FDSjtLQUNUO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBOztBQUVBLDZGQUE2RjtBQUM3RixNQUFNLENBQUMsT0FBTyxHQUFHOzs7QUMvR2pCLElBQUksU0FBUyxNQUFNO1FBQ1gsQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNWLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsQ0FBQyxNQUFNLEVBQUUsTUFBTTtZQUNYLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsQ0FBQyxNQUFNLENBQUMsV0FBVztZQUNmLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNWLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsQ0FBQyxNQUFNLENBQUMsYUFBYTtZQUNqQixVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDtBQUNULEtBQUs7O0FBRUwsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQ2hhcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiBcIkNoYXJ0XCIsXG4gIGluaXRpYWxpemVDaGFydDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoYXJ0TW9kZWwgPSB0aGlzLnByb3BzLmNoYXJ0TW9kZWw7XG4gICAgdmFyIHNlcmllc01vZGVsID0gdGhpcy5wcm9wcy5zZXJpZXNNb2RlbDtcbiAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnJlZnMubXlDaGFydC5nZXRET01Ob2RlKCk7O1xuXG4gICAgdmFyIGNoYXJ0T3B0aW9ucyA9IFJlYWN0LmFkZG9ucy51cGRhdGUoY2hhcnRNb2RlbCwge1xuICAgICAgY2hhcnQ6IHtcbiAgICAgICAgcmVuZGVyVG86IHskc2V0OiBzZWxlY3Rvcn1cbiAgICAgIH0sXG4gICAgICBzZXJpZXM6IHskc2V0OiBzZXJpZXNNb2RlbH1cbiAgICB9KTtcblxuICAgIHZhciBjaGFydEluc3RhbmNlID0gbmV3IEhpZ2hjaGFydHMuQ2hhcnQoY2hhcnRPcHRpb25zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoYXJ0SW5zdGFuY2U6IGNoYXJ0SW5zdGFuY2VcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwibXlDaGFydFwifSlcbiAgICApO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmluaXRpYWxpemVDaGFydCgpO1xuICB9XG5cbn0pO1xuXG5cbi8vIHZhciBjaGFydCA9IFJlYWN0LnJlbmRlcihcbi8vICAgUmVhY3QuY3JlYXRlRWxlbWVudChDaGFydCwge1xuLy8gICAgIHNlcmllc01vZGVsOiBzZXJpZXNPYmplY3QsIFxuLy8gICAgIGNoYXJ0TW9kZWw6IGNoYXJ0T2JqZWN0fSksXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqY2dDYXBpdGFsQ2hhcnQnKVxuLy8gKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGFydFxuXG4vLyB2YXIgY2hhcnQgPSBSZWFjdC5yZW5kZXIoIDwgQ2hhcnQgY29uZmlnPXtzZXJpZXNNb2RlbDogc2VyaWVzT2JqZWN0LCBjaGFydE1vZGVsOiBjaGFydE9iamVjdH0gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqY2dDYXBpdGFsQXBwJykpO1xuIiwidmFyIHNlcmllc01vZGVsID0gW3tcbiAgICAgIG5hbWU6ICdZZWFyIDE4MDAnLFxuICAgICAgZGF0YTogWzEwNywgMzEsIDYzNSwgMjAzLCAyXVxuICB9LCB7XG4gICAgICBuYW1lOiAnWWVhciAxOTAwJyxcbiAgICAgIGRhdGE6IFsxMzMsIDE1NiwgOTQ3LCA0MDgsIDZdXG4gIH0sIHtcbiAgICAgIG5hbWU6ICdZZWFyIDIwMDgnLFxuICAgICAgZGF0YTogWzk3MywgOTE0LCAxMDAwLCA3MzIsIDM0XVxufV07XG5cbnZhciBjaGFydE1vZGVsID0ge1xuICAgY2hhcnQ6IHtcbiAgICAgICByZW5kZXJUbzogJ2NvbnRhaW5lcicsXG4gICAgICAgdHlwZTogJ2xpbmUnLFxuICAgfSxcbiAgIHRpdGxlOiB7XG4gICAgICAgdGV4dDogJ0hpc3RvcmljIFdvcmxkIFBvcHVsYXRpb24gYnkgUmVnaW9uJ1xuICAgfSxcbiAgIHN1YnRpdGxlOiB7XG4gICAgICAgdGV4dDogJ1NvdXJjZTogV2lraXBlZGlhLm9yZydcbiAgIH0sXG4gICB4QXhpczoge1xuICAgICAgIGNhdGVnb3JpZXM6IFsnQWZyaWNhbnMnLCAnQW1lcmljYScsICdBc2lhJywgJ0V1cm9wZScsICdPY2VhbmlhJ10sXG4gICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgdGV4dDogbnVsbFxuICAgICAgIH1cbiAgIH0sXG4gICB5QXhpczoge1xuICAgICAgIG1pbjogMCxcbiAgICAgICB0aXRsZToge1xuICAgICAgICAgICB0ZXh0OiAnUG9wdWxhdGlvbiAobWlsbGlvbnMpJyxcbiAgICAgICAgICAgYWxpZ246ICdoaWdoJ1xuICAgICAgIH0sXG4gICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgIG92ZXJmbG93OiAnanVzdGlmeSdcbiAgICAgICB9XG4gICB9LFxuICAgdG9vbHRpcDoge1xuICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgIHJldHVybiAnJytcbiAgICAgICAgICAgICAgIHRoaXMuc2VyaWVzLm5hbWUgKyc6ICcrIHRoaXMueSArJyBtaWxsaW9ucyc7XG4gICAgICAgfVxuICAgfSxcbiAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgYmFyOiB7XG4gICAgICAgICAgIGRhdGFMYWJlbHM6IHtcbiAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgIH0sXG4gICBsZWdlbmQ6IHtcbiAgICAgICBsYXlvdXQ6ICd2ZXJ0aWNhbCcsXG4gICAgICAgYWxpZ246ICdyaWdodCcsXG4gICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICAgeDogLTEwMCxcbiAgICAgICB5OiAxMDAsXG4gICAgICAgZmxvYXRpbmc6IHRydWUsXG4gICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXG4gICAgICAgc2hhZG93OiB0cnVlXG4gICB9LFxuICAgY3JlZGl0czoge1xuICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICB9XG4gfVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge3Nlcmllc01vZGVsOiBzZXJpZXNNb2RlbCwgY2hhcnRNb2RlbDogY2hhcnRNb2RlbH1cbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTWVudUJhciA9IHJlcXVpcmUoJy4uL21lbnViYXJ2aWV3L01lbnVCYXJWaWV3LmpzeCcpXG52YXIgTWVudUl0ZW1zID0gcmVxdWlyZSgnLi4vbWVudWJhcnZpZXcvTWVudUl0ZW1zLmpzeCcpXG5cbnZhciBDaGFydCA9IHJlcXVpcmUoJy4uL2dyYXBodmlldy9jaGFydC5qc3gnKVxudmFyIENoYXJ0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2dyYXBodmlldy9jaGFydG9wdGlvbnMuanN4JylcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKE1lbnVJdGVtcylcbiAgICByZXR1cm4gKFxuICAgICAgICAvL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ2hhcnQsIENoYXJ0T3B0aW9ucylcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUJhciwgTWVudUl0ZW1zKVxuXG4gICAgKVxuICB9XG59KTtcblxuUmVhY3QucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUSEVBUFAnKSk7XG4iLCJ2YXIgTWVudUJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBuYXZzdHlsZToge1xuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjQ0NDJyxcbiAgICAgICAgJ3dpZHRoJzogJzQyLjc1ZW0nLFxuICAgICAgICAnaGVpZ2h0JzogJzEuM2VtJywgXG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgICAnYSc6IHsndGV4dC1kZWNvcmF0aW9uJzogJ25vbmUnLFxuICAgICAgICAgICAgJ2NvbG9yJzogJyNGRkYnLFxuICAgICAgICAgICAgJ2ZvbnQtZmFtaWx5JzogJ0FyaWFsJyxcbiAgICAgICAgICAgICd0ZXh0LWRlY29yYXRpb24nOiAnbm9uZScsXG4gICAgICAgIH0sXG4gICAgICAgICduYXZpZ2F0aW9uX19pdGVtJzoge1xuICAgICAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdjZW50ZXInLFxuICAgICAgICAgICAgJ3RvcCc6ICcwcHgnLFxuICAgICAgICAgICAgJ21hcmdpbic6ICcwcHggNXB4J1xuICAgICAgICB9LFxuICAgICAgICAnbmF2aWdhdGlvbl9fZHJvcGRvd24nOiB7XG4gICAgICAgICAgICAnZGlzcGxheSc6J25vbmUnLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzonYWJzb2x1dGUnLFxuICAgICAgICAgICAgJ2xpc3Qtc3R5bGUnOidub25lJyxcbiAgICAgICAgICAgICd3aWR0aCc6JzYwcHgnLFxuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOidjZW50ZXInLFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOicjOTk5JyxcbiAgICAgICAgICAgICdwYWRkaW5nJzonMHB4JyxcbiAgICAgICAgICAgICdtYXJnaW4nOicwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICduYXZpZ2F0aW9uX19kcm9wZG93bl9fbGluayc6IHtcbiAgICAgICAgICAgICdsaXN0LXN0eWxlJzonbm9uZScsXG4gICAgICAgIH0sXG4gICAgICAgICduYXZpZ2F0aW9uX19kcm9wZG93bi0tb3Blbic6IHtcbiAgICAgICAgICAgICdkaXNwbGF5JzonYmxvY2snLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcGVuRHJvcGRvd246IC0xXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbmZpZzogW11cbiAgICAgICAgfVxuICAgIH0sXG4gICAgb3BlbkRyb3Bkb3duOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wZW4hJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbkRyb3Bkb3duOiBpZFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlRHJvcGRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBvcGVuRHJvcGRvd246IC0xXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbmZpZzogUmVhY3QuUHJvcFR5cGVzLmFycmF5XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMucHJvcHMuY29uZmlnO1xuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlXG5cbiAgICAgICAgdmFyIGl0ZW1zID0gY29uZmlnLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiwgZHJvcGRvd247XG4gICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgc3R5bGU9eyBzdHlsZVtcIm5hdmlnYXRpb25fX2Ryb3Bkb3duX19pdGVtXCJdIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgc3R5bGU9eyBzdHlsZVtcIm5hdmlnYXRpb25fX2Ryb3Bkb3duX19saW5rXCJdIH0gaHJlZj0nIyEnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNoaWxkLnRleHQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd25DbGFzcyA9ICduYXZpZ2F0aW9uX19kcm9wZG93bic7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbkRyb3Bkb3duID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkNsYXNzICs9ICcgbmF2aWdhdGlvbl9fZHJvcGRvd24tLW9wZW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLm9wZW5Ecm9wZG93biwgaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgZHJvcGRvd24gPSAoXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9eyBkcm9wZG93bkNsYXNzIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkgc3R5bGU9eyBzdHlsZVtcIm5hdmlnYXRpb25fX2l0ZW1cIl0gfSBvbk1vdXNlT3V0PXsgdGhpcy5jbG9zZURyb3Bkb3duIH0gb25Nb3VzZU92ZXI9eyB0aGlzLm9wZW5Ecm9wZG93bi5iaW5kKHRoaXMsIGluZGV4KSB9PlxuICAgICAgICAgICAgICAgICAgICA8YSBzdHlsZT17c3R5bGVbXCJuYXZpZ2F0aW9uX19saW5rXCJdfSBocmVmPScjISc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGl0ZW0udGV4dCB9XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgICAgICB7IGRyb3Bkb3duIH1cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLm5hdnN0eWxlfT5cbiAgICAgICAgICAgICAgICB7IGl0ZW1zIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICB9XG59KTtcblxuXG5cbi8vIFJlYWN0LnJlbmRlcig8TWVudUJhciBjb25maWc9eyBtZW51aXRlbXMgfSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pjZ0NhcGl0YWxNZW51JykpO1xubW9kdWxlLmV4cG9ydHMgPSBNZW51QmFyIiwidmFyIG1lbnVpdGVtcyA9ICAgIFtcbiAgICAgICAgeyd0ZXh0JzonRmlsZScsXG4gICAgICAgICAgICAnY2hpbGRyZW4nOiBbeyd0ZXh0JzonT3Blbid9LHsndGV4dCc6J0Nsb3NlJ31dXG4gICAgICAgIH0sXG4gICAgICAgIHsndGV4dCc6ICdFZGl0JyxcbiAgICAgICAgICAgICdjaGlsZHJlbic6IFt7J3RleHQnOidPcGVuJ30seyd0ZXh0JzonQ2xvc2UnfV1cbiAgICAgICAgfSxcbiAgICAgICAgeyd0ZXh0JzonU2VsZWN0aW9uJyxcbiAgICAgICAgICAgICdjaGlsZHJlbic6IFt7J3RleHQnOidPcGVuJ30seyd0ZXh0JzonQ2xvc2UnfV1cbiAgICAgICAgfSxcbiAgICAgICAgeyd0ZXh0JzonRmluZCcsXG4gICAgICAgICAgICAnY2hpbGRyZW4nOiBbeyd0ZXh0JzonT3Blbid9LHsndGV4dCc6J0Nsb3NlJ31dXG4gICAgICAgIH0sXG4gICAgICAgIHsndGV4dCc6J1ByZWZlcmVuY2VzJyxcbiAgICAgICAgICAgICdjaGlsZHJlbic6IFt7J3RleHQnOidPcGVuJ30seyd0ZXh0JzonQ2xvc2UnfV1cbiAgICAgICAgfVxuICAgIF1cblxubW9kdWxlLmV4cG9ydHMgPSB7Y29uZmlnOiBtZW51aXRlbXN9Il19
