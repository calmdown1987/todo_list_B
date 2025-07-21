import React from "react";

interface TodoSelectProps {
  progress: number | "";
  onChangeProgress: (newProgress: number | "") => void;
}

// TodoSelect コンポーネント
// タスクの進捗率を0~100%から選択するセレクトボックスを表示
// 選択後に親側の更新処理(onChangeProgress)を呼び出す
const TodoSelect: React.FC<TodoSelectProps> = ({
  progress,
  onChangeProgress,
}) => {
  return (
    <div className="select-wrapper">
      <label className="select-label-progress">進捗率</label>
      <select
        className="select-progress"
        value={progress}
        onChange={(e) => {
          const v = e.target.value === "" ? "" : Number(e.target.value);
          onChangeProgress(v);
        }}
      >
        <option value="" disabled hidden />
        {/* 0~100%を10%刻みでvalueにセット */}
        {Array.from({ length: 11 }, (_, i) => i * 10).map((v) => (
          <option key={v} value={v}>
            {v}%
          </option>
        ))}
      </select>
    </div>
  );
};

export default TodoSelect;
