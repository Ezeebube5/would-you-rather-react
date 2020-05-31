import authedUser from './authedUser'
import logger from './logger'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  logger,
  authedUser
)
