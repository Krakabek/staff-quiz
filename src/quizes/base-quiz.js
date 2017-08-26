import {Component} from 'react';
import {getRandomEmployees, randomInRange} from '../employees';

class BaseQuizComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: getRandomEmployees(3),
            employeeToGuess: randomInRange(3),
            guessedIndex: null
        };
        this.setAnswers = this.setAnswers.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }

    shuffle() {
        this.setState({
            employees: getRandomEmployees(3),
            employeeToGuess: randomInRange(3),
            guessedIndex: null
        });
    }

    setAnswers(index) {
        if (this.state.guessedIndex === null) {
            this.props.guessHandler(this.state.employeeToGuess === index);
            this.setState({
                guessedIndex: index
            });
        }
    }

    guessedClass(index) {
        if (this.state.guessedIndex === null) {
            return "";
        }
        if (this.state.employeeToGuess === index) {
            return "correct";
        } else if (this.state.guessedIndex === index) {
            return "incorrect";
        }
        return "";
    }
}

export default BaseQuizComponent;
