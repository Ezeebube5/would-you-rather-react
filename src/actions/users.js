import { _getUsers } from '../utils/_DATA'

export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const REMOVE_USER_ANSWER = 'REMOVE_USER_ANSWER'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'
export const DELETE_USER_QUESTION = 'DELETE_USER_QUESTION'
export const UPDATE_USERS = 'UPDATE_USERS'

/* save a user's question*/
export function saveUserQuestion (user, qid) {
  return {
    type: SAVE_USER_QUESTION,
    user,
    qid,
  }
}

/* remove a user's question */

export function removeUserQuestion (user, qid) {
  return {
    type: DELETE_USER_QUESTION,
    user,
    qid,
  }
}

/* save a user's answer */

export function saveUserAnswer (user, qid, answer) {
  return {
    type: SAVE_USER_ANSWER,
    user,
    qid,
    answer
  }
}

/* remove a user's answer */

export function removeUserAnswer (user, qid, answer) {
  return {
    type: REMOVE_USER_ANSWER,
    user,
    qid,
    answer
  }
}

/* update state after fetching data */
export function updateUsers (users) {
  return {
    type: UPDATE_USERS,
    users,
  }
}

/* async call to fetch all users */
export function fetchUsers () {
  return (dispatch) => {
    return _getUsers().then((users) => {
      dispatch(updateUsers(users))
    })
  }
}
