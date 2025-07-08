import { useState } from "react";
import type { Todo } from "../components/Todo";

function useTodosHandler(
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  currentDate: string,
  displayDate: Date
){
  const [nextId, setNextId] = useState(1);

  const handleAddTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      title: trimmed,
      date: currentDate,
      id: nextId,
      completed_flg: false,
      delete_flg: false,
      start_date: displayDate,
      complete_date: displayDate,
      progress: ""
    };
    setTodos(prev => [newTodo,...prev]);
    setNextId(id => id + 1);
  };

  const handleTodoField = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  )=> {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? {...todo, [key]: value}: todo))
    );
  };

  const removeDeleted = () => {
    setTodos(prev => prev.filter(todo => !todo.delete_flg));
  };

  return {handleAddTodo, handleTodoField, removeDeleted};
}

export default useTodosHandler;
