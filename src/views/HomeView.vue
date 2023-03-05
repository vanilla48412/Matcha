<script lang="ts" setup>
import CommentFrom from "../components/CommentFrom.vue";
import CommentItem from "../components/CommentItem.vue";
import UserLoginFrom from "../components/UserLoginFrom.vue";
import { useAppStore } from "../stores/counter";
import { useRouter } from 'vue-router';

import { ref, onMounted } from 'vue'
import firebase from '../firebase/config';
import { auth } from '../firebase/config';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore'

const store = useAppStore();
const router = useRouter();
const error = ref();
const isLoading = ref(false);
const isLogin = ref(false);
const data = ref();

onMounted(() => {
  store.updateComment();

  auth.onAuthStateChanged(function(user) {
    if (user) {
      isLogin.value = true;
      console.log(user.uid);
    } else {
      isLogin.value = false;
    }
  });  
})

</script>

<template >
  <v-container>
    <h1>チャットテストページ</h1>
    <div v-if="isLogin == false">
      <UserLoginFrom />
    </div>
    <div v-else>
      <CommentFrom @submit="store.addComment" />
    </div>

    <!-- for文でタスクを表示させる -->
    <template v-for="comment in store.commentData" :key="store.taskId">
      <CommentItem :taskId="comment.id" :name="comment.name" @getUsers="store.deleteTask" />
    </template>

    <!-- <template v-for="data in store.data" :key="data.dataId">
      <CommentItem :taskId="data.id" :name="data.name" />
    </template> -->

    <!-- <v-btn @click="getUsers">情報を追加</v-btn>
    <v-btn @click="store.getUsers">情報を出す</v-btn> -->
  </v-container>
</template>