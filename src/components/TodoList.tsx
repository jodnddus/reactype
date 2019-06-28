import React from 'react';
import TodoItem from './TodoItem';
import { TodoItemDataParams } from '../store/modules/todos'

interface Props {
  desc: string;
  username: string;
  todoItems: TodoItemDataParams[];
  onCreate(): void;
  onRemove(id: number): void;
  onToggle(id: number): void;
  onChangeDesc(e: any): void;
  onChangeUsername(e: any): void;
}

const TodoList: React.SFC<Props> = ({
  desc, username,
  todoItems, onCreate,
  onRemove, onToggle,
  onChangeDesc, onChangeUsername }) => {
  const todoItemList = todoItems.map(todo => todo ? (
    <div>
      <h1>{todo.username}</h1>
      <TodoItem
        key={todo.id}
        done={todo.done}
        onToggle={() => onToggle(todo.id)}
        onRemove={() => onRemove(todo.id)}
        desc={todo.desc}
      />
    </div>
  ) : null);

  return (
    <div>
      <h1>오늘 뭐하지?</h1>
      <form onSubmit={(e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        onCreate();
      }}>
        이름:
        <input onChange={onChangeUsername} value={username} /> <br />
        할것:<input onChange={onChangeDesc} value={desc} />
        <button type="submit">추가하기</button>
      </form>
      <ul>{todoItemList}</ul>
    </div>
  );
};

export default TodoList;