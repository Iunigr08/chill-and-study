# ちるスタ Chill & Study
wikiに色々書いてます→[当リポジトリwiki](https://gitlab.cis.iwate-u.ac.jp/2022_gr08/richtime-vue/-/wikis/home)

gr-08_timerから移転しました．  
班ページはこちら：[22::gr08](http://wiki.cis.iwate-u.ac.jp/~wiki/csd/group.cgi/2022/?p=22%3A%3Agr08)


## 環境構築の方法
GitLab-wikiの[環境構築|https://gitlab.cis.iwate-u.ac.jp/2022_gr08/richtime-vue/-/wikis/work/Building%20Environment]ぺージを参考にして環境を作成してください．  
大学のUbuntuで動作確認済みです．  

## ディレクトリ構成
プロジェクトのディレクトリ構成について軽く説明します．  

### ルートディレクトリ
設定ファイルがたくさんありますが，npmとwebpackが管理しているものはほぼノータッチです．  
- public/ : 静的ファイルが置いてあります．基本触れません．
- src/ : 作業ファイルが置いてあります．.vueファイルは全てここで管理します．  
- .env.development : なぜか環境変数定義ファイルがあります．追跡外したはずなんだけど...  
- .gitignore : Gitの追跡から外すものを記述しています．  
- package.json : npmプロジェクトに関する情報が記述されています．`npm i`でインストールされるパッケージのバージョンが記載されています．
- その他 .ファイル : 割愛

### src/
主に作業するディレクトリです．.vueファイルはこの中に置きます．
- assets/ : vueコンポーネントで使用するアセット（画像とか音源とか）が置いてあります．  
- components : vueコンポーネントが置いてあります．
- router/index.js : vueのルーティングライブラリvue-routerの設定ファイルです．
- store/index.js : vueの状態管理ライブラリvuexの設定ファイルです．
- views/ : ルーティングで表示するvueコンポーネントが置いてあります．
- App.vue : vueのルートコンポーネントです．
- main.js : 実質だたの設定ファイル．ライブラリ等の使用宣言など．

## vueのコンパイルについて
.vueファイルはあくまでhtml/css, jsファイルの拡張表現なので，そのままだとブラウザで読み込むことができません．  
そのため，たくさんある.vueファイルを1つにまとめた後にhtml/css, jsファイルにコンパイルする必要があります（ビルド）．  
みなさんがプロジェクトを立ち上げた際には，`npm run serve`で仮コンパイル，`npm run build`でビルド済みファイルの生成をしてください．
