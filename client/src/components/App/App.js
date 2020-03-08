import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Feed from '../Feed/Feed';
import InputBar from '../InputBar/InputBar';
import '../../style/app.css';

const socket = socketIOClient('http://localhost:4000/');
const id = Date.now();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownMessage: null,
      users: 0
    };
    socket.on('user-joined', users => {
      this.setState({ users });
    });
  }

  ownMessageToFeed = ownMessage => {
    this.setState({ ownMessage });
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div className="app">
        <div className="top-row">
          <h2>Present users: {this.state.users}</h2>
          <input
            className="username-field"
            placeholder="Anonymous"
            maxLength={20}
            onChange={e => this.handleUsername(e)}
            type="text"
          />
        </div>
        <Feed socket={socket} ownMessage={this.state.ownMessage}></Feed>
        <InputBar
          id={id}
          username={this.state.username}
          socket={socket}
          ownMessageToFeed={this.ownMessageToFeed}
        ></InputBar>
      </div>
    );
  }
}

export default App;
