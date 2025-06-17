import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import DateHeader from './DateHeader';
import { useParams } from 'react-router-dom';
import TodoForm from './TodoForm';
import FilterSelect, {Filter} from './FilterSelect';
import EmptyTrashButton from './EmptyTrashButton';
import TodoList from './TodoList';

export type Todo = {
  title: string;
  date: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean,
  start_date: Date | null;
  complete_date: Date | null;
  progress: number | "" ;
};

const Todos: React.FC = () => {
  const { dateStr } = useParams<{ dateStr: string }>();
  const displayDate = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = `${displayDate.getFullYear()}年${displayDate.getMonth() + 1}月${displayDate.getDate()}日`;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState(1);
  const [filter, setFilter] = useState<Filter>('all');
  const [openTodoId, setOpenTodoIds] = useState<number[]>([]);

  const currentDate = dateStr ?? new Date().toISOString().slice(0,10);
  const todosForDate = todos.filter(todo => todo.date === currentDate);

  const storageKey = `todos-${currentDate}`;

  useEffect(() => {
    localforage.getItem<Todo[]>(storageKey).then(data => {
      setTodos(data ?? []);
    });
  }, [storageKey]);
  
  useEffect(() => {
    localforage.setItem(storageKey, todos);
  }, [storageKey, todos]);  

  const handleAddTodo = (newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      title: trimmed,
      date: currentDate,
      id: nextId,
      completed_flg: false,
      delete_flg: false,
      start_date: displayDate,
      complete_date: displayDate,
      progress: ""
    };

    setTodos(prev => [newTodo, ...prev]);
    setNextId(id => id + 1);
  };

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.delete_flg));
  };

  const handleToggle = (id: number) => {
    setOpenTodoIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todosForDate.filter((todo) => todo.progress === 100 );
      case 'unchecked':
        return todosForDate.filter((todo) => todo.progress !== 100 && !todo.delete_flg);
      case 'delete':
        return todosForDate.filter((todo) => todo.delete_flg);
      default:
        return todosForDate.filter((todo) => !todo.delete_flg);
    }
  };

  const handleTodoField = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });
  
      return newTodos;
    });
  };

  const isFormDisabled = filter === 'completed' || filter === 'delete';

  return (
    <div className="todo-wrapper">
      <DateHeader
       title={formattedDate}
       currentDateStr={currentDate}
      />
      <FilterSelect
        currentFilter={filter}
        onChangeFilter={handleFilterChange}
      />
      {filter === 'delete' ? (
        <EmptyTrashButton onEmptyButton={handleEmpty} />
      ) : (
       filter !== 'completed' && (
        <TodoForm onAdd={handleAddTodo} />
        )
      )}
      <ul>
      <TodoList
        todos={getFilteredTodos()}
        openTodoIds={openTodoId}
        onToggleOpen={handleToggle}
        onChangeTodoField={handleTodoField}
      />
      </ul>
      </div>
  );
};

export default Todos;
