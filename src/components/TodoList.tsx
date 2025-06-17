import React from "react";
import { Todo } from "./Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  openTodoIds: number[];
  onToggleOpen: (id:number) => void;
  onChangeTodoField: <K extends keyof Todo, V extends Todo[K]>(id: number, key: K,value: V) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  openTodoIds,
  onToggleOpen,
  onChangeTodoField,
}) => (
  <ul>
    {todos.map(todo => (
      <TodoItem
       key={todo.id}
       todo={todo}
       isOpen ={openTodoIds.includes(todo.id)}
       onToggleOpen={onToggleOpen}
       onChangeTodoField={onChangeTodoField}
      />
    ))}
  </ul>
);

export default TodoList;
