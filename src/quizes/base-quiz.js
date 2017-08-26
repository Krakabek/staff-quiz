import {Component} from 'react';
import {getRandomEmployees, randomInRange} from '../employees';

const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
    space: 32
};

const isArrow = (keycode) => {
    return keycode === keys.left
        || keycode === keys.up
        || keycode === keys.right
        || keycode === keys.down
};

const isSubmit = (keycode) => {
    return keycode === keys.space
        || keycode === keys.enter
};

const isIncrement = (keycode) => {
    return keycode === keys.right
        || keycode === keys.down
};

const isDecrement = (keycode) => {
    return keycode === keys.left
        || keycode === keys.up
};

class BaseQuizComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: getRandomEmployees(3),
            employeeToGuess: randomInRange(3),
            guessedIndex: null,
            currentFocusedOption: null,
            nextBtnIsFocused: false
        };
        this.setAnswers = this.setAnswers.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.keyRecognizer = this.keyRecognizer.bind(this);
    }

    componentWillMount() {
        window.addEventListener('keydown', this.keyRecognizer);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyRecognizer);
    }

    keyRecognizer(event) {
        const {keyCode} = event;
        const {nextBtnIsFocused, currentFocusedOption} = this.state;
        if (!nextBtnIsFocused && isArrow(keyCode)) {
            this.setState({
                currentFocusedOption: this.incrementCurrentFocusedOption(currentFocusedOption, keyCode)
            })
        }
        if (isSubmit(keyCode)) {
            if (nextBtnIsFocused) {
                this.shuffle();
            } else if (currentFocusedOption !== null) {
                this.setAnswers(currentFocusedOption);
            }
        }
    }

    incrementCurrentFocusedOption(previousPosition, keyCode) {
        if (isIncrement(keyCode)) {
            if (previousPosition === null || previousPosition === this.state.employees.length - 1) {
                return 0
            } else {
                return previousPosition + 1;
            }
        }
        if (isDecrement(keyCode)) {
            if (previousPosition === null) {
                return 0
            }
            if (previousPosition === 0) {
                return this.state.employees.length - 1
            }
            return previousPosition - 1;
        }
    }

    focusClassName(index) {
        if (index === this.state.currentFocusedOption) {
            return "focused";
        }
    }

    shuffle() {
        this.setState({
            employees: getRandomEmployees(3),
            employeeToGuess: randomInRange(3),
            guessedIndex: null,
            nextBtnIsFocused: false
        });
    }

    setAnswers(index) {
        if (this.state.guessedIndex === null) {
            this.props.guessHandler(this.state.employeeToGuess === index);
            this.setState({
                guessedIndex: index,
                currentFocusedOption: null,
                nextBtnIsFocused: true
            });
        }
    }

    guessedClass(index) {
        if (this.state.guessedIndex === null) {
            return '';
        }
        if (this.state.employeeToGuess === index) {
            return 'correct';
        } else if (this.state.guessedIndex === index) {
            return 'incorrect';
        }
        return '';
    }

}

export default BaseQuizComponent;
