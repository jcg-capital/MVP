/**
  * @jsx React.DOM
*/


var InstantBox = React.createClass({
    doSearch:function(queryText){
        console.log(queryText)
        //get query result
        var queryResult=[];
        this.props.data.forEach(function(person){
            if(person.name.toLowerCase().indexOf(queryText)!=-1)
            queryResult.push(person);
        });
 
        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },
    getInitialState:function(){
        return{
            query:'',
            filteredData: this.props.data
        }
    },
    render:function(){
        return (
            <div className="InstantBox">
                <h2>Void Canvas Instant Search</h2>
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                <DisplayTable data={this.state.filteredData}/>
            </div>
        );
    }
});

var DisplayTable = React.createClass({
    render:function(){
        //making the rows to display
        var rows=[];
        this.props.data.forEach(function(person) {
        rows.push(<tr><td>{person.name}</td><td>{person.roll}</td></tr>)
        });
        //returning the table
        return(
             <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});


var tableData=[
{
    name:'Paul Shan',
    roll: '001'
},
{
    name:'John Doe',
    roll: '002'
},
{
    name:'Sachin Tendulkar',
    roll: '003'
}];



var SearchBox = React.createClass({
    doSearch:function(){
        var query=this.refs.searchInput.getDOMNode().value; // this is the search text
        this.props.doSearch(query);
    },
    render:function(){
        return <input type="text" ref="searchInput" placeholder="Search Name" value={this.props.query} onChange={this.doSearch}/>
    }
});

React.render(<InstantBox data={tableData}/>,document.getElementById('SearchBar'));



