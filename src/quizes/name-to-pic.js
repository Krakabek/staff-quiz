import React, {Component} from 'react';
import {getRandomEmployees, randomInRange} from '../employees';

class NameToPicQuiz extends Component {
    constructor() {
        super();
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

    render() {
        const {employees, employeeToGuess, guessedIndex} = this.state;
        return (
            <div className="quiz quiz--p-t-n">
                <div className="staff-photo">
                    <div>{employees[employeeToGuess].name}</div>
                </div>
                <div className="staff-names">
                    {employees.map((employee, index) => {
                        return <div
                            key={employee.pic}
                            className={this.guessedClass(index)}
                            onClick={() => this.setAnswers(index)}>
                            {employee.pic}.jpg
                        </div>
                    })}
                </div>
                {guessedIndex !== null
                    ? <div className="proceed" onClick={() => this.shuffle()}>
                        Next
                    </div>
                    : null}
            </div>
        );
    }
}

export default NameToPicQuiz;
