import React from 'react';
import BaseQuizComponent from "./base-quiz";

class NameToPicQuiz extends BaseQuizComponent {

    render() {
        const {employees, employeeToGuess, guessedIndex} = this.state;
        return (
            <div className="quiz quiz--n-t-p">
                <h1 className="quiz__header">
                    Who is {employees[employeeToGuess].name}?
                </h1>
                <div className="staff-name">
                    <div></div>
                </div>
                <div className="staff-pics">
                    {employees.map((employee, index) => {
                        return <div
                            key={employee.pic}
                            style={{
                                backgroundImage: `url("${process.env.PUBLIC_URL +
                                "resources/" +
                                employee.pic}.jpg")`
                            }}
                            className={`staff-pic ${this.guessedClass(index)}`}
                            onClick={() => this.setAnswers(index)}>
                            {employee.pic}
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
