import React, { Component } from 'react'
import { connect } from 'react-redux'
import TabItem from '../components/home/TabItem';
import QuestionItem from '../components/QuestionItem';
import LoadingBar from 'react-redux-loading';
import { getQuestions, receiveQuestions } from '../actions/questions';

export const HOME_PATH = '/';

export class Home extends Component {
  state = {
    tabIndex: 0,
    loading: true
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
  componentDidMount() {
    this.props.cleanQuestions(this.props.authedUser)
    this.props.getQuestions(this.props.authedUser).then(_ => this.setState({
      loading: false
    }))
  }
  render() {
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
            {Object.keys(questions).length > 0 ? Object.entries(questions).sort(([a, b], [c, d]) => (
              d.timestamp - b.timestamp
            )).map(([id, question]) => (
              <QuestionItem key={id} question={question} user={this.props.users[question.author]} answered={this.state.tabIndex === 1} />
            )) : this.state.loading ? "Updating..." : "No questions left"}
          </section>
      </main>
    )
  }
}

const mapStateToProps = ({questions, users, authedUser}) => ({
  questions,
  users,
  authedUser,
  loading: Object.keys(questions).length === 0 || Object.keys(users).length === 0
})

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: (authedUser) => dispatch(getQuestions(authedUser)),
    cleanQuestions: (authedUser) => dispatch(receiveQuestions({}, authedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
