import { useState } from "react";
import type { Todo } from "../components/Todo";
import type { Filter } from "../components/FilterSelect";

// filterの状態と更新関数を内部で管理
// 現在のfilterで絞り込んだタスク一覧を返す
function useTodosFilter(todos: Todo[]) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = () => {
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
  };

  return { filter, setFilter, filteredTodos };
}

export default useTodosFilter;
