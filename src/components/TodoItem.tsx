import React from 'react';

interface Props {
  desc: string;
  done: boolean;
  onToggle(): void;
  onRemove(): void;
}

const TodoItem: React.SFC<Props> = ({desc, done, onToggle, onRemove}) => {
  if (!desc) {
    return null;
  }
  return (
    <li>
      <b
        onClick={onToggle}
        style={{
          textDecoration: done ? 'line-through' : 'none'
        }}
      >
        {desc}
      </b>
      <button style={{all: 'unset', marginLeft: '0.5rem'}} onClick={onRemove}>[지우기]</button>
    </li>
  )
};

export default TodoItem;