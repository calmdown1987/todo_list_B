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
  delete_flg: boolean,
  start_date: Date | null;
  complete_date: Date | null;
  progress: number | "" ;
};

const Todos: React.FC = () => {
  const { dateStr } = useParams<{ dateStr: string }>();

  const {
    formattedDate,
    currentDate,
    filteredTodos,
    filter,
    setFilter,
    handleaddTodo,
    handleTodoField,
    removeDeleted,
    openIds,
    toggle,
    isFormDisabled
  } = useTodos(dateStr);

  return (
    <div className="todo-wrapper">
      <DateHeader
       title={formattedDate}
       currentDateStr={currentDate}
      />
      <FilterSelect
        currentFilter={filter}
        onChangeFilter={setFilter}
      />
      {filter === 'delete' ? (
        <EmptyTrashButton onEmptyButton={removeDeleted} />
      ) : (
       filter !== 'completed' && (
        <TodoForm onAdd={handleaddTodo} />
        )
      )}
      <ul>
      <TodoList
        todos={filteredTodos}
        openTodoIds={openIds}
        onToggleOpen={toggle}
        onChangeTodoField={handleTodoField}
      />
      </ul>
      </div>
  );
};

export default Todos;
