<template>
  <div>
    <h1>タスクリスト</h1>
    <p>追加予定の合計ポイント: {{ sumPoint }}</p>
    <div class="my-2">
      <div class="grid grid-cols-5 gap-2">
        <taskButton
          v-for="task in taskList"
          :key="task.id"
          @click="selectTask(task.id)"
          :taskTitle="task.title"
          :taskPoint="task.point"
          :isSelect="task.isSelect"
        >
        </taskButton>
      </div>
    </div>
    <div>
      <button
        class="bg-green-500 text-white font-bold py-2 px-4 mx-2 rounded hover:bg-green-700"
        @click="openAddTaskModal"
      >
        タスク追加
      </button>
      <button
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        @click="openConfirmAddPointModal"
      >
        ポイント追加
      </button>
    </div>
    <!-- モーダルの部分 -->
    <div
      v-if="showConfirmAddPointModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-5 rounded shadow-lg">
        <h2 class="text-lg font-bold mb-4">ポイントを追加しますか？</h2>
        <p>合計 {{ sumPoint }} ポイントが追加されます。</p>
        <div class="mt-4 flex justify-end">
          <button
            @click="addPoint"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
          >
            追加する
          </button>
          <button
            @click="showConfirmAddPointModal = false"
            class="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showSuccessAddPointModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-5 rounded shadow-lg">
        <h2 class="text-lg font-bold mb-4">SUCCESS!</h2>
        <p>合計 {{ sumPoint }} ポイントが追加されました！</p>
        <div class="mt-4 flex justify-end">
          <button
            @click="addPointModalBack"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
    <!-- タスク追加モーダル -->
    <div
      v-if="showAddTaskModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-5 rounded shadow-lg w-1/3">
        <h2 class="text-lg font-bold mb-4">新しいタスクを追加</h2>
        <div class="mb-4">
          <label class="block text-gray-700">タスク名</label>
          <input
            v-model="newTask.title"
            type="text"
            class="w-full border rounded px-3 py-2"
            placeholder="タスク名を入力"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">ポイント</label>
          <input
            v-model.number="newTask.point"
            type="number"
            class="w-full border rounded px-3 py-2"
            placeholder="ポイントを入力"
          />
        </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="addTask"
            class="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
          >
            追加
          </button>
          <button
            @click="showAddTaskModal = false"
            class="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/code";
import taskButton from "~/components/atoms/taskButton.vue";
// TODO: APIから取得できるようにする
const taskList = ref<Task[]>([
  { id: 1, title: "掃除", point: 3, isSelect: false },
  { id: 2, title: "洗濯", point: 2, isSelect: false },
  { id: 3, title: "料理", point: 5, isSelect: false },
  { id: 4, title: "買い物", point: 4, isSelect: false },
  { id: 5, title: "勉強", point: 6, isSelect: false },
  { id: 6, title: "運動", point: 7, isSelect: false },
  { id: 7, title: "読書", point: 8, isSelect: false },
  { id: 8, title: "映画鑑賞", point: 9, isSelect: false },
  { id: 9, title: "ゲーム", point: 10, isSelect: false },
  { id: 10, title: "お風呂", point: 1, isSelect: false },
]);

const newTask = ref<Task>({ id: 0, title: "", point: 0, isSelect: false });
const sumPoint = ref<number>(0);
const showConfirmAddPointModal = ref<boolean>(false);
const showSuccessAddPointModal = ref<boolean>(false);
const showAddTaskModal = ref<boolean>(false);
const selectTask = (id: number) => {
  taskList.value.forEach((task) => {
    if (task.id === id) {
      task.isSelect = !task.isSelect;
    }
  });
  sumPoint.value = taskList.value.reduce(
    (sum, task) => (task.isSelect ? sum + task.point : sum),
    0
  );
};

const openConfirmAddPointModal = () => {
  showConfirmAddPointModal.value = true;
};
const openAddTaskModal = () => {
  showAddTaskModal.value = true;
};
// TODO: APIを使ったポイント追加処理を実装する
const addPoint = () => {
  showConfirmAddPointModal.value = false;
  showSuccessAddPointModal.value = true;
};
const addTask = () => {
  if (!newTask.value.title || !newTask.value.point) {
    alert("タスク名が未入力またはポイントが0ptです");
    return;
  }
  taskList.value.push({
    id: taskList.value.length + 1,
    title: newTask.value.title,
    point: newTask.value.point,
    isSelect: false,
  });
  newTask.value = { id: 0, title: "", point: 0, isSelect: false };
  showAddTaskModal.value = false;
};
const addPointModalBack = () => {
  // 選択中のタスクをリセット
  taskList.value.forEach((task) => {
    task.isSelect = false;
  });
  sumPoint.value = 0;
  showSuccessAddPointModal.value = false;
};
</script>
