import useTodoStorage from "./useTodosStorage";
import useTodoFilter from "./useTodosFilter";
import useTodoHandler from "./useTodosHandler";
import useToggle from "./useToggle";

function useTodos(dateStr?: string) {
  const displayDate = dateStr ? new Date(dateStr) : new Date();
  const currentDate = dateStr ?? new Date().toISOString().slice(0,10);
  const formattedDate = `${displayDate.getFullYear()}年${displayDate.getMonth() + 1}月${displayDate.getDate()}日`;

  const { todos, setTodos } = useTodoStorage(currentDate);
  const { filter, setFilter, filteredTodos } = useTodoFilter(todos);
  const { handleaddTodo, handleTodoField, removeDeleted } = useTodoHandler(
    setTodos,
    currentDate,
    displayDate
  );

  const { openIds, toggle } = useToggle();
  const isFormDisabled = filter === "completed" || filter === "delete";

  return {
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
  };
}

export default useTodos;
