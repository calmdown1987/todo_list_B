import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import type { Todo } from '../components/Todo';
import type { DatesSetArg, EventInput } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';

interface UseMonthTodosResult {
  events: EventInput[];
  handleDatesSet: (arg: DatesSetArg) => void;
  handleDateClick: (arg: DateClickArg) => void;
}

// FullCalendar用の副作用とイベントハンドラ
// 表示月のタスクをストレージから取得、eventsへ整形(副作用)
// カレンダーの表示月が変わったとき更新された年月をセット(handleDatesSet)
// クリックした日付の詳細ページへ移動(handleDateClick)
function useMonthTodos(): UseMonthTodosResult {
  const navigate = useNavigate();
  const [yearMonth, setYearMonth] = useState<string>('');
  const [events, setEvents] = useState<EventInput[]>([]);
  const lastClickRef = useRef<{ date: string; time: number}>({date: '', time: 0});

  // 表示月のタスクを取得
  useEffect(() => {
    if(!yearMonth) return;
    (async () => {
     const allKeys = await localforage.keys()
     const monthKeys = allKeys.filter(k => k.startsWith(`todos-${yearMonth}-`))
     const arrays = await Promise.all(
        monthKeys.map(k => localforage.getItem<Todo[]>(k).then(data => data ?? []))
     )
     const monthTodos = arrays.flat();
     setEvents(
      monthTodos.map(todo => ({
        title: todo.title,
        start: todo.date,
        allDay: true,
      }))
    )
    })()
  }, [yearMonth])

  // 表示月が切り替えられたら、更新された年月をセット
  const handleDatesSet = (arg: DatesSetArg) => {
    const firstOfMonth = arg.view.currentStart;
    const y = firstOfMonth.getFullYear();
    const m = String(firstOfMonth.getMonth() + 1).padStart(2, '0');
    setYearMonth(`${y}-${m}`);
  };

  // クリックした日付の詳細ページへ移動
  // FullCalendar は dblclick を持たないため、
  // 400ミリ秒 以内の連続クリックを擬似ダブルクリックとして扱う
  const handleDateClick = (arg: DateClickArg) => {
    const now = Date.now();
    if (
      lastClickRef.current.date === arg.dateStr &&
      now - lastClickRef.current.time < 400
    ) {
      navigate(`/todos/${arg.dateStr}`);
    }
    lastClickRef.current = { date: arg.dateStr, time: now};
  };

  return { events, handleDatesSet, handleDateClick }
}

export default useMonthTodos;
