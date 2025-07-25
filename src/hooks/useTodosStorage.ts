import { useState, useEffect } from "react";
import localforage from "localforage";
import type { Todo } from "../components/Todo";

// 詳細画面の日付(currentDate)のタスクを
// ストレージから取得、タスクの更新時に保存する
function useTodosStorage(currentDate: string) {
  const storageKey = `todos-${currentDate}`
  const [todos, setTodos] = useState<Todo[]>([]);

  // 取得
  useEffect(() => {
    localforage.getItem<Todo[]>(storageKey).then(data => {
      setTodos(data ?? []);
    });
  },[storageKey]);

  // 保存
  useEffect(() => {
    localforage.setItem(storageKey,todos);
  },[storageKey, todos]);

  return {todos, setTodos};
}

export default useTodosStorage;
