import React from "react";

export type Filter = 'all' | 'completed' | 'unchecked' | 'delete';

interface FilterChangeProps {
  currentFilter: Filter;
  onChangeFilter: (newfilter: Filter)=> void;
}

// FilterSelect コンポーネント
// タスクをフィルタリングするセレクトボックスを表示
// filter変更後に親側の更新処理(onChangeFilter)を呼び出す
const FilterSelect: React.FC<FilterChangeProps> = ({
  currentFilter,
  onChangeFilter,
}) => {
  return(
    <select
      value={currentFilter}
      onChange={(e) => onChangeFilter(e.target.value as Filter)}
    >
    <option value="all">すべてのタスク</option>
    <option value="completed">完了したタスク</option>
    <option value="unchecked">現在のタスク</option>
    <option value="delete">ごみ箱</option>
    </select>
  )
}

export default FilterSelect;
