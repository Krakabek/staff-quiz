import React, {Component} from 'react';
import 'react-switch-button/dist/react-switch-button.css';
import './App.css';
import SwitchButton from 'react-switch-button';
import PicToNameQuiz from "./quizes/pic-to-name";
import NameToPicQuiz from "./quizes/name-to-pic";
import AudioManager from "./audio/audio";

class App extends Component {
    constructor() {
        super();
        this.state = {
            picToName: true,
            guessedInARow: 0
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.guessHandler = this.guessHandler.bind(this);
        this.soundBank = {
            success: () => {
            },
            fail: () => {
            }
        };
    }

    guessHandler(status) {
        const {guessedInARow} = this.state;
        let newRow = 0;
        if (status) {
            this.soundBank.success();
            newRow = guessedInARow + 1;
        } else {
            this.soundBank.fail();
        }
        this.setState({
            guessedInARow: newRow
        });
    }

    changeHandler() {
        this.setState({
            picToName: !this.state.picToName
        });
    }

    rowDecorationClass() {
        const {guessedInARow} = this.state;
        if (!guessedInARow) return;
        if (guessedInARow > 9) {
            return 'spree';
        }
        if (guessedInARow > 4) {
            return 'rampage';
        }
        return 'simple';
    }

    render() {
        const {picToName, guessedInARow} = this.state;
        return (
            <div className="App">
                <AudioManager player={this.soundBank}/>
                <SwitchButton name="switch-8"
                              mode="select"
                              labelRight="Name to picture"
                              label="Picture to name"
                              onChange={this.changeHandler}/>
                <div className="row-counter">
                    {guessedInARow > 1
                        ? <div className={`row-decoration row-decoration--${this.rowDecorationClass()}`}>
                            {guessedInARow} in a row!
                        </div>
                        : null}
                </div>
                <div className="quiz-wrapper">
                    {picToName
                        ? <div>
                            <PicToNameQuiz guessHandler={this.guessHandler}/>
                        </div>
                        : <div>
                            <NameToPicQuiz guessHandler={this.guessHandler}/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
