var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MainView = React.createClass({
  render: function(){
    return (
      <div id="jcgCapital">
        <h1>JCG Capital</h1>
        <h3><strong>Partners:</strong> J. A. Munsch, G. H. Fitzgerald, and C. S. Harding</h3>
        <div id="jcgCapitalApp">
        </div>

            <div id="rangeSlider"></div>
            
      </div>
    )
  }
})
React.render(< MainView />, document.body);