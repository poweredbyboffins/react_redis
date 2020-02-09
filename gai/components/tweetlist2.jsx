var React = require('react');
var createReactClass = require('create-react-class');

var TweetItem = require('./tweetitem2.jsx');

var TweetList = createReactClass({
  displayName: 'TweetList',

  render: function () {
    var that = this;
    var tweetNodes = this.props.data.map(function (item, index) {
      return React.createElement(TweetItem, { key: index, text: item.text });
    });
    return React.createElement(
      'ul',
      { className: 'tweets list-group' },
      tweetNodes
    );
  }
});

module.exports = TweetList;

