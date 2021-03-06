import {
  UPDATE_USERS,
  SAVE_USER_QUESTION,
  DELETE_USER_QUESTION,
  SAVE_USER_ANSWER,
  REMOVE_USER_ANSWER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case SAVE_USER_QUESTION :
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          questions: [...state[action.user].questions, action.qid]
        }
      }
    case DELETE_USER_QUESTION :
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          questions: state[action.user].questions.filter((question) => {
            return question !== action.qid
          })
        }
      }
    case SAVE_USER_ANSWER :
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          answers : {
            ...state[action.user].answers,
            [action.qid] : action.answer
          }
        }
      }
    case REMOVE_USER_ANSWER :
      const { [action.qid]: value, ...newAnswers} = state[action.user].answers
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          answers : newAnswers
        }
      }
    case UPDATE_USERS :
      return {
        ...state,
        ...action.users
      }
    default :
      return state
  }
}
