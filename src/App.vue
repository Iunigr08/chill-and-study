<template>
  <router-view></router-view>
</template>

<script>
import { auth } from "./main"
import { onAuthStateChanged } from "firebase/auth"

export default {
  created: function () {
    onAuthStateChanged(auth, (userCredential) => {
      // キャッシュログイン時の処理
      if (userCredential && !this.$store.state.user.uid) {
        this.$store.commit("setUid", userCredential)
        this.$store.commit("setLoginStatus", true)
        console.log("app.vue")
        this.$store.dispatch("checkUserTable")
        this.$store.dispatch("syncLoginRedirect")
      }
    })
  },
}
</script>

<style>
/* 
  Google Fonts
 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Titillium+Web:wght@200;300;400;600;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Roboto+Condensed:wght@300;400;700&family=Titillium+Web:wght@200;300;400;600;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Noto+Sans+JP:wght@300;400;700;900&family=Roboto+Condensed:wght@300;400;700&family=Titillium+Web:wght@200;300;400;600;700;900&display=swap");

/* 
  CSS 変数
 */
:root {
  --font-nsjp: "Noto Sans JP", sans-serif;
  --font-titillium: "Titillium Web", sans-serif;
  --font-robotcondensed: "Roboto Condensed", sans-serif;
  --font-lato: "Lato", sans-serif;
  --bgcolor: #fdfaf6;
  --text-deeper-green: #1d3e53;
  --text-deep-green: #064420;
  --text-deeper-green: #1d3e53;
  --text-default-green: #476d7c;
  --text-light-green: #77abb7;
  --text-a-link: #1c658c;
  --bg-deep-gray: #65696a;
  --bg-gray: #dadfe0;
  --bg-light-gray: #edefef;
  --bg-light-gray-alpha: #dadfe067;
  --bg-orange: #f8a978;
  --bg-button-gray: #d9d9d9;
  --bg-white: #ffffff;
  --tag-red: #fd7171;
  --tag-blue: #5e84f5;
  --tag-green: #80f180;
  --tag-yellow: #ffb758;
  --tag-purple: #cf6eff;
  --tag-gray: #8d8d8d;
  --box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.1),
    0px 0px 10px 14px rgba(0, 0, 0, 0.07);
}

/* 
  ノーマライズ的な
 */
* {
  margin: 0;
  padding: 0;
}
html,
body {
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  font-family: var(--font-nsjp);
}
/* i {
  font-size: 160%;
} */
body {
  overflow: hidden;
  background: #343a34;
}
div {
  box-sizing: border-box;
}
li {
  list-style: none;
}
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: rgb(236, 236, 236);
}

/* 
================
app layout 
================
*/
body {
  width: 100vw;
  height: 100vh;
  /* background-color: #e1d6d6; */
  background-color: var(--bgcolor);
}
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

/* 
  neumophing
 */
.shadow {
  /* box-sizing: border-box; */
  /* box-shadow: -5px 5px 10px #d1c7c7, 5px -5px 10px #f1e5e5; */
  box-shadow: -5px 5px 12px #b2a9a9, 5px -5px 12px #ffffff;
  /* border: 1.6px solid #e1d6d6; */
  border: 1.6px solid #4040400f;
  /* border-radius: 0.6rem; */
  /* transition: box-shadow 0.8s; */
}
.shadow:hover {
  /* box-shadow: inset -5px 5px 10px #d1c7c7, inset 5px -5px 10px #f1e5e5; */
  /* box-shadow: none; */
  /* border: 1.6px solid #40404025; */
  border: 1px solid #e1d6d6;
  /* box-shadow: inset 5px 5px 12px #b2a9a9, inset -5px -5px 12px #ffffff; */
  box-shadow: inset 5px 5px 9px #cfc5c5, inset -5px -5px 9px #f3e7e7;

  box-shadow: inset 5px 5px 4px #a09898, inset -5px -5px 4px #ffffff;
  box-shadow: inset 5px 5px 4px #d4c9c9, inset -5px -5px 4px #efe3e3;
}
/* 
  .shadow--in
    デフォルトでインセット表示のもの
      : サイドバー＞プロフィールボックス
*/
.shadow--in {
  box-shadow: inset -5px 5px 12px #b2a9a9, inset 5px -5px 12px #ffffff;
  /* box-shadow: inset 4px 4px 5px #c2b8b8, inset -4px -4px 5px #fff4f4; */
  box-shadow: inset 5px 5px 6px #cfc5c5, inset -5px -5px 6px #f3e7e7;
}
</style>
