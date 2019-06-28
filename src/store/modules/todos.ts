// types

export interface TodoItemDataParams {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  todoItems: TodoItemDataParams[];
  input: string;
}

export const CREATE = 'todo/CREATE';
export const REMOVE = 'todo/REMOVE';
export const TOGGLE = 'todo/TOGGLE';
export const CHANGE_INPUT = 'todo/CHANGE_INPUT';

interface CreateAction {
  type: typeof CREATE;
  payload: TodoItemDataParams;
}

interface RemoveAction {
  type: typeof REMOVE;
  meta: {
    id: number; 
  };
}

interface ToggleAction {
  type: typeof TOGGLE;
  meta: {
    id: number;
  };
}

interface ChangeInputAction {
  type: typeof CHANGE_INPUT;
  meta: {
    input: string;
  };
}

export type TodoActionTypes = | CreateAction | RemoveAction | ToggleAction | ChangeInputAction;

// actions
let autoId = 0;

function create(text: string) {
  return {
    type: CREATE,
    payload: {
      id: autoId++,
      text: text,
      done: false
    }
  };
}

function remove(id: number) {
  return {
    type: REMOVE,
    meta: {
      id
    }
  };
}

function toggle(id: number) {
  return {
    type: TOGGLE,
    meta: {
      id
    }
  };
}

function changeInput(input: string) {
  return {
    type: CHANGE_INPUT,
    meta: {
      input
    }
  };
}

export const actionCreators = {
  create,
  remove,
  toggle,
  changeInput
};