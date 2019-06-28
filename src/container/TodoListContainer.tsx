import React from 'react';
import TodoList from '../components/TodoList';
import { connect } from 'react-redux';
import { StoreState } from '../store/modules';
import { TodoItemDataParams, actionCreators as todosActions } from '../store/modules/todos';
import { bindActionCreators } from 'redux';

interface Props {
  todoItems: TodoItemDataParams[];
  input: string;
  TodosActions: typeof todosActions;
}

class TodoListContainer extends React.Component<Props> {
  onCreate = (): void => {
    const { TodosActions, input } = this.props;
    //액션 발생
    TodosActions.create(input);
  }
  onRemove = (id: number) => {
    const { TodosActions } = this.props;
    TodosActions.remove(id);
  }
  onToggle = (id: number) => {
    const { TodosActions } = this.props;
    TodosActions.toggle(id);
  }
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    const { TodosActions } = this.props;
    TodosActions.changeInput(value);
  }

  render() {
    const { input, todoItems } = this.props;
    const { onCreate, onRemove, onToggle, onChange } = this;
    return (
      <TodoList
        input={input}
        todoItems={todoItems}
        onChange={onChange}
        onRemove={onRemove}
        onToggle={onToggle}
        onCreate={onCreate}
      />
    );
  }
}

export default connect(
  (todos: StoreState) => ({
    input: todos.todo.input,
    todoItems: todos.todo.todoItems
  }),
  (dispatch) => ({
    TodosActions: bindActionCreators(todosActions, dispatch),
  })
)(TodoListContainer);