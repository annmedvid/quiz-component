import React, { Component } from 'react'
import lodash from 'lodash'

import CheckBoxItem from './components/CheckBoxItem'

const data = [
    {
        name: 'temperature',
        options: ['hot', 'cold'],
        answer: 0
    },
    {
        name: 'option',
        options: ['option 1', 'option 2'],
        answer: 1
    },
    {
        name: 'isActive',
        options: ['active', 'not active'],
        answer: 0
    }   
]

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataAnswers: [],
            userAnswers: new Set(),
            isPassed: false
        }
    }

    componentDidMount = () => {
        let initialAnswers = new Set()
        data.forEach(item => initialAnswers.add(item.name))

        this.setState({
            dataAnswers: data,
            userAnswers: initialAnswers
        })
    }

    onCheckOption = (e) => {
        let newUserAnswers = this.state.userAnswers
        let name = e.target.name

        if (newUserAnswers.has(name)) {
            newUserAnswers.delete(name)
        } else {
            newUserAnswers.add(name)
        }

        this.setState({userAnswers: newUserAnswers})
        this.checkAnswers()
    }

    checkAnswers = () => {
        let {dataAnswers, userAnswers} = this.state;
        let vantedAnswers = dataAnswers.filter(item => item.answer).map(item => item.name).sort()
        let receivedAnswers = [...userAnswers].sort()
        let result = lodash.isEqual(vantedAnswers, receivedAnswers)

        this.setState({isPassed: result})
    }

    render() {
        let {dataAnswers, userAnswers, isPassed} = this.state;

        let questions = dataAnswers.map(item => <CheckBoxItem
            key={`${item.name}-${item.answer}`}
            question={item}
            answers={userAnswers}
            onChange={this.onCheckOption}/>)

        return (
            <div className="App">
                <div className="questions">
                    {questions}
                </div>
                <div className="result">
                    {isPassed ? 'The answer is correct!' : 'The answer is incorrect :('}
                </div>
            </div>
        );
    }
}
