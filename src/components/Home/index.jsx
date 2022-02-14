import React, { Component } from 'react'
import { connect } from 'react-redux'
import TabItem from './TabItem';
import QuestionItem from './QuestionItem';
import LoadingBar from 'react-redux-loading'

export const HOME_PATH = '/';

export class Home extends Component {
  state = {
    tabIndex: 0
  }
  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(newIndex) {
    if (this.state.tabIndex !== newIndex) {
      this.setState({
        tabIndex: newIndex
      })
    }
  }
  render() {
    console.log(this.props.questions)
    const questions = this.state.tabIndex === 0 ? this.props.questions.unansweredQuestions : this.props.questions.answeredQuestions;
    if (this.props.loading) {
      return <LoadingBar/>
    }
    return (
      <main className="border-gray-300 border-2 max-w-xl mx-auto my-5 rounded">
          <summary className="border-b-2 border-b-gray-300 flex text-center cursor-pointer">
            <TabItem active={this.state.tabIndex === 0} onClick={() => this.updateIndex(0)}>
              Unanswered Questions
            </TabItem>
            <div style={{
              width: '1px',
              height: 'max',
              backgroundColor: 'rgb(209 213 219)'
            }}></div>
            <TabItem active={this.state.tabIndex === 1} onClick={() => this.updateIndex(1)}>
              Answered Questions
            </TabItem>
          </summary>
          <section className="p-3">
            {Object.entries(questions).map(([id, question]) => (
              <QuestionItem key={id} question={question} user={this.props.users[question.author]} />
            ))}
          </section>
      </main>
    )
  }
}

const mapStateToProps = ({questions, users}) => ({
  questions,
  users,
  loading: Object.keys(questions).length === 0
})

export default connect(mapStateToProps)(Home)
