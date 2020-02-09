import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
//import * as js from './jsondata.json'
//import * as jsondata from './jsondata'
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

var jsondata=require('/home/andy/rr/consuming-rest/src/details.json');


class Simulation extends Component {

    
    
  
  handleOnSubmit = e => {
    e.preventDefault();
    // pass form data
    // get it from state
    const formData = {};
    this.finallySubmit(formData);
  };

  finallySubmit = formData => {
    alert('Form submitted!');
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.submitFromOutside) {
      // pass form data
      // get it from state
      const formData = {};
      this.finallySubmit();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
<Slider value="100" onChange={this.handleOnSubmit} aria-labelledby="continuous-slider" />
        <button type="submit">Run Simulation</button>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitFromOutside: false,
    };
  }
  submitCustomForm = () => {
    this.setState({
      submitFromOutside: true,
    });
  };

  componentDidMount() {
    console.log(this.form);
  }

  render() {
    return (
      <div>
        <Simulation submitFromOutside={this.state.submitFromOutside} />
        <button onClick={this.submitCustomForm}>In Root</button>
      </div>
    );
  }
}

export default Simulation;
