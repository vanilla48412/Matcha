<script lang="ts" setup>
import { useAppStore } from "../stores/counter";
import { useRouter } from 'vue-router';

import { ref } from 'vue'
import firebase from '../firebase/config';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore'

const store = useAppStore();
const emailText = ref("");
const passwordText = ref("");

</script>

<template>
    <v-container>
      <div v-if="store.isUserLogin == false">
        <v-card width="400px" class="mx-auto mt-5">
          <v-card-actions>
            <v-col>
                <v-text-field 
                    v-model="emailText"
                    label="E-MAIL"
                >
                </v-text-field>
                <v-text-field 
                    v-model="passwordText"
                    label="PASSWORD"
                    type="password"
                >
                </v-text-field>
              <v-btn
                @click="store.OnSignInAnonymously"
                color="primary"
              >
                E-Mail SIgn In
              </v-btn>
              <v-btn
                color="primary"
                @click="store.onCreateAccount"
              >
                Sign Up
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else>
        <h2>
          Success to sign in with firebase auth!
        </h2>
        <v-btn @click="store.onSignOut">
          Sign Out
        </v-btn>
      </div>
  </v-container>    
</template>