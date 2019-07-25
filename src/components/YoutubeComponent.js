import React, {Component} from 'react';
import YouTube from 'react-youtube';

class YoutubeComponent extends Component {

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        return (
            <YouTube
                videoId="G1IbRujko-A"
                opts={opts}
                onReady={this._onReady}
            />
        );
    }
}

export default YoutubeComponent;