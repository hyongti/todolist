import React, { useReducer } from "react";

interface todoType {
  id: number;
  text: string;
  done: boolean;
}

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true
  },
  {
    id: 3,
    text: "Context 만들기",
    done: true
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: true
  }
];

function todoReducer(state: todoType[], action: any) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              done: !todo.done
            }
          : todo
      );
    case "REMOVE":
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

interface TodoProviderProps {
  children: JSX.Element;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  return children;
}
