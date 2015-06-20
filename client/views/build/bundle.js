/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8090/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/** @jsx React.DOM *//** @jsx React.DOM */

	var Chart = React.createClass({displayName: "Chart",

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

	var seriesObject = [{
	      name: 'Year 1800',
	      data: [107, 31, 635, 203, 2]
	  }, {
	      name: 'Year 1900',
	      data: [133, 156, 947, 408, 6]
	  }, {
	      name: 'Year 2008',
	      data: [973, 914, 1000, 732, 34]
	}];

	var chartObject = {
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

	var chart = React.render(
	  React.createElement(Chart, {
	    seriesModel: seriesObject, 
	    chartModel: chartObject}),
	  document.getElementById('jcgCapitalChart')
	);

	module.exports = Chart

	// var chart = React.render( < Chart config={seriesModel: seriesObject, chartModel: chartObject} />, document.getElementById('jcgCapitalApp'));


/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @jsx React.DOM */var MenuBar = React.createClass({displayName: "MenuBar",
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
	                React.createElement("li", {style:  style["navigation__item"], onMouseOut:  this.closeDropdown, onMouseOver:  this.openDropdown.bind(this, index)}, 
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	/** @jsx React.DOM */var menuitems =    [
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

	module.exports = menuitems

/***/ },
/* 4 */
/***/ function(module, exports) {

	/** @jsx React.DOM */var CodeMirror = React.createFactory(CodeMirrorEditor);
	var div = React.createFactory('div');
	var h1 = React.createFactory('h1');
	var p = React.createFactory('p');
	var pre = React.createFactory('pre');
	var code = React.createFactory('code');

	var Editor = React.createClass({displayName: "Editor",
	  getInitialState: function () {
	    return {
	      src: 'function add(a, b) {\n' +
	           '  return a + b;\n' +
	           '}'
	    };
	  },
	  render: function () {
	    return div({},
	      h1({}, 'We Got Text Editor'),
	      p({}, 'This creates a typical, editable code mirror editor that responds to changes.'),
	      CodeMirror({
	        style: {border: '1px solid black'},
	        textAreaClassName: ['form-control'],
	        textAreaStyle: {minHeight: '10em'},
	        value: this.state.src,
	        mode: 'javascript',
	        theme: 'solarized',
	        lineNumbers: true,
	        onChange: function (e) {
	          this.setState({src: e.target.value});
	        }.bind(this)
	      })
	    )
	  },
	});

	//React.render(React.createElement(Editor), document.getElementById('jcgCapitalEditor'));

	module.exports = Editor

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	(function(){

	  // incomplete animations
	  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	  var MenuBar = __webpack_require__(2)
	  var MenuItems = __webpack_require__(3)

	  var Graph = __webpack_require__(1)

	  // var Editor = require('../codeeditorview/CodeMirror.jsx')

	  // console.log(MenuBar, MenuItems, Graph, Editor)
	  // document.write(MenuBar, MenuItems, Graph, Editor)

	  // <MenuBar config={ MenuItems } />
	  // <div id="jcgCapitalChart"></div>
	  // <div id="jcgCapitalEditor"></div>


	  var MainView = React.createClass({displayName: "MainView",
	    render: function(){
	      console.log(MenuItems)
	      return (
	        React.createElement("div", null, 
	          React.createElement(MenuBar, null)
	        )

	      )
	    }
	  })


	  React.render(React.createElement(MainView, null), document.getElementById('WTF'));




	  
	})()


/***/ }
/******/ ]);