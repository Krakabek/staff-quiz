import React, {Component} from 'react';
import 'react-switch-button/dist/react-switch-button.css';
import './App.css';
import SwitchButton from 'react-switch-button';
import PicToNameQuiz from "./quizes/pic-to-name";
import NameToPicQuiz from "./quizes/name-to-pic";

class App extends Component {
    constructor() {
        super();
        this.state = {
            picToName: true,
            guessedInARow: 0
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.guessHandler = this.guessHandler.bind(this);
    }

    guessHandler(status) {
        console.log(status);
        let newRow = 0;
        if (status) {
            newRow = this.state.guessedInARow + 1;
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
        if (guessedInARow < 3) {
            return "simple";
        }
        if (guessedInARow < 4) {
            return "rampage";
        }
        if (guessedInARow < 5) {
            return "spree";
        }
    }

    render() {
        const {picToName, guessedInARow} = this.state;
        return (
            <div className="App">
                <SwitchButton name="switch-8" mode="select" labelRight="Name to picture"
                              label="Picture to name" onChange={this.changeHandler}/>
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
