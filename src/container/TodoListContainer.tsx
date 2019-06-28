import React from 'react';
import TodoList from '../components/TodoList';
import { connect } from 'react-redux';
import { StoreState } from '../store/modules';
import { TodoItemDataParams, actionCreators as todosActions } from '../store/modules/todos';
import { bindActionCreators } from 'redux';

interface Props {
  todoItems: TodoItemDataParams[];
  desc: string;
  username: string;
  TodosActions: typeof todosActions;
}

class TodoListContainer extends React.Component<Props> {
  onCreate = (): void => {
    const { TodosActions, desc, username } = this.props;
    //액션 발생
    TodosActions.create(desc, username);
  }
  onRemove = (id: number) => {
    const { TodosActions } = this.props;
    TodosActions.remove(id);
  }
  onToggle = (id: number) => {
    const { TodosActions } = this.props;
    TodosActions.toggle(id);
  }
  onChangeDesc = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    const { TodosActions } = this.props;
    TodosActions.inputDesc(value);
  }
  onChangeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    const { TodosActions } = this.props;
    TodosActions.inputUsername(value);
  }

  render() {
    const { desc, username, todoItems } = this.props;
    const { onCreate, onRemove, onToggle, onChangeDesc, onChangeUsername } = this;
    return (
      <TodoList
        desc={desc}
        username={username}
        todoItems={todoItems}
        onChangeDesc={onChangeDesc}
        onChangeUsername={onChangeUsername}
        onRemove={onRemove}
        onToggle={onToggle}
        onCreate={onCreate}
      />
    );
  }
}

export default connect(
  (todos: StoreState) => ({
    desc: todos.todo.desc,
    username: todos.todo.username,
    todoItems: todos.todo.todoItems
  }),
  (dispatch) => ({
    TodosActions: bindActionCreators(todosActions, dispatch),
  })
)(TodoListContainer);