import React, { Component } from 'react';


class ShowCubeForm extends Component {
  render() {
    return (
      <form className="header-form">
        <label>
          Cube SHA
          <input type="text" name="sha" className="header-input" />
        </label>
        <button className="header-submit-button">Show</button>
      </form>
    );
  }
}

export default ShowCubeForm;
