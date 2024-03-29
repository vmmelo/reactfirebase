import React, {Component} from 'react';
import * as firebase from 'firebase'
import TextField from '@material-ui/core/TextField';
import WebcamComponent from './WebcamComponent'
import SoundComponent from './SoundComponent'
import YoutubeComponent from "./YoutubeComponent";

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
          <div className="content">
              <div className='row'>
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
              </div>
              <div className='row marginleft'>
                  <WebcamComponent/>
              </div>
              <div className='row marginleft'>
                  <YoutubeComponent/>
              </div>
              <div className='sound marginleft'>
                  <SoundComponent/>
              </div>
          </div>
      );
  }
}