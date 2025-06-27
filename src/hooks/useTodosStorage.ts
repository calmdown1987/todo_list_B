import { useState, useEffect } from "react";
import localforage from "localforage";
import type { Todo } from "../components/Todo";

function useTodosStorage(currentDate: string) {
  const storagekey = `todos-${currentDate}`
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    localforage.getItem<Todo[]>(storagekey).then(data => {
      setTodos(data ?? []);
    });
  },[storagekey]);

  useEffect(() => {
    localforage.setItem(storagekey,todos);
  },[storagekey, todos]);

  return {todos, setTodos};
}

export default useTodosStorage;
