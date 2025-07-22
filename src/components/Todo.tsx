import React from 'react';
import { useParams } from 'react-router-dom';
import DateHeader from './DateHeader';
import TodoForm from './TodoForm';
import FilterSelect, {Filter} from './FilterSelect';
import EmptyTrashButton from './EmptyTrashButton';
import TodoList from './TodoList';
import useTodos from '../hooks/useTodos';

export type Todo = {
  title: string;
  date: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean;
  start_date: Date | null;
  complete_date: Date | null;
  progress: number | "";
};

// Todo コンポーネント
// カレンダーページでクリックされた日付のTodo詳細画面を表示する
// ヘッダーまわり、タスクの追加・編集・削除ボタンなどをレンダリングする
const Todos: React.FC = () => {
  // URLパラメーターから日付を取得
  const { dateStr } = useParams<{ dateStr: string }>();

// useTodosから日付データ・タスク一覧・フィルタ状態・操作ハンドラを取得
  const {
    formattedDate,   // ヘッダーに表示する日付文字列
    currentDate,     // 現在、表示中の日付文字列
    filteredTodos,   // フィルタ済みのタスク一覧
    filter,          // フィルターの状態変数
    setFilter,       // フィルターの更新関数
    handleAddTodo,   // タスクを新規追加する関数
    handleTodoField, // フィールドを更新する関数
    removeDeleted,   // 削除・復元を切り替える関数
    openIds,         // 開いているアコーディオンのID一覧  
    toggle,          // アコーディオンの開閉を切り替える関数
  } = useTodos(dateStr);

  return (
    <div className="todo-wrapper">
      {/* 見出しの日付表示・前日・翌日・カレンダーページへの移動ボタン */}
      <DateHeader
        title={formattedDate}
        currentDateStr={currentDate}
      />
      {/* フィルターのプルダウン */}
      <FilterSelect
        currentFilter={filter}
        onChangeFilter={setFilter}
      />
      {/* filter==='delete' のときはゴミ箱用の削除ボタンを、
          そうでなくかつ未完了タスクなら追加フォームを表示  */}
      {filter === 'delete' ? (
        <EmptyTrashButton onClickEmpty={removeDeleted} />
      ) : (
        filter !== 'completed' && <TodoForm onClickAdd={handleAddTodo} />
      )}
      <ul>
        {/* 登録されたタスクを一覧表示する */}
        <TodoList
          todos={filteredTodos()}
          openTodoIds={openIds}
          onToggleOpen={toggle}
          onChangeTodoField={handleTodoField}
        />
      </ul>
    </div>
  );
};

export default Todos;
