// incomplete animations

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MainView = React.createClass({
  render: function(){
    return (
      <div id="jcgCapital">
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <h1>JCG Capital</h1>
        </ReactCSSTransitionGroup>
        <h3><strong>Partners:</strong> J. A. Munsch, G. H. Fitzgerald, and C. S. Harding</h3>
<<<<<<< HEAD
        <div id="jcgCapitalApp">
        </div>

            <div id="rangeSlider"></div>
            
=======

        <div id="jcgCapitalChart"></div>
        <div id="jcgCapitalMenu"></div>
        <div id="jcgCapitalEditor"></div>


>>>>>>> 9c0826f8beb2bdb377042c2c04cb2fa437f94118
      </div>
    )
  }
})

React.render(< MainView />, document.body);