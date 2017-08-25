import React, {Component} from 'react';
import {getRandomEmployees, randomInRange} from '../employees';

class PicToNameQuiz extends Component {
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
                <h1 className="quiz__header">
                    Who is on picture?
                </h1>
                <div className="staff-photo"
                        style={{backgroundImage: `url("${process.env.PUBLIC_URL +
                        "resources/" +
                        employees[employeeToGuess].pic}.jpg")`}}>
                </div>
                <div className="staff-names">
                    {employees.map((employee, index) => {
                        return <div
                            key={employee.pic}
                            className={`staff-name ${this.guessedClass(index)}`}
                            onClick={() => this.setAnswers(index)}>
                            {employee.name}
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

export default PicToNameQuiz;
