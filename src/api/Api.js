import fetchData from './Backend';

const TodoApi = {
  add(body) {
    return fetchData('todos', { method: 'post', body });
  },

  remove(id) {
    return fetchData(`todos/${id}`, { method: 'delete' });
  },

  removeMany(ids) {
    return fetchData('todos/remove', {
      method: 'post',
      body: ids,
    });
  },

  getAll() {
    return fetchData('todos');
  },

  update(id, body) {
    return fetchData(`todos/${id}`, {
      method: 'patch',
      body,
    });
  },
};

export default TodoApi;
