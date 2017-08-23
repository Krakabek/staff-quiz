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
            picToName: true
        };
        this.changeHandler = this.changeHandler.bind(this);

    }

    changeHandler() {
        this.setState({
            picToName: !this.state.picToName
        });
    }

    render() {
        const {picToName} = this.state;
        return (
            <div className="App">
                <SwitchButton name="switch-8" mode="select" labelRight="Name to picture"
                              label="Picture to name" onChange={this.changeHandler}/>
                <div className="quiz-wrapper">
                    {picToName
                        ? <div>
                            <PicToNameQuiz/>
                        </div>
                        : <div>
                            <NameToPicQuiz/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
