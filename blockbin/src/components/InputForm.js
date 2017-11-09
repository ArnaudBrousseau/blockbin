import React, { Component } from 'react';

import '../App.css';

class InputForm extends Component {
  render() {
    return (
      <form>
        <h3>
          Paste content below to post to Blockbin:
        </h3>
        <textarea 
          className="inputform-textarea" 
          rows={10}
        />
        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default InputForm;
