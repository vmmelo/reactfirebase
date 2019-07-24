import React, {Component} from 'react';
import * as firebase from 'firebase'
import TextField from '@material-ui/core/TextField';

export default class App extends Component {

  state = {
    text: ''
  };

  //Using arrow functions, we don't need to bind this in constructor
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
    firebase.database().ref().set({
      text: value
    });
  };

  componentDidMount() {
    const textRef = firebase.database().ref().child('text');
    textRef.on('value', snap => {
      this.setState({
        text: snap.val()
      })
    });
  }

  render() {
    return (
        <form>
          <TextField
              placeholder="Loading..."
              multiline={true}
              rows={20}
              rowsMax={4}
              fullWidth
              value={this.state.text}
              onChange={this.handleChange}
          />
        </form>
    );
  }
}