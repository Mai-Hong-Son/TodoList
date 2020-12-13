interface todoProps {
    id: number,
    title: string,
    content: string,
    deadline?: Date,
    status: string,
}

const addTodo = (todo: todoProps) => (
    {
      type: 'demo/add_todo',
      payload: todo,
    }
);

const editTodo = (todo: todoProps) => (
    {
      type: 'demo/edit_todo',
      payload: todo,
    }
);

const removeTodo = (id: number) => (
    {
      type: 'demo/remove_todo',
      payload: id,
    }
);

export default {
    addTodo,
    editTodo,
    removeTodo,
}