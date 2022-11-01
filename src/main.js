import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { sync } from "vuex-router-sync"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { initializeFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics"
import "remixicon/fonts/remixicon.css"

sync(store, router)

const fbConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
}

console.log(fbConfig)
export const firebaseApp = initializeApp(fbConfig)
export const auth = getAuth()
export const rootdatabase = getDatabase(firebaseApp)
export const rootfirestore = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
})
// export const analytics = getAnalytics(firebaseApp)
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

createApp(App).use(store).use(router).mount("#app")
