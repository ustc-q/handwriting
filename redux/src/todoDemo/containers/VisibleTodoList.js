import { connect } from 'react-redux'
// import { connect } from '../lib/react-redux'
import actions from '../actions'
import TodoList from '../components/TodoList'

const { deleteTodo, modifyTodo, toggleTodo } = actions.todo

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  // state 即 vuex 的总状态，在 reducer/index.js 中定义
  // console.log('mapStateToProps', state);
  // console.log('mapStateToProps', state.todos);
  return {
    // 根据完成状态，筛选数据
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTodo: id => {
      dispatch(deleteTodo(id))
    },
    onModifyTodo: (id, text) => {
      dispatch(modifyTodo(id, text))
    },
    // 切换完成状态
    onToggleTodo: id => {
      dispatch(toggleTodo(id))
    },
  }
}

// connect 高阶组件，将 state 和 dispatch 注入到组件 props 中
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList