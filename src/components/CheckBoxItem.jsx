import React, { Component } from 'react'

export default class CheckBoxItem extends Component {
    render() {
        let {question, answers, onChange} = this.props;

        return <div className="can-toggle demo-rebrand-2"> 
            <input
                id={question.name}
                name={question.name}
                type="checkbox"
                checked={answers.has(question.name)}
                onChange={e => onChange(e)}/>
            <label htmlFor={question.name}>
                <div className="can-toggle__switch"
                    data-checked={question.options[0]}
                    data-unchecked={question.options[1]}>
                </div>
            </label>
        </div>
    }
}
