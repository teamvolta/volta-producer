var data = [{
  name: 'price',
  value: 10
}];

var StatsBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    }
  },
  loadStats: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadStats();
    setInterval(this.loadStats.bind(this), 1000);
  },
  render: function() {
    return (
      <div className = "statsBox">
        <StatsList data = {this.state.data}/>
      </div>
    )
  }
});

var StatsList = React.createClass({
  render: function() {
    var statNodes = this.props.data.map(function(stat) {
      return ( 
        <Stat name = {stat.name} value = {stat.value} >
        </Stat>
      )
    });
    return ( 
      <div className = "statsList">
        {statNodes}
      </div>
    )
  }
});

var Stat = React.createClass({
  render: function() {
    return (
      <div className = "stat">
        <h4 className = "statHeader">
          {this.props.name}
        </h4>
        <div >
          {JSON.stringify(this.props.value)}
        </div>
      </div >
    )
  }
});

React.render(
  <StatsBox url = "api/stats"/>,
  document.getElementById('content')
)