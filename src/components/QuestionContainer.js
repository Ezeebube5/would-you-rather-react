import React from 'react'
import { connect } from 'react-redux'
import { Well, Glyphicon } from 'react-bootstrap'
import QuestionAnswering from './QuestionAnswering'
import QuestionResults from './QuestionResults';

/** Container component for answering questions or displaying results */
const QuestionContainer = ({
  question,
  author,
  optionOne,
  optionTwo,
  questionDoesNotExist
}) => {

  const renderQuestionNotFound = () => (
    <div className="center">
      <Glyphicon glyph="alert" /> Question not found
    </div>
  );

  const renderQuestionToAnswer = () => (
    <QuestionAnswering
      question={question}
      author={author} />
  );

  const renderQuestionResults = () => (
    <QuestionResults
      question={question}
      author={author}
      optionOne={optionOne}
      optionTwo={optionTwo} />
  )

  const optionToDisplay = () => (
    optionOne || optionTwo ? renderQuestionResults() : renderQuestionToAnswer()
  );

  return (
    <Well>
      {questionDoesNotExist ? renderQuestionNotFound() : optionToDisplay() }
    </Well>
  )
}

function mapStateToProps ({ users, questions, authedUser }, ownProps) {
  const question = questions[ownProps.match.params.questionId]
  if (!question) // bad url
    return { questionDoesNotExist: true }
  const author = users[question.author]
  const optionOne = question.optionOne.votes.includes(authedUser)
  const optionTwo = question.optionTwo.votes.includes(authedUser)

  return {
    loading: false,
    optionOne,
    optionTwo,
    question,
    author
  }
}

export default connect(mapStateToProps)(QuestionContainer)
