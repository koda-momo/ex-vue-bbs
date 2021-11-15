<template>
  <div id="app">
    <!-- 始め -->
    掲⽰板画⾯
    <!-- 記事投稿画面は1つ -->
    <div>
      投稿者名：
      <span class="error" v-show="errorName">名前を入力して下さい</span>
      <span class="error" v-show="errorName50"
        >名前は50文字以内で入力して下さい</span
      >
      <div><input type="text" v-model="articleName" /></div>
      投稿内容：
      <span class="error" v-show="errorContent">コメントを入力して下さい</span>
      <div>
        <textarea cols="30" rows="10" v-model="articleContent"></textarea>
      </div>
      <div>
        <button type="button" v-on:click="addArticle()">記事投稿</button>
      </div>
    </div>

    <hr />

    <!-- 投稿内容表示画面 -->
    <div v-for="article of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }}
      <br />
      投稿内容：
      <pre>{{ article.content }}</pre>
      <br />
      <button type="button" v-on:click="deleteArticle(article.id)">
        記事削除
      </button>
      <!-- コメント表示 -->
      <div
        v-for="comment of article.commentList"
        :key="comment.id"
        class="comment"
      >
        コメント者名：{{ comment.name }}
        <br />
        コメント内容：
        <pre>{{ comment.content }}</pre>
      </div>
      <Comme :article-id="article.id"> </Comme>
    </div>

    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "../types/article";
import Comme from "../components/comment.vue";
import axios from "axios";
@Component({ components: { Comme } })
/**
 * 掲示板投稿サイトのvueファイル.
 */
export default class Bbs extends Vue {
  // 始め;
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //投稿名前についてのエラーメッセージ
  private errorName = false;
  //投稿名前についてのエラーメッセージ(51文字以上)
  private errorName50 = false;
  //投稿内容についてのエラーメッセージ
  private errorContent = false;

  created(): void {
    this["$store"].dispatch("getArticleList");
  }
  /**
   * 記事⼀覧を表⽰する.
   * @remarks
   * Vuexストア内の記事⼀覧(articles)を返す
   */
  get currentArticleList(): Array<Article> {
    const array = this["$store"].getters.getArticles;
    return array;
  }

  /**
   * 記事を追加する.
   * @remarks
   * 1)入力に誤りがあった場合はerrorを表示する
   * 2)最新の記事IDに１プラスする形で記事IDを作成する
   * 3)ミューテーションのaddArticleメソッドを呼ぶ
   *   →引数：payload=article: new Articles(新しく発⾏したID,⼊⼒した投稿者名,⼊⼒した投稿内容,[])
   * 4)⼊⼒値をフォームからクリアする
   */

  async addArticle(): Promise<void> {
    //1)
    this.errorName50 = false;
    this.errorName = false;
    this.errorContent = false;

    if (this.articleName.length > 50) {
      this.errorName50 = true;
    }
    if (this.articleName === "") {
      this.errorName = true;
    }
    if (this.articleContent === "") {
      this.errorContent = true;
    }
    if (this.errorName50 || this.errorName || this.errorContent) {
      return;
    }
    //1)
    await axios.post("http://54.203.85.248:8080/ex-bbs-api/bbs/article", {
      name: this.articleName,
      content: this.articleContent,
    });
    this["$router"].push("/*");
    this.currentArticleList;
    //   //2)IDの付与
    //   let newId = 0;
    //   if (this.currentArticleList.length != 0) {
    //     newId = this.currentArticleList[0].id + 1;
    //   } else {
    //     newId = 1;
    //   }
    // //3)API不使用時
    //   this["$store"].commit(
    //     "addArticle",
    //     new Article(newId, this.articleName, this.articleContent, [])
    //   );

    //3)
    this.articleName = "";
    this.articleContent = "";

    this["$store"].dispatch("getArticleList");
  }

  /**
   * 記事を削除する.
   *@remarks
   *ミューテーションのdeleteArticleメソッドを呼ぶ
   * →引数：payload=引数で受け取ったarticleIndex
   * @param articleIndex - 現在の投稿の対象ID
   */
  async deleteArticle(articleIndex: number): Promise<void> {
    console.log("削除しました");
    console.log(
      "http://54.203.85.248:8080/ex-bbs-api/bbs/article/" + articleIndex
    );
    await axios.delete(
      "http://54.203.85.248:8080/ex-bbs-api/bbs/article/" + articleIndex
    );
    // this["$store"].commit("deleteArticle", articleIndex);
    this["$store"].dispatch("getArticleList");
  }
  // 終わり
}
</script>

<style scoped>
.comment {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  width: 500px;
  background-color: white;
  border: solid 2px rgb(13, 21, 128);
}

button {
  margin: 5px;
}

#app {
  background-color: rgb(227, 240, 255);
}

.error {
  color: red;
}
</style>
