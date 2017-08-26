import React from 'react';
import BaseQuizComponent from "./base-quiz";

class PicToNameQuiz extends BaseQuizComponent {

    render() {
        const {employees, employeeToGuess, guessedIndex, nextBtnIsFocused} = this.state;
        return (
            <div className="quiz quiz--p-t-n">
                <h1 className="quiz__header">
                    Who is on picture?
                </h1>
                <div className="staff-photo"
                     style={{
                         backgroundImage: `url("${process.env.PUBLIC_URL +
                         "resources/" +
                         employees[employeeToGuess].pic}.jpg")`
                     }}>
                    {employees[employeeToGuess].pic}
                </div>
                <div className="staff-names">
                    {employees.map((employee, index) => {
                        return <div
                            key={employee.pic}
                            className={`staff-name ${this.focusClassName(index)} ${this.guessedClass(index)}`}
                            onClick={() => this.setAnswers(index)}>
                            {employee.name}
                        </div>
                    })}
                </div>
                {guessedIndex !== null
                    ? <a href={void(0)} className={`proceed ${nextBtnIsFocused?'focused':''}`} tabIndex="0"
                         onClick={() => this.shuffle()}>
                        Next
                    </a>
                    : null}
            </div>
        );
    }
}

export default PicToNameQuiz;
