var MenuBar = React.createClass({
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
    console.log('open!');
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

        var items = config.map(function (item, index) {
            var children, dropdown;
            if (item.children) {
                children = item.children.map(function (child) {
                    return (
                        <li className="navigation__dropdown__item">
                            <a className="navigation__dropdown__link" href='#!'>
                                { child.text }
                            </a>
                        </li>
                    );
                });

                var dropdownClass = 'navigation__dropdown';
                if (this.state.openDropdown === index) {
                    dropdownClass += ' navigation__dropdown--open';
                }
                
                console.log(this.state.openDropdown, index);

                dropdown = (
                    <ul className={ dropdownClass }>
                        { children }
                    </ul>
                );
            }
            return (
                <li className="navigation__item" onMouseOut={ this.closeDropdown } onMouseOver={ this.openDropdown.bind(this, index) }>
                    <a className="navigation__link" href='#!'>
                        { item.text }
                    </a>

                    { dropdown }
                </li>
                );
        }, this);

        return (
            <div className="navigation">
                { items }
            </div>
            );
    }
});

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

React.render(<MenuBar config={ menuitems } />, document.getElementById('MenuBar'));
