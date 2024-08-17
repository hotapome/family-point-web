<template>
  <div>
    <h1>タスクリスト</h1>
    <p>追加予定の合計ポイント: {{ sumPoint }}</p>
    <div class="my-2">
      <div class="grid grid-cols-5 gap-2">
        <button
          v-for="task in taskList"
          :key="task.id"
          @click="addTask(task.id)"
          :class="[
            'text-white py-2 px-10 rounded m-1',
            task.isSelect ? 'bg-gray-800' : 'bg-gray-600',
          ]"
        >
          {{ task.title }}
          <br />
          {{ task.point }}pt
          <br />
          {{ task.isSelect ? "選択中" : "未選択" }}
        </button>
      </div>
    </div>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      @click="buttonClick"
    >
      追加
    </button>
  </div>
</template>

<script setup lang="ts">
type Task = {
  id: number;
  title: string;
  point: number;
  isSelect: boolean;
};
const taskList: Task[] = [
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
];

const sumPoint = ref<number>(0);
const addTask = (id: number) => {
  console.log(`ボタン選択発火&id=${id}`);
  taskList.forEach((task) => {
    if (task.id === id) {
      task.isSelect = !task.isSelect;
    }
  });
  sumPoint.value = taskList.reduce(
    (sum, task) => (task.isSelect ? sum + task.point : sum),
    0
  );
};
const buttonClick = () => {
  alert("ポイント追加しました");
};
</script>
