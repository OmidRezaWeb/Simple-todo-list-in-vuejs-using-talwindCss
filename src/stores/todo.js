import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    id: 3,
    todoList: [
      { id: 0, text: 'یاد گرفتن vuejs', status: false },
      { id: 1, text: 'یاد گرفتن nuxtjs', status: false },
      { id: 2, text: 'یاد گرفتن vue router', status: false },
    ],
  }),
  getters: {
    filteredTodoList: (state) => (filter) => {
      if (filter === 'done') {
        return state.todoList.filter((t) => t.status)
      } else if (filter === 'remaining') {
        return state.todoList.filter((t) => !t.status)
      }
      return state.todoList
    },
    remainingTodos: (state) => state.todoList.filter((t) => !t.status).length,
  },
  actions: {
    addNewTodo(text) {
      if (text.trim()) {
        this.todoList.push({ id: this.id++, text, status: false })
      }
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter((t) => t.id !== id)
    },
    toggleTodo(id) {
      const todo = this.todoList.find((t) => t.id === id)
      if (todo) {
        todo.status = !todo.status
      }
    },
  },
})