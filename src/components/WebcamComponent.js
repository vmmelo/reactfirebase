import React, {Component} from 'react';
import Webcam from "react-webcam";
import * as firebase from 'firebase'
import Button from '@material-ui/core/Button'

class WebcamComponent extends Component {

    db = firebase.firestore();

    state = {
        savedImages: [],
        imageIndex: 0,
        loading: true
    };

    componentDidMount() {
        let savedImages = [];
        this.db.collection("photos").orderBy('created').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                savedImages.push(doc.data()['image'])
            });
            this.setState({
                savedImages: savedImages,
                loading: false
            });
        });
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        const savedImages = [];
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.db.collection('photos').add({
            image: imageSrc,
            created: date + ' ' + time
        });
        this.db.collection("photos").orderBy('created').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                savedImages.push(doc.data()['image'])
            });
            this.setState({
                savedImages: savedImages,
                imageIndex: savedImages.length - 1
            });
        });
    };

    nextPhoto = () => {
        this.setState((state) => {
            let index = state.imageIndex + 1 <= state.savedImages.length - 1 ? state.imageIndex + 1 : 0;
            return {imageIndex: index};
        });
    };

    prevPhoto = () => {
        this.setState((state) => {
            let index = state.imageIndex - 1 >= 0 ? state.imageIndex - 1 : state.savedImages.length - 1;
            return {imageIndex: index};
        });
    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        return (
            <div style={{float: 'left'}}>
                <Webcam
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    style={{float: 'left'}}
                />
                <p><Button onClick={this.capture} style={{float: 'left', marginBottom: '20px'}}
                           variant="contained" color="primary">Capture photo</Button></p>
                <div style={{display: this.state.loading ? 'none' : 'block',float: 'left' }}>
                    <p><Button onClick={this.prevPhoto} style={{float: 'left', marginBottom: '20px', marginLeft: '5px'}}
                               variant="contained" color="primary">Prev photo</Button></p>
                    <p><Button onClick={this.nextPhoto} style={{float: 'left', marginBottom: '20px'}}
                               variant="contained" color="primary">Next photo</Button></p>
                    <img
                        src={this.state.savedImages[this.state.imageIndex]}
                        title='photo'
                     alt='photo'/>
                </div>
            </div>
        );
    }
}

export default WebcamComponent;