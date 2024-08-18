<template>
  <button
    :class="[
      'text-white py-2 px-10 rounded m-1',
      isSelect ? 'bg-gray-800' : 'bg-gray-600',
    ]"
  >
    {{ taskTitle }}
    <br />
    {{ taskPoint }}pt
    <br />
    {{ isSelect ? "選択中" : "未選択" }}
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  taskTitle: String;
  taskPoint: Number;
  isSelect: Boolean;
}>();
</script>
