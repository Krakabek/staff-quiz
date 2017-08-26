import React, {Component} from 'react';

const sounds = [
    {
        name: "success",
        path: "/audio/success.mp3"
    },
    {
        name: "fail",
        path: "/audio/fail.mp3"
    }
];

class AudioManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soundsEnabled: true
        };
        this.toggleSounds = this.toggleSounds.bind(this);
    }

    componentDidMount() {
        sounds.forEach((sound) => {
            this.props.player[sound.name] = () => {
                if (this.state.soundsEnabled) {
                    this[sound.name].play();
                }
            }
        });
    }

    toggleSounds() {
        this.setState({
            soundsEnabled: !this.state.soundsEnabled
        });
    }

    render() {
        const {soundsEnabled} = this.state;
        return (
            <div className="audio-manager">
                <div
                    onClick={this.toggleSounds}
                    className={`sounds ${soundsEnabled ? '' : 'sounds--disabled'}`}>
                </div>
                {sounds.map((sound) => {
                    return <audio key={sound.name}
                                  ref={(element) => {
                                      this[sound.name] = element
                                  }}
                                  src={process.env.PUBLIC_URL + sound.path}>
                    </audio>
                })}
            </div>
        );
    }
}

export default AudioManager;
