// types

export interface TodoItemDataParams {
  id: number;
  username: string;
  desc: string;
  done: boolean;
}

export interface TodoState {
  todoItems: TodoItemDataParams[];
  desc: string;
  username: string;
}

export const CREATE = 'todo/CREATE';
export const REMOVE = 'todo/REMOVE';
export const TOGGLE = 'todo/TOGGLE';
export const INPUT_DESC = 'todo/INPUT_DESC';
export const INPUT_USERNAME = 'todo/INPUT_USERNAME'

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

interface InputDescAction {
  type: typeof INPUT_DESC;
  meta: {
    desc: string;
  };
}

interface InputUsernameAction {
  type: typeof INPUT_USERNAME;
  meta: {
    username: string;
  };
}

export type TodoActionTypes = | CreateAction | RemoveAction | ToggleAction | InputDescAction | InputUsernameAction;

// actions
let autoId = 0;

function create(desc: string, username: string) {
  return {
    type: CREATE,
    payload: {
      id: autoId++,
      username: username,
      desc: desc,
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

function inputDesc(desc: string) {
  return {
    type: INPUT_DESC,
    meta: {
      desc
    }
  };
}

function inputUsername(username: string) {
  return {
    type: INPUT_USERNAME,
    meta: {
      username
    }
  };
}

export const actionCreators = {
  create,
  remove,
  toggle,
  inputDesc,
  inputUsername
};

// reducers

const initialState: TodoState = {
  todoItems: [],
  desc: '',
  username: '',
};

export function todoReducer(state = initialState, action: TodoActionTypes): TodoState {
  switch (action.type) {
    case CREATE:
      return {
        desc: "",
        username: "",
        todoItems: [ ...state.todoItems, action.payload ]
      };
    case REMOVE:
      return {
        ...state,
        todoItems: state.todoItems.filter(todo => todo.id !== action.meta.id)
      };
    case TOGGLE:
      return {
        ...state,
        todoItems: state.todoItems.map(todo => {
          if (todo.id === action.meta.id) {
            todo.done = !todo.done;
          }
          return todo;
        })
      };
    case INPUT_DESC:
      return {
        ...state,
        desc: action.meta.desc
      };
    case INPUT_USERNAME:
      return {
        ...state,
        username: action.meta.username
      }
    default:
      return state
  }
}