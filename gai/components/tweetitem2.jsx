var React = require('react');
var createReactClass = require('create-react-class');


var TweetItem = createReactClass({
  displayName: "TweetItem",

  render: function () {
    return React.createElement(
      "li",
      { className: "list-group-item" },
      this.props.text
    );
  }
});

module.exports = TweetItem;

