import { createStore } from "vuex"
import router from "../router/index.js"
import { rootdatabase } from "@/main"
import { ref, set, onValue, get, child, update } from "firebase/database"

export default createStore({
  state: {
    user: {
      uid: "",
      UserName: "",
      Email: "sofeng.gr08@gmail.com",
      Password: "qwertyu",
      Preset: [
        [[0, 25, 0], [0, 5, 0], 1],
        [[0, 50, 0], [0, 10, 0], 2],
        [[0, 15, 0], [0, 5, 0], 3],
      ],
      Work: null,
    },
    loginStatus: false,
    menuIsFolded: false,
    isLoadedPreset: false,
  },
  getters: {
    getUid(state) {
      return state.user.uid
    },
    getUser(state) {
      return state.user
    },
    loginStatus: (state) => {
      return state.loginStatus
    },
    isFolded: (state) => {
      return state.menuIsFolded
    },
    getpreset: (state) => {
      return JSON.parse(JSON.stringify(state.user.Preset))
    },
    getWork: (state) => {
      return JSON.parse(JSON.stringify(state.user.Work))
    },
    getPresetFlag: (state) => {
      return state.isLoadedPreset
    },
  },
  mutations: {
    deleteUser(state) {
      state.user.uid = ""
      state.user.UserName = ""
      state.user.Email = ""
      state.user.Password = ""
      state.user.Preset = [
        [[0, 25, 0], [0, 5, 0], 1],
        [[0, 50, 0], [0, 10, 0], 2],
        [[0, 15, 0], [0, 5, 0], 3],
      ]
      state.user.Work = null
      state.isLoadedPreset = false
    },
    setUserName(state, username) {
      state.user.UserName = username
    },
    setUserEmail(state, email) {
      state.user.Email = email
    },
    setUserPassword(state, password) {
      state.user.Password = password
    },
    setUid(state, userCredential) {
      state.user.uid = userCredential.uid
      // state.user.Email = userCredential.email
    },
    setLoginStatus(state, bool) {
      state.loginStatus = bool
    },
    toggleFold(state) {
      state.menuIsFolded = !state.menuIsFolded
    },
    setPreset(state, newValue) {
      state.user.Preset = JSON.parse(JSON.stringify(newValue))
      console.log("checkUserTable")
    },
    setWork(state, newvalue) {
      state.user.Work = JSON.parse(JSON.stringify(newvalue))
    },
    //ストアにセーブから書き込み
    setSaveWork(state, newvalue) {
      if (state.user.Work != null) {
        var keys = Object.keys(newvalue)
        var date_data = new Date(
          Number(keys[0].substr(0, 4)),
          Number(keys[0].substr(4, 2)) - 1,
          Number(keys[0].substr(6, 2))
        )
        var temp = {}
        if (state.user.Work[0] == null) {
          state.user.Work[0] = []
        }
        temp = state.user.Work[0][date_data.getDay()]
        console.log(temp)
        if (temp) {
          //
        } else {
          temp = {}
        }
        temp[keys[0]] = JSON.parse(JSON.stringify(newvalue[keys[0]]))
        console.log(temp)
        state.user.Work[0][date_data.getDay()] = temp
        if (state.user.Work[0][date_data.getDay()]) {
          let temp = Object.entries(state.user.Work[0][date_data.getDay()])
          temp.sort(function (p1, p2) {
            let p1Key = p1[0]
            let p2Key = p2[0]
            if (p1Key > p2Key) {
              return -1
            }
            if (p1Key < p2Key) {
              return 1
            }
            return 0
          })
          state.user.Work[0][date_data.getDay()] = Object.fromEntries(temp)
        }
      }
    },
    //storeのworkからデータを削除
    deleteStoreWork(state, delete_date) {
      var date = new Date(
        Number(delete_date.substr(0, 4)),
        Number(delete_date.substr(4, 2)) - 1,
        Number(delete_date.substr(6, 2))
      )
      let edit_day = date.getDay()
      //何週間前かを計算
      let now = new Date()
      let sunday_date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      )
      let request_week_sunday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay()
      )
      let edit_week
      for (let i = 0; i < state.user.Work.length; i++) {
        if (sunday_date.getTime() === request_week_sunday.getTime()) {
          edit_week = i
          break
        }
        sunday_date.setDate(sunday_date.getDate() - 7)
      }
      delete state.user.Work[edit_week][edit_day][delete_date]
    },
    //storeのデータを編集
    updateStoreWork(state, { edit_date: edit_date, new_data: new_data }) {
      var date = new Date(
        Number(edit_date.substr(0, 4)),
        Number(edit_date.substr(4, 2)) - 1,
        Number(edit_date.substr(6, 2))
      )
      let edit_day = date.getDay()
      //何週間前かを計算
      let now = new Date()
      let sunday_date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      )
      let request_week_sunday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay()
      )
      let edit_week
      for (let i = 0; i < state.user.Work.length; i++) {
        if (sunday_date.getTime() === request_week_sunday.getTime()) {
          edit_week = i
          break
        }
        sunday_date.setDate(sunday_date.getDate() - 7)
      }
      console.log(new_data)
      state.user.Work[edit_week][edit_day][edit_date].ColorTag =
        new_data.ColorTag
      state.user.Work[edit_week][edit_day][edit_date].Memo = new_data.Memo
    },
    setUserToken(state, token) {
      state.UserToken = token
    },
    setLoadedFlg(state, bool) {
      state.isLoadedPreset = bool
    },
  },
  actions: {
    logout({ commit }) {
      commit("deleteUser")
      commit("setLoginStatus", false)
    },
    syncGetLoginStatus({ getters }) {
      return getters.loginStatus
    },
    syncLoginRedirect({ state }) {
      console.log("syncloginredirect")
      if (state.loginStatus) {
        state.route.query.redirect
          ? router.push(state.route.query.redirect)
          : router.push("/")
      }
    },
    //データベースからweekago前のデータを取得
    async syncGetwork({ state }, { weekago }) {
      var now = new Date()
      var getsundaydate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      )
      getsundaydate.setDate(
        getsundaydate.getDate() - getsundaydate.getDay() - 7 * weekago
      )
      var getsundaydatest =
        getsundaydate.getFullYear() +
        ("00" + (getsundaydate.getMonth() + 1)).slice(-2) +
        ("00" + getsundaydate.getDate()).slice(-2)
      return await get(
        child(
          ref(rootdatabase),
          "Users/" + state.user.uid + "/TimeData/" + getsundaydatest
        )
      )
    },
    //プリセットをデータベースに書き込み
    syncuploadpreset({ state }) {
      update(ref(rootdatabase, "Users/" + state.user.uid + "/Profile"), {
        Presets: state.user.Preset,
      })
    },
    //新しいワークをデータベースに登録
    syncuploadnewwork({ state }, { new_data }) {
      var keys = Object.keys(new_data)
      var date_data = new Date(
        Number(keys[0].substr(0, 4)),
        Number(keys[0].substr(4, 2)) - 1,
        Number(keys[0].substr(6, 2))
      )
      date_data.setDate(date_data.getDate() - date_data.getDay())
      var sanday_date =
        date_data.getFullYear() +
        ("00" + (date_data.getMonth() + 1)).slice(-2) +
        ("00" + date_data.getDate()).slice(-2)
      set(
        ref(
          rootdatabase,
          "Users/" + state.user.uid + "/TimeData/" + sanday_date + "/" + keys
        ),
        {
          ColorTag: new_data[keys].ColorTag,
          Memo: new_data[keys].Memo,
          Work: new_data[keys].Work,
        }
      )
    },
    //データベースから記録を削除
    syncdeletework({ state }, { delete_date }) {
      var date = new Date(
        Number(delete_date.substr(0, 4)),
        Number(delete_date.substr(4, 2)) - 1,
        Number(delete_date.substr(6, 2))
      )
      let request_week_sunday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay()
      )
      let delete_week =
        request_week_sunday.getFullYear() +
        ("00" + (request_week_sunday.getMonth() + 1)).slice(-2) +
        ("00" + request_week_sunday.getDate()).slice(-2)
      set(
        ref(
          rootdatabase,
          "Users/" +
            state.user.uid +
            "/TimeData/" +
            delete_week +
            "/" +
            delete_date
        ),
        null
      )
    },
    //データベースの記録を編集
    synceditwork({ state }, { edit_date: editdate, new_data: new_data }) {
      var date = new Date(
        Number(editdate.substr(0, 4)),
        Number(editdate.substr(4, 2)) - 1,
        Number(editdate.substr(6, 2))
      )
      let request_week_sunday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay()
      )
      let delete_week =
        request_week_sunday.getFullYear() +
        ("00" + (request_week_sunday.getMonth() + 1)).slice(-2) +
        ("00" + request_week_sunday.getDate()).slice(-2)
      update(
        ref(
          rootdatabase,
          "Users/" +
            state.user.uid +
            "/TimeData/" +
            delete_week +
            "/" +
            editdate
        ),
        {
          ColorTag: new_data.ColorTag,
          Memo: new_data.Memo,
        }
      )
    },
    // async asyncsetUid({ commit }, userCredential) {
    //   console.log("async commit")
    //   return await commit("setUid", userCredential)
    // },
    createUserDatabase({ commit, state }) {
      const parsedObj = JSON.parse(
        JSON.stringify({
          Email: state.user.Email,
          Password: state.user.Password,
          UserName: state.user.UserName,
          Presets: "",
        })
      )
      set(ref(rootdatabase, "Users/" + state.user.uid), {
        Profile: "",
        TimeData: "",
      })
      set(ref(rootdatabase, "Users/" + state.user.uid + "/Profile/"), parsedObj)
      commit("setLoadedFlg", true)
    },
    setUserProfile({ commit, state }) {
      // 参照先をプリセット以下の階層に指定
      const profileRef = ref(rootdatabase, `Users/${state.user.uid}/Profile`)

      // ユーザ名を取得（初回だけ）
      onValue(
        child(profileRef, "UserName"),
        (snapshot) => {
          const data = snapshot.val()
          commit("setUserName", data)
        },
        { onlyOnce: true }
      )

      // メールアドレスを取得（初回だけ）
      onValue(
        child(profileRef, "Email"),
        (snapshot) => {
          const data = snapshot.val()
          commit("setUserEmail", data)
        },
        { onlyOnce: true }
      )

      // プリセットを取得（リアルタイムリッスン）
      onValue(child(profileRef, "Presets"), (snapshot) => {
        const data = snapshot.val()
        if (data) commit("setPreset", data)
        commit("setLoadedFlg", true)
      })
    },
    checkUserTable({ dispatch, state }) {
      const profileRef = ref(
        rootdatabase,
        `Users/${state.user.uid}/Profile/UserName`
      )
      onValue(
        profileRef,
        (snapshot) => {
          if (snapshot.val()) dispatch("setUserProfile")
        },
        { onlyOnce: true }
      )
    },
  },
  modules: {},
})
