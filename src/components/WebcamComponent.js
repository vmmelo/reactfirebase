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
        this.db.collection("photos").get().then((querySnapshot) => {
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
        let savedImages = [];
        this.db.collection('photos').add({
            image: imageSrc,
        });
        this.db.collection("photos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                savedImages.push(doc.data()['image'])
            });
            this.setState((state) => {
            console.log(savedImages)
            console.log(savedImages.length-1)
                return {
                    savedImages: savedImages,
                    imageIndex: savedImages.length-1
                }
            });
        });
    };

    nextPhoto = () => {
        this.setState((state) => {
            let randomNum = Math.floor((Math.random() * state.savedImages.length - 1) + 1)
            return {imageIndex: randomNum};
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
                    <img
                        src={this.state.savedImages[this.state.imageIndex]}
                        title='photo'
                    />
                    <p><Button onClick={this.nextPhoto} style={{float: 'left', marginBottom: '20px'}}
                               variant="contained" color="primary">Random photo</Button></p>
                </div>
            </div>
        );
    }
}

export default WebcamComponent;