<script setup>
import { ref, computed } from "vue";

let id = 0;

const newTodo = ref("");
const todoStatus = ref(false);
const filteredTodo = ref('all')
const todoList = ref([
  { id: id++, text: "یاد گرفتن vuejs", status: false },
  { id: id++, text: "یاد گرفتن nuxtjs", status: false },
  { id: id++, text: "یاد گرفتن vue router", status: false },
]);
// فیلتر کردن کار ها  
const filteredTodoList = computed(() => {
    if(filteredTodo.value=='done'){
     return todoList.value.filter((t) => t.status)
    }else if(filteredTodo.value=='remaining'){
     return todoList.value.filter((t) => !t.status)
    }else{
      return   todoList.value;
    }
});

// اضافه کردن کار جدید
function addNewTodo() {
  todoList.value.push({ id: id++, text: newTodo.value, status: false });
  newTodo.value = "";
}
// حذف کردن کار ها
function removTodo(todo) {
  todoList.value = todoList.value.filter((t) => t !== todo);
}
</script>

<template>
  <!-- بخش اصلی -->
  <main class="w-xl bg-zinc-800 rounded-md pb-5 m-auto mt-48">
    <!-- منو بالای لیست -->
    <header class="border-b-2 border-zinc-900 flex justify-center pt-3">
      <ul class="flex gap-5 hover:cursor-pointer text-sm">
        <li
        @click="filteredTodo='all'"
          :class="[
            'text-center text-zinc-500 hover:text-zinc-50 hover:border-b-2 border-blue-500 rounded-full h-6.5 w-26',
            {'active-list' :filteredTodo=='all'}
          ]"
        >
          همه کار ها
        </li>

        <li
        @click="filteredTodo='done'"
          :class="[
            'text-center text-zinc-500 hover:text-zinc-50 hover:border-b-2 border-blue-500 rounded-full h-6.5 w-26', 
            {'active-list': filteredTodo=='done'}
          ]"
        >
          انجام شده
        </li>

        <li
        @click="filteredTodo='remaining'"
          :class="[
            'text-center text-zinc-500 hover:text-zinc-50 hover:border-b-2 border-blue-500 rounded-full h-6.5 w-26',
            {'active-list':filteredTodo=='remaining'}
          ]"
        >
          باقی مانده
        </li>
      </ul>
    </header>
    <!-- اسم لیست -->
    <section class="my-15">
      <h1 class="text-center text-3xl font-black">لیست انجام کار ها</h1>
    </section>
    <!-- قسمت نمایش و اضافه کردن کار ها -->
    <form @submit.prevent="addNewTodo" class="w-80 m-auto">
      <!-- بخش افزودن کار -->
      <div class="relative">
        <input
          required
          v-model="newTodo"
          type="text"
          name=""
          id=""
          placeholder="یک کار اضافه کنید"
          class="w-full h-10 rounded-md bg-zinc-900 outline-none pr-3 pl-10 text-sm"
        />

        <button
          class="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border cursor-pointer"
        >
          +
        </button>
      </div>
    </form>
    <!-- لیست کار ها -->
    <ul class="mt-8 mb-10 w-80 m-auto">
      <li
        v-for="todo in filteredTodoList"
        :key="todo.id"
        class="w-full flex justify-between items-center my-5"
      >
        <label class="relative inline-block w-6 h-6">
          <input
            v-model="todo.status"
            type="checkbox"
            class="peer appearance-none w-full h-full bg-gray-300 rounded-full checked:bg-green-500 cursor-pointer"
          />
          <span
            class="pointer-events-none absolute inset-0 flex items-center justify-center after:content-['✔'] after:text-white after:opacity-0 peer-checked:after:opacity-100"
          ></span>
        </label>
        <p :class="['mx-3', { done: todo.status }]">{{ todo.text }}</p>
        <button
          @click="removTodo(todo)"
          class="cursor-pointer text-zinc-500 hover:text-red-500"
        >
          X
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
