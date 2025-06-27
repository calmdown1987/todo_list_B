import { useState, useMemo } from "react";
import type { Todo } from "../components/Todo";
import type { Filter } from "../components/FilterSelect";

function useTodosFilter(todos: Todo[]) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.progress === 100);
      case "unchecked":
        return todos.filter(
          (todo) => todo.progress !== 100 && !todo.delete_flg
        );
      case "delete":
        return todos.filter((todo) => todo.delete_flg);
      default:
        return todos.filter((todo) => !todo.delete_flg);
    }
  }, [filter, todos]);

  return { filter, setFilter, filteredTodos };
}

export default useTodosFilter;
