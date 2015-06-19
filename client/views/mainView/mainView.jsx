// incomplete animations

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MainView = React.createClass({
  render: function(){
    return (
      <div id="jcgCapital">
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <h1>JCG Capital</h1>
        </ReactCSSTransitionGroup>
        <div id="jcgCapitalApp">
        </div>

            <div id="rangeSlider"></div>

        <div id="jcgCapitalChart"></div>
        <div id="jcgCapitalMenu"></div>
        <div id="jcgCapitalEditor"></div>
      </div>
    )
  }
})

React.render(< MainView />, document.body);
