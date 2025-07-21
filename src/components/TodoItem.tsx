import React from "react";
import { Todo } from "./Todo";
import TodoSelect from "./TodoSelect";
import DateRangePicker from "./DateRangePicker";
import TitleEditorField from "./TitleEditorField";
import DeleteButton from "./DeleteButton";
import EditorButton from "./EditorButton";
import AccordionPanel from "./AccordionPanel";

interface TodoItemProps {
  todo: Todo;
  isOpen: boolean;
  onToggleOpen: (id: number) => void;
  onChangeTodoField: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
}

// TodoItem コンポーネント
// 単一のTodoを受け取り、編集・削除などのUIをまとめてレンダリングする
const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isOpen,
  onToggleOpen,
  onChangeTodoField,
}) => {
  return (
    <>
      <li>
        {/* 進捗率プルダウン */}
        <TodoSelect
          progress={todo.progress}
          onChangeProgress={(newProgress) =>
            onChangeTodoField(todo.id, "progress", newProgress)
          }
        />
        {/* 開始日・完了予定日ピッカー */}
        <DateRangePicker
          start_date={todo.start_date}
          complete_date={todo.complete_date}
          onChangeStartDate={(start_date) =>
            onChangeTodoField(todo.id, "start_date", start_date)
          }
          onChangeCompleteDate={(complete_date) =>
            onChangeTodoField(todo.id, "complete_date", complete_date)
          }
        />
        {/* タイトル編集フォーム */}
        <TitleEditorField
          title={todo.title}
          progress={todo.progress}  
          onEditTitle={(newTitle) =>
            onChangeTodoField(todo.id, "title", newTitle)
          }
        />
        {/* 編集ボタン（アコーディオン開閉）*/}
        <EditorButton
          todoId={todo.id}
          isOpen={isOpen}
          onToggleOpen={onToggleOpen}
        />
        {/* 削除　復元ボタン */}
        <DeleteButton
          isDeleted={todo.delete_flg}
          onToggleDeleted={() => 
            onChangeTodoField(todo.id, "delete_flg", !todo.delete_flg)
          }
        />
      </li>

      {/* アコーディオン詳細 */}
      <AccordionPanel
        isOpen={isOpen}
      />

    </>
  );
};

export default TodoItem;
