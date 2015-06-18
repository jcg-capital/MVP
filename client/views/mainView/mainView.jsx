var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MainView = React.createClass({
  render: function(){
    return (
      <div id="jcgCapital">
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <h1>JCG Capital</h1>
        </ReactCSSTransitionGroup>
        <h3><strong>Partners:</strong> J. A. Munsch, G. H. Fitzgerald, and C. S. Harding</h3>

        <div id="jcgCapitalChart"></div>
        <div id="jcgCapitalMenu"></div>

      </div>
    )
  }
})

React.render(< MainView />, document.body);