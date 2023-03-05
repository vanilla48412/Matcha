import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { collection, getDocs, setDoc, doc, query, orderBy, limit, Timestamp } from 'firebase/firestore'
import firebase from '../firebase/config';
import { auth } from '../firebase/config';
import { updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from "firebase/auth";

// 型定義
interface Task {
  id: number;
  name: string;
}

interface UserData {
  id: string;
  name: string;
  color: string;
  //message: string;
  //timestamp: Timestamp;
}

export const useAppStore = defineStore('app', () => {
  const tasks: Ref<Task[]> = ref([]);
  const userData = ref<UserData>();
  const isLoading = ref(false);
  const data = ref();
  const error = ref();
  const currentUser = ref(auth.currentUser);
  const commentData = ref();

  const userId = ref("");
  const userName = ref("");
  const isUserLogin = ref(false);
  let serialId = 0;


  // if (userData.value != undefined) {
  //   userData.value.name = 'Sakai Kotaro';
  // }
  // userData.value = ref<UserData>({
  //   id: 'John',
  //   name: 'Doe',
  //   color: 'red--text text--lighten-1',
  // });

  /**
   * 匿名でサインインする
   */
  const OnSignInAnonymously = () => {
    signInAnonymously(getAuth())
    .then((userCredential) => {
      const user = userCredential.user;
      userId.value = user.uid;
      isUserLogin.value = true;
      console.log( user );
      console.log( userId );
      console.log( "Signed in" );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log( errorCode, errorMessage );
    });  
  }

  /**
   * サインインする
   */
  const onSignIn = (emailText: string, passwordText: string) => {
    {
      if ( emailText == "" || passwordText == "" ) return;

      signInWithEmailAndPassword(getAuth(), emailText, passwordText)
      .then((userCredential) => {
          // Sign In
          const user = userCredential.user;
          console.log( emailText );
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log( errorCode, errorMessage );
      });
    }
  }

  /**
   * アカウントを作成する
   */
  const onCreateAccount = (emailText: string, passwordText: string) => {
    {
      if ( emailText == "" || passwordText == "" ) return;

      createUserWithEmailAndPassword(getAuth(), emailText, passwordText)
      .then((userCredential) => {
          // Create Account
          const user = userCredential.user;
          console.log( user );
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log( errorCode, errorMessage );
      });
    }
  }

  /**
   * サインアウトする
   */
  const onSignOut = async () => {
    try {
      await getAuth().signOut();
      isUserLogin.value = false;
    } catch (error) {
      console.log( error );
    }
  }

  const onAddUserData = async (inId: string, inName: string) => {
    const data = {
      id: inId,
      name: inName
    }
    const db = getFirestore(firebase);
    const usersCollection = collection(db, 'users');
    const newUserRef = doc(usersCollection);
    await setDoc(newUserRef, data);


    // ここで止まるので解決すべき
    const usersSnapshot = await getDocs(usersCollection);
    //data.value = usersSnapshot.docs.map(doc => doc.data());
    console.log("success a");
  }

  /**
   * タスクを追加する.
   * @param name タスク名
   */
  const addTask = (name: string): void => {
    serialId++;
    tasks.value.push({ id: serialId, name: name })
  }

  /**
   * タスクを削除する.
   * @param id 削除するタスクid
   */
  const deleteTask = (id: number): void => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

  /**
   * メッセージを追加する.
   */
  const addComment = (message: string): void => {
    serialId++;
    addCommentDB(serialId, message);
  }

  /**
   * メッセージを追加する.
   */
  const addCommentDB = async (id: number, message: string) => {
    try {
      const data = {
        id: id,
        name: message
      }
      const db = getFirestore(firebase);
      const newUserRef = doc(collection(db, 'comments'));
      await setDoc(newUserRef, data);

      updateComment();
    } catch (e) {
      error.value = e;
    } finally {
    }
  }

  /**
   * メッセージを更新する.
   */
  const updateComment = async () => {
    try {
      const db = getFirestore(firebase);
      const usersCollection = collection(db, 'comments');
      const usersSnapshot = await getDocs(usersCollection);
      commentData.value = usersSnapshot.docs.map(doc => doc.data());
    } catch (e) {
        error.value = e;
    } finally {
    }
  }

  const getUsers = async () => {
    try {
        const db = getFirestore(firebase);
        const usersCollection = collection(db, 'users');
        // ここで止まるので解決すべき
        const usersSnapshot = await getDocs(usersCollection);
        data.value = usersSnapshot.docs.map(doc => doc.data());
        console.log("success a");
    } catch (e) {
        error.value = e;
    } finally {
        isLoading.value = false;
        console.log("finally");
    }
  }

  // const getUsers = async () => {
  //   console.log("getUsers");
  //   isLoading.value = true;
  //   try {
  //       // const db = getFirestore(firebase);
  //       // const usersCollection = collection(db, 'users');
  //       // const usersSnapshot = await getDocs(usersCollection);
  //       // data.value = usersSnapshot.docs.map(doc => doc.data());
  //       // console.log(data.value)
  //       console.log("success");
  //   } catch (e) {
  //       error.value = e;
  //   } finally {
  //       isLoading.value = false;
  //       console.log("finally");
  //   }
  // }

  return { tasks, data, isLoading, currentUser, userName, isUserLogin, commentData, addTask, deleteTask, updateComment, getUsers, addComment, addCommentDB, onSignIn, onSignOut, onCreateAccount, OnSignInAnonymously }
})