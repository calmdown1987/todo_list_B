import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DateHeaderProps {
  title: string;
  currentDateStr: string;
}

// DateHeader コンポーネント
// ヘッダーに日付を表示し、前の日・次の日・カレンダー画面へ移動するボタンを表示
const DateHeader: React.FC<DateHeaderProps> = ({ 
  title,
  currentDateStr,
}) => {
  const navigate = useNavigate();

  // Dateオブジェクトを受け取り、YYYY-MM-DD形式の文字列に変換する
  const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // 前日のページへ移動
  const goPrevDate = () => {
    const prev = new Date(currentDateStr);
    prev.setDate(prev.getDate() - 1);
    navigate(`/todos/${formatDate(prev)}`);
  }

  // 翌日のページへ移動
  const goNextDate = () => {
    const next = new Date(currentDateStr);
    next.setDate(next.getDate() + 1);
    navigate(`/todos/${formatDate(next)}`);
  }

  // カレンダーページへ移動
  const goToCalender = () => {
    navigate('/');
  }

  return (
    <div>
      <h1 className='heading-date'>{title}</h1>
      <div className="header-btn">
        <button onClick={goPrevDate}>前の日</button>
        <button onClick={goToCalender} className='back-btn'>カレンダーに戻る</button>
        <button onClick={goNextDate}>次の日</button>
      </div>
    </div>
  );
};

export default DateHeader;
