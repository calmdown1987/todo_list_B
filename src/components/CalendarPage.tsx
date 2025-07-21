import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import useMonthTodos from '../hooks/useMonthTodos';

// CalendarPage コンポーネント
// カレンダーページに当月のタスクを表示
// 日付をクリックすると該当日のタスク詳細ページへ移動する
const CalendarPage: React.FC = () => {

  // useMonthTodosからFullCalendar用のデータとハンドラを取得
  const {
    events,            // 表示中の年月のタスクをFullCalenderに渡す配列
    handleDatesSet,    // 表示中の年月が変更された場合、表示する年月を更新するハンドラ 
    handleDateClick,   // カレンダーの日付をクリック時、該当日の詳細ページに移動するハンドラ
  } = useMonthTodos();

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'today,prev,next',
      }}
      events={events}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      height="1200px"
    />
  );
};

export default CalendarPage;
