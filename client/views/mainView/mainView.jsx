
(function(){

  // incomplete animations
  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

  var MenuBar = require('../menubarview/MenuBarView.jsx')
  var MenuItems = require('../menubarview/MenuItems.jsx')

  var Graph = require('../graphview/chart.jsx')

  // var Editor = require('../codeeditorview/CodeMirror.jsx')

  // console.log(MenuBar, MenuItems, Graph, Editor)
  // document.write(MenuBar, MenuItems, Graph, Editor)

  // <MenuBar config={ MenuItems } />
  // <div id="jcgCapitalChart"></div>
  // <div id="jcgCapitalEditor"></div>


  var MainView = React.createClass({
    render: function(){
      console.log(MenuItems)
      return (
        <div>
          <MenuBar />
        </div>

      )
    }
  })


  React.render(<MainView />, document.getElementById('WTF'));




  
})()
