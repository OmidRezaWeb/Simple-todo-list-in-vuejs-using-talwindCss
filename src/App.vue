<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
const { filteredTodoList, remainingTodos } = storeToRefs(todoStore)
const { toggleTodo, removeTodo, addNewTodo } = todoStore

const newTodo = ref('')
const filteredTodo = ref('all')

const handleAddTodo = () => {
  addNewTodo(newTodo.value)
  newTodo.value = ''
}
</script>

<template>
  <main class="max-w-xl bg-zinc-800 rounded-md pb-5 mx-auto mt-48">
    <header class="border-b-2 border-zinc-900 flex justify-center pt-3">
      <ul class="flex gap-5 hover:cursor-pointer text-sm">
        <li
          @click="filteredTodo = 'all'"
          :class="[
            'text-center text-zinc-500 hover:text-zinc-50 hover:border-b-2 border-blue-500 rounded-full h-7 w-24',
            { 'active-list': filteredTodo === 'all' },
          ]"
        >
          همه کارها
        </li>
        <li
          @click="filteredTodo = 'done'"
          :class="[
            'text-center text-zinc-500 hover:text-zinc-50 hover:border-b-2 border-blue-500 rounded-full h-7 w-24',
            { 'active-list': filteredTodo === 'done' },
          ]"
        >
          انجام‌شده
        </li>
        <li
          @click="filteredTodo = 'remaining'"
          :class="[
            'text-center text-zinc-500 hover:text-zinc-50 hover:border-b-2 border-blue-500 rounded-full h-7 w-24',
            { 'active-list': filteredTodo === 'remaining' },
          ]"
        >
          باقی‌مانده
        </li>
      </ul>
    </header>
    <section class="my-15">
      <h1 class="text-center text-3xl font-black">لیست انجام کارها</h1>
    </section>
    <form @submit.prevent="handleAddTodo" class="w-80 mx-auto">
      <div class="relative">
        <input
          required
          v-model="newTodo"
          type="text"
          placeholder="یک کار اضافه کنید"
          class="w-full h-10 rounded-md bg-zinc-900 outline-none pr-3 pl-10 text-sm"
        />
        <button
          type="submit"
          class="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border cursor-pointer"
        >
          +
        </button>
      </div>
    </form>
    <ul class="mt-8 mb-10 w-80 mx-auto">
      <li
        v-for="todo in filteredTodoList(filteredTodo)"
        :key="todo.id"
        class="w-full flex justify-between items-center my-5"
      >
        <label class="relative inline-block w-6 h-6">
          <input
            :checked="todo.status"
            @change="toggleTodo(todo.id)"
            type="checkbox"
            class="peer appearance-none w-full h-full bg-gray-300 rounded-full checked:bg-green-500 cursor-pointer"
          />
          <span
            class="pointer-events-none absolute inset-0 flex items-center justify-center after:content-['✔'] after:text-white after:opacity-0 peer-checked:after:opacity-100"
          ></span>
        </label>
        <p :class="['mx-3', { 'line-through': todo.status }]">{{ todo.text }}</p>
        <button
          @click="removeTodo(todo.id)"
          class="cursor-pointer text-zinc-500 hover:text-red-500"
        >
          X
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped>

</style>