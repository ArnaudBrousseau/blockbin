import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


class ShowCubeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0x...',
      cubeURL: undefined,
      shouldRedirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValidHash(str) {
    return /^0x[0-9abcdef]{64}$/.test(str);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push('/cube/' + this.state.value);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    var isValidHash = this.isValidHash(this.state.value);

    return (
      <form className="header-form" onSubmit={this.handleSubmit}>
        <label>
          Hash
          <input type="text" value={this.state.value} onChange={this.handleChange} name="sha" className="header-input" />
        </label>
        <button className="header-submit-button" disabled={isValidHash ? '' : 'disabled'}>Show</button>
      </form>
    );
  }
};

export default withRouter(ShowCubeForm);
