import React, {
  createContext,
  MutableRefObject,
  useContext,
  useReducer,
  useRef
} from "react";

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

const TodoStateContext = createContext<todoType[] | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<any> | null>(null);
const TodoNextIdContext = createContext<MutableRefObject<number> | null>(null);

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 이렇개 사용하면 조금 더 사용성이 편합니다. 하지만, 취향에 따라 useContext 를 컴포넌트에서 바로 사용해도 상관은 없습니다.

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
