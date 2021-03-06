import React, { Component } from 'react';
import Message from '../Message/Message';
import '../../style/feed.css';

export class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: []
    };
    props.socket.on('message', message => {
      this.setState({ feed: [...this.state.feed, message] });
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.ownMessage !== this.props.ownMessage) {
      this.setState({ feed: [...this.state.feed, this.props.ownMessage] });
    }
  }

  render() {
    let lastSenderID = null;
    return (
      <div className="feed">
        {this.state.feed.map((message, i) => {
          console.log('last', lastSenderID);
          console.log('id', message.id);
          console.log('---');
          if (lastSenderID === message.id) message.hideName = true;
          lastSenderID = message.id;
          return <Message key={i} message={message}></Message>;
        })}
      </div>
    );
  }
}

export default Feed;
