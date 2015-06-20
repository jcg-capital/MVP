var CodeMirror = React.createFactory(CodeMirrorEditor);
var div = React.createFactory('div');
var h1 = React.createFactory('h1');
var p = React.createFactory('p');
var pre = React.createFactory('pre');
var code = React.createFactory('code');

var Editor = React.createClass({
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