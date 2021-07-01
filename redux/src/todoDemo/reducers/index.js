// import { combineReducers } from 'redux'
import { combineReducers } from '../lib/redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
})

export default todoApp