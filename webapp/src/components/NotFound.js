import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <pre>
        {`
        +---------+
        |   404   |
        |NOT FOUND|
        |  womp!  |
        +---------+
        `}
      </pre>
    );
  }
 }

export default NotFound;
