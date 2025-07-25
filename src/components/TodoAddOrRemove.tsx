import React from "react";
import TodoForm from "./TodoForm";
import EmptyTrashButton from "./EmptyTrashButton";
import type { Filter } from "./FilterSelect"

interface TodoAddOrRemoveProps {
  filter: Filter;
  onClickAdd: (title: string) => void;
  onClickEmpty: () => void;
}
// TodoAddOrRemove コンポーネント
// filterの状態によって新規追加フォームもしくは物理削除ボタンを表示
const TodoAddOrRemove: React.FC<TodoAddOrRemoveProps> = ({
  filter,
  onClickAdd,
  onClickEmpty,
}) => {
  return (
    <div>
      {/* filterの値がdelete(「ゴミ箱」)のときは EmptyTrashButton 
          それ以外（未完了タスク）のときは TodoForm をレンダリング */}
      {filter === 'delete' ? (
        <EmptyTrashButton onClickEmpty={onClickEmpty} />
      ) : (
        filter !== 'completed' && <TodoForm onClickAdd={onClickAdd} />
      )}
    </div>
  );
}

export default TodoAddOrRemove;
