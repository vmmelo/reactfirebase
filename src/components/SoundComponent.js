import React, {Component} from 'react';
import mp3_file from '../assets/ameno.mp3'

class SoundComponent extends Component {

    render() {
        return (
            <div>
                <audio src={mp3_file} controls autoPlay/>
            </div>
        );
    }
}

export default SoundComponent;