import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


class ShowCubeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', cubeURL: undefined };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValidSHA3(str) {
    // TODO: refine this :)
    return !!str;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.isValidSHA3(this.state.value)) {
      this.setState({
        value: this.state.value,
        cubeURL: '/cube/' + this.state.value
      });
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    if (this.state.cubeURL) {
      return <Redirect to={this.state.cubeURL} />;
    }
    return (
      <form className="header-form" onSubmit={this.handleSubmit}>
        <label>
          Cube SHA
          <input type="text" value={this.state.value} onChange={this.handleChange} name="sha" className="header-input" />
        </label>
        <button className="header-submit-button">Show</button>
      </form>
    );
  }
}

export default ShowCubeForm;
