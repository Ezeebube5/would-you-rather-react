import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  _saveQuestion,
  _saveQuestionAnswer } from '../utils/_DATA'
import {
  saveUserQuestion,
  removeUserQuestion,
  saveUserAnswer,
  removeUserAnswer,
  fetchUsers } from './users'
import {
  saveQuestion,
  removeQuestion,
  saveQuestionVote,
  removeQuestionVote,
  fetchQuestions } from './questions'


  // After the user asks a question, the action has to:
  //  - Save the question via an API call
  //  - update the questions portion of state
  //  - update the users portion of state
 
   export function handleSaveQuestion (author, optionOneText, optionTwoText) {
  const question = {
    author: author,
    optionOneText: optionOneText,
    optionTwoText: optionTwoText
  }
  return (dispatch) => {
    return _saveQuestion(question).then((question) => {
      dispatch(saveQuestion(question))
      dispatch(saveUserQuestion(question.author, question.id))
    }).catch(() => {
      dispatch(removeQuestion(question))
      dispatch(removeUserQuestion(question.author, question.id))
      alert('Failed to save your question. Please try again.')
    })
  }
}


// After user answers a question, the action has to:
//  - Save the answer via an API call
//  - Update the questions portion of state
//  - Update the users portion of state
 
export function handleVote (authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(saveQuestionVote(authedUser, qid, answer))
    dispatch(saveUserAnswer(authedUser, qid, answer))
    return _saveQuestionAnswer({
      authedUser: authedUser,
      qid: qid,
      answer: answer
    }).catch(() => {
      dispatch(removeQuestionVote(authedUser, qid, answer))
      dispatch(removeUserAnswer(authedUser, qid, answer))
      alert('Failed to save your vote. Please try again.')
    })
  }
}

export function fetchInitialData () {
  return (dispatch) => Promise.all([
    dispatch(showLoading()),
    dispatch(fetchUsers()),
    dispatch(fetchQuestions())
  ]).then(() => {
    dispatch(hideLoading())
  })
}
