import React from "react";

interface TodoSelectProps {
  progress: number | "";
  onChangeProgress: (newProgress: number | "") => void;
}

const TodoSelect: React.FC<TodoSelectProps> = ({
  progress,
  onChangeProgress,
}) => {
  return (
    <div className="select-wrapper">
      <label className="select-label-progress">進捗率</label>
      <select
        value={progress}
        onChange={(e) => {
          const v = e.target.value === "" ? "" : Number(e.target.value);
          onChangeProgress(v);
        }}
        className="select-progress"
      >
        <option value="" disabled hidden />
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
