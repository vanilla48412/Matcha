<template>
    <v-container>
      <div v-if="currentUser == null">
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
                @click="signin"
                color="primary"
              >
                E-Mail SIgn In
              </v-btn>
              <v-btn
                color="primary"
                @click="createAccount"
              >
                Sign Up
              </v-btn>
              <v-text-field 
                    v-model="message"
                    label="MESSAGE"
                >
              </v-text-field>
              <v-btn
                color="primary"
                @click="sendMessage"
              >
                Send Message
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else>
        <h2>
          Success to sign in with firebase auth!
        </h2>
        <v-btn @click="signout">
          Sign Out
        </v-btn>
      </div>
  </v-container>    
  </template>
  
  <script>
  import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
  
  export default {
      name: 'loginpage',
      data: () => ({
          message: "",
          emailText: "",
          passwordText: "",
          currentUser: null,
      }),
      mounted()
      {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if ( user != null ){
            this.currentUser = user;
          }else{
            this.currentUser = null;
          }
        });
      },
      methods: {
          signin()
          {
            if ( this.emailText == "" || this.passwordText == "" ) return;
              const auth = getAuth();
              signInWithEmailAndPassword(auth, this.emailText, this.passwordText)
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
              // if ( this.emailText == "" || this.passwordText == "" ) return;
              //signInAnonymously(auth)
              //signInWithEmailAndPassword(auth, this.emailText, this.passwordText)
              // firebase
              // .auth()
              // .signInAnonymously()
              // .then(() => {
              //   console.log( "ログイン成功しました！" );
              // })
              // .catch((error) => {
              //   console.log(error);
              // });
  
              // .then((userCredential) => {
              //     // Sign In
              //     const user = userCredential.user;
              //     console.log( user );
              // })
              // .catch((error) => {
              //     const errorCode = error.code;
              //     const errorMessage = error.message;
              //     console.log( errorCode, errorMessage );
              // });
          },
          createAccount()
          {
              const auth = getAuth();
              createUserWithEmailAndPassword(auth, this.emailText, this.passwordText)
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
          },
          signout()
          {
            const auth = getAuth();
            signOut(auth).then(() => {
              this.currentUser = null;
            }).catch((error) => {
              console.log( error );
            });
          }
      }
  }
  </script>