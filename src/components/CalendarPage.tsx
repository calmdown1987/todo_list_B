import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventInput } from '@fullcalendar/core';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import type { Todo } from "./Todo";

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [yearMonth, setYearMonth] = useState<string>('');

  // 直前にクリックした日付と時刻を覚えておいて、擬似ダブルクリックを検出
  const lastClickRef = useRef<{ date: string; time: number }>({ date: '', time: 0 });

  // FullCalender の DatesSet で更新
  const handleDatesSet = (arg: DatesSetArg) => {
    const firstOfMonth: Date = arg.view.currentStart;
    const y = firstOfMonth.getFullYear();
    const m = String(firstOfMonth.getMonth() + 1).padStart(2, '0');
    setYearMonth(`${y}-${m}`);
  };
  
  // yearMonthが更新されたらキーを絞り込み & タスク取得
  useEffect(() => {
    if(!yearMonth) return;

    async function fetchMonthTodos() {
      // ここでのkeyはLocalForage にデータを保存するときに使う ストレージ上の識別子のこと。
      const allKeys = await localforage.keys();
      // startsWith() メソッドは文字列が引数で指定された文字列で始まるかを判定して true か false を返します。
      // 配列の条件を満たす要素で新しい配列を作成するfilter関数 
      // filterメソッドを使って文字列todos-${yearMonth}の条件を満たす配列のみ残す。
      // 裏返せば年月を持たない等の配列はタスクのカレンダー表示に使えないので取り除く。
      const monthKeys = allKeys.filter(k => k.startsWith(`todos-${yearMonth}-`));
      const arrays = await Promise.all(
        monthKeys.map(k =>
          localforage.getItem<Todo[]>(k).then(data => data ?? [])
        )
      );
      const monthTodos = arrays.flat();
      console.log('[fetchMonthTodos] monthTodos:', monthTodos);
      
        setEvents(monthTodos.map((todo) => ({
          title: todo ? todo.title : "not find",
          start: todo ? todo.date : "not find",
          allDay: true
        })));
        console.log("yearMonth:", yearMonth);
        console.log("monthKeys:", monthKeys);
        console.log("monthTodos:", monthTodos);
    }
    fetchMonthTodos();
  },[yearMonth]);

  // urlの生成に使用する
  const handleDateDoubleClick = (dateStr: string) => {
    navigate(`/todos/${dateStr}`);
  };

  // arg.dateStrはFullCalenderがdateClickイベントハンドラを通して渡す引数オブジェクト
  const handleDateClick = (arg: DateClickArg) => {
    // 現在日時を取得
    const now = Date.now();
    // 0.4秒以内にクリックしたらダブルクリックとみなす
    if (
      // useRefに保存した日付と時刻とダブルクリック時に引数から渡されたarg.dataStrが等しいか確認(ダブルクリックなので等しいか確認する)
      // かつ 現在日時 から1回目のクリックの差が0.4秒以内なら条件を満たす (つまり、ユーザーがダブルクリックしているか確認している)
      lastClickRef.current.date === arg.dateStr &&
      now - lastClickRef.current.time < 400
    ) {
      // arg.dateStrはUIでクリックした日付。 navigate(`/todos/${dateStr}`で、クリックした日付の詳細ページに遷移
      handleDateDoubleClick(arg.dateStr);
    }
    lastClickRef.current = { date: arg.dateStr, time: now };
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      datesSet={handleDatesSet}
      locale={jaLocale}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'today,prev,next',
      }}
      events={events}
      dateClick={handleDateClick}
      height="1200px"
    />
  );
};

export default CalendarPage;
