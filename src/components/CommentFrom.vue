<script lang="ts" setup>
import { ref, defineEmits } from "vue";
const taskName = ref("");
const errorMessage = ref("");

const emits = defineEmits<{ (e: "submit", name: string): void }>();

/**
 * タスクを追加する.
 */
const addTask = (): void => {
  if (!taskName.value.trim()) {
    // 入力が空orスペースのみの場合はエラーメッセージを表示
    errorMessage.value = "入力してください。";
    return;
  }
  errorMessage.value = "";
  const name = taskName.value.trim();
  emits("submit", name);
  taskName.value = "";
};
</script>

<template>
  <!-- Enterでリロードが走らないようにする -->
  <!-- <v-form @submit.prevent> -->
  <v-form>
    <v-row>
      <v-col cols="12" sm="6">
        <!-- 新規タスクを入力するテキストフィールド -->
        <v-text-field v-model="taskName" label="コメントを入力" variant="underlined"
          :error-messages="errorMessage"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- 入力したタスクを追加するボタン -->
        <v-btn @click="addTask">発言</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>