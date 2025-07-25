import useTodoStorage from "./useTodosStorage";
import useTodoFilter from "./useTodosFilter";
import useTodoHandler from "./useTodosHandler";
import useToggle from "./useToggle";

// 複数のカスタムフックから(useTodoStorage, useTodoFilter, useTodoHandler, useToggle)
// 日付・フィルタリング・タスク一覧・タスクに関する操作ハンドラをまとめて取得する上位カスタムフック
function useTodos(dateStr?: string) {
  // フォーマット前の日付オブジェクト
  const displayDate = dateStr ? new Date(dateStr) : new Date();
  // currentDate ストレージからタスクを取得するための日付オブジェクト
  const currentDate = dateStr ?? new Date().toISOString().slice(0,10);
  // formattedDate 見出しに使用する日付文字列
  const formattedDate = `${displayDate.getFullYear()}年${displayDate.getMonth() + 1}月${displayDate.getDate()}日`;

  const { todos, setTodos } = useTodoStorage(currentDate);
  const { filter, setFilter, filteredTodos } = useTodoFilter(todos);
  const { handleAddTodo, handleTodoField, removeDeleted } = useTodoHandler(
    setTodos,
    currentDate,
    displayDate
  );

  const { openIds, toggle } = useToggle();

  return {
    formattedDate,   // ヘッダーに表示する日付文字列
    currentDate,     // 現在、表示中の日付文字列
    filteredTodos,   // フィルタ済みのタスク一覧
    filter,          // フィルターの状態変数
    setFilter,       // フィルターの更新関数
    handleAddTodo,   // タスクを新規追加する関数
    handleTodoField, // フィールドを更新する関数
    removeDeleted,   // 削除・復元を切り替える関数
    openIds,         // 開いているアコーディオンのID一覧  
    toggle           // アコーディオンの開閉を切り替える関数
  };
}

export default useTodos;
