
var RangeSlider = React.createClass({
  render: function() {
    return (
      <div className="pink lighten-4">
        
        <form action="#">
    		<p className="range-field pink lighten-4">
      			<input type="range" id="test5" min="0" max="100" />
    		</p>
  		</form>
      </div>
    );
  }
});



React.render(<RangeSlider/>, document.getElementById('rangeSlider'));