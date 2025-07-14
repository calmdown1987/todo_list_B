import React from "react";
import MyDatePicker from "./Date";

interface DateRangePickerProps {
  start_date: Date | null;
  complete_date: Date | null;
  onChangeStartDate: (start_date: Date | null) => void;
  onChangeCompleteDate: (complte_date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  start_date,
  complete_date,
  onChangeStartDate,
  onChangeCompleteDate,
}) => {
  return (
    <div className="todo-data-wrapper">
      <div className="todo-start-date">
        <label className="start-date-label">開始日</label>
      </div>
      <MyDatePicker
        selected={start_date}
        onChange={onChangeStartDate}
        className="start-date-input"
      />
      <div className="todo-end-date">
        <label className="end-date-label">完了予定日</label>
      </div>
      <MyDatePicker
        selected={complete_date}
        onChange={onChangeCompleteDate}
        className="end-date-input"
      />
    </div>
  );
};

export default DateRangePicker;
