import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A address was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
